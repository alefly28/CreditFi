// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CreditScore.sol";
import "./LendingToken.sol";

contract LendingPool is ReentrancyGuard, Pausable, Ownable {
    struct Loan {
        uint256 amount;
        uint256 collateralAmount;
        uint256 timestamp;
        uint256 duration;
        uint256 interestRate;
        bool active;
        bool repaid;
        bool earlyRepayment;
        uint256 lastRepaymentTime;
    }

    mapping(address => Loan) public loans;
    mapping(address => uint256) public deposits;
    
    uint256 public totalDeposits;
    uint256 public minimumCreditScore;
    uint256 public constant COLLATERAL_RATIO = 150; // 150% collateral required
    uint256 public constant INTEREST_RATE = 10; // 10% APR
    
    CreditScore public creditScore;
    LendingToken public lendingToken;
    
    uint256 public constant MAX_LOAN_AMOUNT = 1000 ether;
    uint256 public constant MIN_LOAN_AMOUNT = 0.1 ether;
    uint256 public constant LOYALTY_DISCOUNT = 5; // 5% discount for loyal users
    uint256 public constant EARLY_REPAYMENT_BONUS = 2; // 2% bonus for early repayment
    
    mapping(address => uint256) public userLoanCount;
    mapping(address => uint256) public totalAmountBorrowed;
    
    event Deposited(address indexed user, uint256 amount);
    event LoanTaken(address indexed user, uint256 amount, uint256 collateral);
    event LoanRepaid(address indexed user, uint256 amount);
    event CollateralReturned(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event LoanLiquidated(
        address indexed borrower,
        uint256 loanAmount,
        uint256 collateralAmount,
        uint256 liquidationValue
    );
    
    constructor(address _creditScoreAddress, address _lendingTokenAddress) {
        creditScore = CreditScore(_creditScoreAddress);
        lendingToken = LendingToken(_lendingTokenAddress);
        minimumCreditScore = 650; // Minimum credit score required
    }

    // Deposit funds into the lending pool
    function deposit() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "Must deposit some ETH");
        deposits[msg.sender] += msg.value;
        totalDeposits += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Borrow funds from the pool
    function borrow(uint256 amount) external payable nonReentrant whenNotPaused {
        require(amount > 0, "Borrow amount must be greater than 0");
        require(amount <= totalDeposits, "Not enough funds in pool");
        require(!loans[msg.sender].active, "Existing loan must be repaid first");
        
        uint256 userCreditScore = creditScore.calculateCreditScore(msg.sender);
        require(userCreditScore >= minimumCreditScore, "Credit score too low");

        uint256 requiredCollateral = (amount * COLLATERAL_RATIO) / 100;
        require(msg.value >= requiredCollateral, "Insufficient collateral");

        loans[msg.sender] = Loan({
            amount: amount,
            collateralAmount: msg.value,
            timestamp: block.timestamp,
            duration: 30 days,
            interestRate: INTEREST_RATE,
            active: true,
            repaid: false,
            earlyRepayment: false,
            lastRepaymentTime: 0
        });

        totalDeposits -= amount;
        payable(msg.sender).transfer(amount);
        
        emit LoanTaken(msg.sender, amount, msg.value);
    }

    // Repay loan
    function repayLoan() external payable nonReentrant {
        Loan storage loan = loans[msg.sender];
        require(loan.active, "No active loan found");
        
        uint256 interest = calculateInterest(loan.amount, loan.timestamp);
        uint256 totalDue = loan.amount + interest;
        require(msg.value >= totalDue, "Insufficient repayment amount");

        loan.active = false;
        loan.repaid = true;
        totalDeposits += totalDue;

        // Return collateral
        payable(msg.sender).transfer(loan.collateralAmount);
        
        emit LoanRepaid(msg.sender, totalDue);
        emit CollateralReturned(msg.sender, loan.collateralAmount);
    }

    // Withdraw deposited funds
    function withdraw(uint256 amount) external nonReentrant {
        require(deposits[msg.sender] >= amount, "Insufficient deposit balance");
        require(totalDeposits >= amount, "Insufficient pool balance");

        deposits[msg.sender] -= amount;
        totalDeposits -= amount;
        payable(msg.sender).transfer(amount);
        
        emit Withdrawn(msg.sender, amount);
    }

    // Calculate interest based on time elapsed
    function calculateInterest(uint256 amount, uint256 startTime) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - startTime;
        return (amount * INTEREST_RATE * timeElapsed) / (365 days * 100);
    }

    // Liquidate overdue loans
    function liquidate(address borrower) external nonReentrant {
        Loan storage loan = loans[borrower];
        require(loan.active, "No active loan");
        require(block.timestamp > loan.timestamp + loan.duration, "Loan not overdue");

        uint256 totalDue = loan.amount + calculateInterest(loan.amount, loan.timestamp);
        uint256 liquidationValue = (loan.collateralAmount * 90) / 100; // 10% liquidation penalty

        loan.active = false;
        totalDeposits += totalDue;

        // Transfer remaining collateral (if any) back to borrower
        if (liquidationValue > totalDue) {
            payable(borrower).transfer(liquidationValue - totalDue);
        }
    }

    // Admin functions
    function setMinimumCreditScore(uint256 _minimumCreditScore) external onlyOwner {
        minimumCreditScore = _minimumCreditScore;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Add emergency withdrawal
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Add new function for early repayment bonus
    function calculateEarlyRepaymentBonus(uint256 amount) public pure returns (uint256) {
        return (amount * EARLY_REPAYMENT_BONUS) / 100;
    }

    // Add loyalty discount calculation
    function calculateLoyaltyDiscount(address user) public view returns (uint256) {
        if (userLoanCount[user] >= 5 && totalAmountBorrowed[user] >= 100 ether) {
            return LOYALTY_DISCOUNT;
        }
        return 0;
    }
} 