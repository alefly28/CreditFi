// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract CrossChainBridge is NonblockingLzApp, Ownable, ReentrancyGuard {
    IERC20 public token;
    
    // Mapping from chainId to their CreditFi token address
    mapping(uint16 => bytes) public trustedRemoteLookup;
    
    event TokensBridged(
        address indexed from,
        uint16 indexed toChainId,
        address indexed toAddress,
        uint256 amount
    );
    
    event TokensReceived(
        uint16 indexed fromChainId,
        address indexed toAddress,
        uint256 amount
    );

    constructor(
        address _lzEndpoint,
        address _token
    ) NonblockingLzApp(_lzEndpoint) {
        token = IERC20(_token);
    }

    function bridge(
        uint16 _dstChainId,
        address _toAddress,
        uint256 _amount
    ) external payable nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            trustedRemoteLookup[_dstChainId].length > 0,
            "Destination chain not supported"
        );

        // Transfer tokens to this contract
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        bytes memory payload = abi.encode(_toAddress, _amount);
        
        // Get the fees needed to bridge
        (uint256 nativeFee,) = lzEndpoint.estimateFees(
            _dstChainId,
            address(this),
            payload,
            false,
            bytes("")
        );
        require(msg.value >= nativeFee, "Insufficient native token for fees");

        _lzSend(
            _dstChainId,
            payload,
            payable(msg.sender),
            address(0x0),
            bytes(""),
            msg.value
        );

        emit TokensBridged(msg.sender, _dstChainId, _toAddress, _amount);
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes memory _payload
    ) internal override {
        require(
            _srcAddress.length == trustedRemoteLookup[_srcChainId].length &&
            keccak256(_srcAddress) == keccak256(trustedRemoteLookup[_srcChainId]),
            "Invalid source address"
        );

        (address toAddress, uint256 amount) = abi.decode(
            _payload,
            (address, uint256)
        );

        require(
            token.transfer(toAddress, amount),
            "Failed to transfer received tokens"
        );

        emit TokensReceived(_srcChainId, toAddress, amount);
    }

    // Admin functions
    function setTrustedRemote(
        uint16 _chainId,
        bytes calldata _path
    ) external onlyOwner {
        trustedRemoteLookup[_chainId] = _path;
    }

    function removeTrustedRemote(uint16 _chainId) external onlyOwner {
        require(
            trustedRemoteLookup[_chainId].length > 0,
            "Chain not trusted"
        );
        delete trustedRemoteLookup[_chainId];
    }

    // Emergency functions
    function rescueTokens(
        address _token,
        address _to,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_token).transfer(_to, _amount);
    }

    function rescueETH(address payable _to) external onlyOwner {
        (bool success,) = _to.call{value: address(this).balance}("");
        require(success, "ETH rescue failed");
    }
} 