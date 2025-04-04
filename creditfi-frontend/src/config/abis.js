export const CREDIT_SCORE_ABI = [
  "function getCreditScore(address user) view returns (uint256)",
  "function updateCreditScore(address user, uint256 score)",
  "event CreditScoreUpdated(address indexed user, uint256 score)"
];

export const LENDING_POOL_ABI = [
  "function lend() payable",
  "function borrow(uint256 amount)",
  "function repay() payable",
  "function withdraw(uint256 amount)",
  "function getUserTotalLent(address user) view returns (uint256)",
  "function getUserTotalBorrowed(address user) view returns (uint256)",
  "function calculateBorrowLimit(address user) view returns (uint256)",
  "function calculateInterestRate(uint256 creditScore) view returns (uint256)",
  "event Lent(address indexed user, uint256 amount)",
  "event Borrowed(address indexed user, uint256 amount)",
  "event Repaid(address indexed user, uint256 amount)",
  "event Withdrawn(address indexed user, uint256 amount)"
]; 