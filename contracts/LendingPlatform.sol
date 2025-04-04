// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./CreditScore.sol";
import "./LiquidityPool.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // Oracle for asset pricing

contract LendingPlatform {
    CreditScore public creditScoreContract;
    LiquidityPool public liquidityPool;
    AggregatorV3Interface internal priceFeed; // Chainlink Price Feed for real-time asset prices

    mapping(address => uint256) public collateralBalance;
    mapping(address => uint256) public loanBalance;

    event LoanGiven(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);
    event LoanTaken(address indexed borrower, uint256 amount);

    uint256 public interestRate = 5; // 5% annual interest rate

    constructor(address _creditScoreAddress, address _liquidityPoolAddress, address _priceFeedAddress) {
        creditScoreContract = CreditScore(_creditScoreAddress);
        liquidityPool = LiquidityPool(_liquidityPoolAddress);
        priceFeed = AggregatorV3Interface(_priceFeedAddress); // Initialize the oracle contract
    }

    // Fetch the latest price of the asset from the oracle
    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    // Function to request a loan
    function requestLoan(uint256 loanAmount) public {
        // Fetch the user's actual credit score
        uint256 userCreditScore = creditScoreContract.calculateCreditScore(msg.sender);

        // Ensure the user has a sufficient credit score
        require(userCreditScore >= 600, "Insufficient credit score");

        // Fetch the latest price of the collateral asset
        int collateralPrice = getLatestPrice();

        // Calculate the collateral value based on the real-time price from the oracle
        uint256 collateralValue = collateralBalance[msg.sender] * uint256(collateralPrice);

        // Ensure the user has provided enough collateral (based on real-time prices)
        require(collateralValue >= loanAmount * 2, "Insufficient collateral");

        // Withdraw from the liquidity pool
        liquidityPool.withdraw(loanAmount);

        // Record the loan in the user's loan balance
        loanBalance[msg.sender] += loanAmount;

        // Emit event to log the loan
        emit LoanTaken(msg.sender, loanAmount);
    }

    // Function to repay the loan
    function repayLoan(uint256 repayAmount) public {
        // Ensure the user is repaying an amount that doesn't exceed their outstanding loan balance
        require(loanBalance[msg.sender] >= repayAmount, "Repay amount exceeds loan balance");

        // Deduct the repay amount from the user's loan balance
        loanBalance[msg.sender] -= repayAmount;

        // Return funds to liquidity pool
        liquidityPool.deposit{value: repayAmount}();

        // Emit event to log the repayment
        emit LoanRepaid(msg.sender, repayAmount);
    }

    // Function to provide collateral (users send Ether as collateral)
    function provideCollateral() external payable {
        // Add the sent Ether to the user's collateral balance
        collateralBalance[msg.sender] += msg.value;
    }

    // Function to withdraw collateral (only allowed if no outstanding loans)
    function withdrawCollateral(uint256 amount) external {
        require(collateralBalance[msg.sender] >= amount, "Insufficient collateral balance");
        require(loanBalance[msg.sender] == 0, "Cannot withdraw collateral with outstanding loans");

        collateralBalance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Calculate interest on the loan
    function calculateInterest(address borrower) public view returns (uint256) {
        uint256 loanAmount = loanBalance[borrower];
        return (loanAmount * interestRate) / 100;
    }
}
