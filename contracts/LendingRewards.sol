// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LendingRewards is ERC20, AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant REWARDS_DISTRIBUTOR_ROLE = keccak256("REWARDS_DISTRIBUTOR_ROLE");
    
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public totalPointsEarned;
    
    uint256 public constant POINTS_MULTIPLIER = 100;
    uint256 public constant CLAIM_COOLDOWN = 7 days;
    uint256 public constant MIN_POINTS_TO_CLAIM = 100 * POINTS_MULTIPLIER;
    
    event PointsAdded(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor() ERC20("Lending Rewards", "LRWD") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(REWARDS_DISTRIBUTOR_ROLE, msg.sender);
    }
    
    function addPoints(address user, uint256 amount) 
        external 
        onlyRole(REWARDS_DISTRIBUTOR_ROLE) 
        whenNotPaused 
    {
        uint256 points = amount * POINTS_MULTIPLIER;
        userPoints[user] += points;
        totalPointsEarned[user] += points;
        emit PointsAdded(user, points);
    }
    
    function claimRewards() 
        external 
        nonReentrant 
        whenNotPaused 
    {
        require(
            block.timestamp >= lastClaimTime[msg.sender] + CLAIM_COOLDOWN, 
            "Too soon to claim"
        );
        require(userPoints[msg.sender] >= MIN_POINTS_TO_CLAIM, "Not enough points");
        
        uint256 rewards = userPoints[msg.sender] / POINTS_MULTIPLIER;
        userPoints[msg.sender] = 0;
        lastClaimTime[msg.sender] = block.timestamp;
        
        _mint(msg.sender, rewards);
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    function getUserStats(address user) 
        external 
        view 
        returns (
            uint256 currentPoints,
            uint256 totalEarned,
            uint256 nextClaimTime
        ) 
    {
        return (
            userPoints[user],
            totalPointsEarned[user],
            lastClaimTime[user] + CLAIM_COOLDOWN
        );
    }
    
    // Admin functions
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function grantDistributorRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(REWARDS_DISTRIBUTOR_ROLE, account);
    }
    
    function revokeDistributorRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(REWARDS_DISTRIBUTOR_ROLE, account);
    }
} 