// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CreditFiToken is ERC20, ERC20Votes, Ownable, ReentrancyGuard {
    // Token distribution
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10**18; // 100M tokens
    
    // Distribution pools
    uint256 public constant COMMUNITY_POOL = 40_000_000 * 10**18; // 40%
    uint256 public constant TEAM_POOL = 15_000_000 * 10**18;      // 15%
    uint256 public constant TREASURY_POOL = 20_000_000 * 10**18;  // 20%
    uint256 public constant LIQUIDITY_POOL = 15_000_000 * 10**18; // 15%
    uint256 public constant ADVISORS_POOL = 10_000_000 * 10**18;  // 10%

    // Vesting periods
    uint256 public constant CLIFF_PERIOD = 180 days;
    uint256 public constant VESTING_PERIOD = 720 days;

    // Vesting tracking
    mapping(address => uint256) public vestingStart;
    mapping(address => uint256) public totalVested;
    mapping(address => uint256) public totalClaimed;
    mapping(address => uint256) public vestingAmount;

    event TokensClaimed(address indexed beneficiary, uint256 amount);
    event VestingScheduleCreated(address indexed beneficiary, uint256 amount);

    constructor() ERC20("CreditFi", "CFI") ERC20Permit("CreditFi") {
        // Initial minting for distribution pools
        _mint(address(this), TOTAL_SUPPLY);
    }

    function createVestingSchedule(
        address beneficiary,
        uint256 amount
    ) external onlyOwner {
        require(beneficiary != address(0), "Invalid beneficiary");
        require(amount > 0, "Amount must be positive");
        require(vestingAmount[beneficiary] == 0, "Schedule exists");

        vestingAmount[beneficiary] = amount;
        vestingStart[beneficiary] = block.timestamp;

        emit VestingScheduleCreated(beneficiary, amount);
    }

    function claimVestedTokens() external nonReentrant {
        uint256 claimable = getClaimableTokens(msg.sender);
        require(claimable > 0, "No tokens claimable");

        totalClaimed[msg.sender] += claimable;
        require(transfer(msg.sender, claimable), "Transfer failed");

        emit TokensClaimed(msg.sender, claimable);
    }

    function getClaimableTokens(address beneficiary) public view returns (uint256) {
        if (vestingAmount[beneficiary] == 0) return 0;
        if (block.timestamp < vestingStart[beneficiary] + CLIFF_PERIOD) return 0;

        uint256 timeElapsed = block.timestamp - vestingStart[beneficiary];
        if (timeElapsed >= VESTING_PERIOD) {
            return vestingAmount[beneficiary] - totalClaimed[beneficiary];
        }

        uint256 vestedAmount = (vestingAmount[beneficiary] * timeElapsed) / VESTING_PERIOD;
        return vestedAmount - totalClaimed[beneficiary];
    }

    // Override required functions
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
} 