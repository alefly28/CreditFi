// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestnetFaucet is ReentrancyGuard, Ownable {
    uint256 public constant COOLDOWN_TIME = 24 hours;
    uint256 public constant ETH_AMOUNT = 0.1 ether;
    uint256 public constant TOKEN_AMOUNT = 100 * 10**18; // 100 tokens

    mapping(address => uint256) public lastRequestTime;
    mapping(address => bool) public whitelistedTokens;
    
    event FaucetRequest(address indexed user, uint256 amount, address tokenAddress);
    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);

    error CooldownNotExpired(uint256 remainingTime);
    error InvalidToken();
    error TransferFailed();

    constructor() {
        // Constructor logic if needed
    }

    receive() external payable {}

    function requestTokens(address tokenAddress) external nonReentrant {
        if (block.timestamp - lastRequestTime[msg.sender] < COOLDOWN_TIME) {
            revert CooldownNotExpired(
                COOLDOWN_TIME - (block.timestamp - lastRequestTime[msg.sender])
            );
        }

        if (tokenAddress != address(0) && !whitelistedTokens[tokenAddress]) {
            revert InvalidToken();
        }

        lastRequestTime[msg.sender] = block.timestamp;

        // Send ETH
        if (address(this).balance >= ETH_AMOUNT) {
            (bool success,) = payable(msg.sender).call{value: ETH_AMOUNT}("");
            if (!success) revert TransferFailed();
        }

        // Send tokens if requested
        if (tokenAddress != address(0)) {
            IERC20 token = IERC20(tokenAddress);
            if (token.balanceOf(address(this)) >= TOKEN_AMOUNT) {
                bool success = token.transfer(msg.sender, TOKEN_AMOUNT);
                if (!success) revert TransferFailed();
            }
        }

        emit FaucetRequest(msg.sender, ETH_AMOUNT, tokenAddress);
    }

    // Admin functions
    function addToken(address tokenAddress) external onlyOwner {
        whitelistedTokens[tokenAddress] = true;
        emit TokenAdded(tokenAddress);
    }

    function removeToken(address tokenAddress) external onlyOwner {
        whitelistedTokens[tokenAddress] = false;
        emit TokenRemoved(tokenAddress);
    }

    function withdrawTokens(address tokenAddress, uint256 amount) external onlyOwner {
        if (tokenAddress == address(0)) {
            (bool success,) = payable(owner()).call{value: amount}("");
            if (!success) revert TransferFailed();
        } else {
            IERC20 token = IERC20(tokenAddress);
            bool success = token.transfer(owner(), amount);
            if (!success) revert TransferFailed();
        }
    }
} 