// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IPriceFeed {
    function getLatestPrice() external view returns (uint256 price, uint256 timestamp);
    function getHistoricalPrice(uint256 roundId) external view returns (uint256 price, uint256 timestamp);
    function decimals() external view returns (uint8);
} 