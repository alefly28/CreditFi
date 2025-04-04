// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title CreditScore
 * @dev Implements a decentralized credit scoring system for DeFi applications
 * @notice This contract manages credit scores based on user's DeFi activities and financial metrics
 * @custom:security-contact security@creditfi.example.com
 */
contract CreditScore is AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    
    /**
     * @dev Stores all relevant metrics for calculating a user's credit score
     * @param repaymentHistory Percentage of successful loan repayments (0-100)
     * @param walletBalance User's average wallet balance in base units
     * @param collateralRatio Percentage of collateral maintained (0-200)
     * @param transactionVolume Total volume of DeFi transactions
     * @param loanDefaults Number of loan defaults
     * @param timeInDeFi Number of days active in DeFi
     * @param lastUpdateTime Timestamp of last score update
     * @param positiveActions Count of positive credit actions
     * @param negativeActions Count of negative credit actions
     */
    struct ScoreData {
        uint256 repaymentHistory;
        uint256 walletBalance;
        uint256 collateralRatio;
        uint256 transactionVolume;
        uint256 loanDefaults;
        uint256 timeInDeFi;
        uint256 lastUpdateTime;
        uint256 positiveActions;
        uint256 negativeActions;
    }

    mapping(address => ScoreData) private userScores;
    
    uint256 public constant MAX_SCORE = 850;
    uint256 public constant MIN_SCORE = 300;
    uint256 public constant SCORE_DECIMALS = 2;
    
    event ScoreUpdated(address indexed user, uint256 newScore);
    event PositiveActionRecorded(address indexed user, string action);
    event NegativeActionRecorded(address indexed user, string action);
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event EmergencyWithdraw(address indexed token, uint256 amount, address indexed recipient);
    event ContractPaused(address indexed admin);
    event ContractUnpaused(address indexed admin);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(UPDATER_ROLE, msg.sender);
    }

    function updateScore(
        address user,
        uint256 _repaymentHistory,
        uint256 _walletBalance,
        uint256 _collateralRatio,
        uint256 _transactionVolume,
        uint256 _loanDefaults,
        uint256 _timeInDeFi
    ) external onlyRole(UPDATER_ROLE) whenNotPaused nonReentrant {
        require(_repaymentHistory <= 100, "Invalid repayment history");
        require(_collateralRatio <= 200, "Invalid collateral ratio");
        require(_timeInDeFi <= 3650 days, "Invalid time in DeFi"); // Max 10 years
        
        userScores[user] = ScoreData({
            repaymentHistory: _repaymentHistory,
            walletBalance: _walletBalance,
            collateralRatio: _collateralRatio,
            transactionVolume: _transactionVolume,
            loanDefaults: _loanDefaults,
            timeInDeFi: _timeInDeFi,
            lastUpdateTime: block.timestamp,
            positiveActions: userScores[user].positiveActions,
            negativeActions: userScores[user].negativeActions
        });
        
        uint256 newScore = calculateCreditScore(user);
        emit ScoreUpdated(user, newScore);
    }

    function recordPositiveAction(address user, string calldata action) 
        external 
        onlyRole(UPDATER_ROLE) 
        whenNotPaused
    {
        require(bytes(action).length <= 100, "Action string too long");
        userScores[user].positiveActions++;
        emit PositiveActionRecorded(user, action);
    }

    function recordNegativeAction(address user, string calldata action) 
        external 
        onlyRole(UPDATER_ROLE) 
        whenNotPaused
    {
        userScores[user].negativeActions++;
        emit NegativeActionRecorded(user, action);
    }

    function calculateCreditScore(address user) public view returns (uint256) {
        ScoreData memory score = userScores[user];
        require(score.lastUpdateTime > 0, "No score data found");

        uint256 baseScore = (
            score.repaymentHistory * 40 +
            score.walletBalance * 20 +
            score.collateralRatio * 15 +
            score.transactionVolume * 10 +
            (100 - score.loanDefaults) * 10 +
            score.timeInDeFi * 5
        ) / 100;

        // Adjust for positive and negative actions
        int256 actionAdjustment = int256(score.positiveActions * 5) - int256(score.negativeActions * 10);
        
        uint256 finalScore = baseScore;
        if (actionAdjustment > 0) {
            finalScore += uint256(actionAdjustment);
        } else if (actionAdjustment < 0 && uint256(-actionAdjustment) < baseScore) {
            finalScore -= uint256(-actionAdjustment);
        }
        
        // Ensure score stays within bounds
        if (finalScore > MAX_SCORE) return MAX_SCORE;
        if (finalScore < MIN_SCORE) return MIN_SCORE;
        
        return finalScore;
    }

    function getUserScoreData(address user) 
        external 
        view 
        returns (ScoreData memory) 
    {
        return userScores[user];
    }

    function hasScoreData(address user) public view returns (bool) {
        return userScores[user].lastUpdateTime > 0;
    }

    // Admin functions
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
        emit ContractPaused(msg.sender);
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }

    function grantUpdaterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(UPDATER_ROLE, account);
    }

    function revokeUpdaterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(UPDATER_ROLE, account);
    }

    function emergencyWithdraw(address token, uint256 amount) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
        whenPaused 
    {
        require(token != address(0), "Invalid token address");
        IERC20(token).transfer(msg.sender, amount);
        emit EmergencyWithdraw(token, amount, msg.sender);
    }
}