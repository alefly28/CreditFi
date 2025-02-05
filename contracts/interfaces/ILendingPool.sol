// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface ILendingPool {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function borrow(uint256 amount) external payable;
    function repay() external payable;
    function liquidate(address borrower) external;
    function calculateInterest(uint256 amount, uint256 startTime) external view returns (uint256);
    function getCollateralRatio(address user) external view returns (uint256);
} 