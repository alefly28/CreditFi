// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./interfaces/IPriceFeed.sol";

contract PriceFeedAggregator is AccessControl {
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    
    mapping(address => AggregatorV3Interface) public priceFeeds;
    mapping(address => uint256) public lastUpdateTimestamp;
    uint256 public constant PRICE_FRESHNESS_THRESHOLD = 1 hours;
    
    event PriceFeedUpdated(address token, address feed);
    event PriceUpdated(address token, uint256 price, uint256 timestamp);
    
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(UPDATER_ROLE, msg.sender);
    }
    
    function setPriceFeed(address token, address feed) external onlyRole(DEFAULT_ADMIN_ROLE) {
        priceFeeds[token] = AggregatorV3Interface(feed);
        emit PriceFeedUpdated(token, feed);
    }
    
    function getLatestPrice(address token) external view returns (uint256 price, uint256 timestamp) {
        AggregatorV3Interface feed = priceFeeds[token];
        require(address(feed) != address(0), "Price feed not found");
        
        (, int256 answer, , uint256 updatedAt, ) = feed.latestRoundData();
        require(updatedAt > block.timestamp - PRICE_FRESHNESS_THRESHOLD, "Stale price");
        
        return (uint256(answer), updatedAt);
    }
} 