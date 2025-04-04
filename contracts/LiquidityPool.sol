// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract LiquidityPool {
    AggregatorV3Interface internal priceFeed;

    mapping(address => uint256) public depositBalance;
    uint256 public totalLiquidity;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    // Function to deposit assets into the pool
    function deposit() external payable {
        require(msg.value > 0, "Must deposit non-zero amount");
        depositBalance[msg.sender] += msg.value;
        totalLiquidity += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Function to withdraw assets from the pool
    function withdraw(uint256 amount) external {
        require(depositBalance[msg.sender] >= amount, "Insufficient balance");
        depositBalance[msg.sender] -= amount;
        totalLiquidity -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Function to get the latest price (e.g., of ETH)
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }
}

