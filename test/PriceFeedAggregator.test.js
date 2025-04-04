const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("PriceFeedAggregator", function () {
  let PriceFeedAggregator;
  let priceFeedAggregator;
  let MockV3Aggregator;
  let mockAggregator;
  let owner;
  let updater;
  let user;
  let token;

  const UPDATER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("UPDATER_ROLE"));
  const MOCK_DECIMALS = 8;
  const MOCK_INITIAL_ANSWER = 400000000000; // $4000.00

  beforeEach(async function () {
    [owner, updater, user] = await ethers.getSigners();

    // Deploy mock token
    const Token = await ethers.getContractFactory("LendingToken");
    token = await Token.deploy();
    await token.deployed();

    // Deploy mock price feed
    MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
    mockAggregator = await MockV3Aggregator.deploy(MOCK_DECIMALS, MOCK_INITIAL_ANSWER);
    await mockAggregator.deployed();

    // Deploy PriceFeedAggregator
    PriceFeedAggregator = await ethers.getContractFactory("PriceFeedAggregator");
    priceFeedAggregator = await PriceFeedAggregator.deploy();
    await priceFeedAggregator.deployed();

    // Grant updater role
    await priceFeedAggregator.grantRole(UPDATER_ROLE, updater.address);
  });

  describe("Deployment", function () {
    it("should set the right admin", async function () {
      const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero;
      expect(await priceFeedAggregator.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });

    it("should set correct price freshness threshold", async function () {
      expect(await priceFeedAggregator.PRICE_FRESHNESS_THRESHOLD()).to.equal(3600); // 1 hour
    });
  });

  describe("Price Feed Management", function () {
    it("should allow admin to set price feed", async function () {
      await expect(priceFeedAggregator.setPriceFeed(token.address, mockAggregator.address))
        .to.emit(priceFeedAggregator, "PriceFeedUpdated")
        .withArgs(token.address, mockAggregator.address);

      expect(await priceFeedAggregator.priceFeeds(token.address)).to.equal(mockAggregator.address);
    });

    it("should prevent non-admin from setting price feed", async function () {
      await expect(
        priceFeedAggregator.connect(user).setPriceFeed(token.address, mockAggregator.address)
      ).to.be.reverted;
    });
  });

  describe("Price Queries", function () {
    beforeEach(async function () {
      await priceFeedAggregator.setPriceFeed(token.address, mockAggregator.address);
    });

    it("should return latest price correctly", async function () {
      const [price, timestamp] = await priceFeedAggregator.getLatestPrice(token.address);
      expect(price).to.equal(MOCK_INITIAL_ANSWER);
    });

    it("should revert when querying non-existent price feed", async function () {
      await expect(
        priceFeedAggregator.getLatestPrice(ethers.constants.AddressZero)
      ).to.be.revertedWith("Price feed not found");
    });

    it("should revert when price is stale", async function () {
      // Increase time by more than the freshness threshold
      await time.increase(3601); // 1 hour + 1 second

      await expect(
        priceFeedAggregator.getLatestPrice(token.address)
      ).to.be.revertedWith("Stale price");
    });
  });

  describe("Access Control", function () {
    it("should allow admin to grant updater role", async function () {
      await expect(priceFeedAggregator.grantRole(UPDATER_ROLE, user.address))
        .to.emit(priceFeedAggregator, "RoleGranted")
        .withArgs(UPDATER_ROLE, user.address, owner.address);
    });

    it("should allow admin to revoke updater role", async function () {
      await expect(priceFeedAggregator.revokeRole(UPDATER_ROLE, updater.address))
        .to.emit(priceFeedAggregator, "RoleRevoked")
        .withArgs(UPDATER_ROLE, updater.address, owner.address);
    });

    it("should prevent non-admin from granting roles", async function () {
      await expect(
        priceFeedAggregator.connect(user).grantRole(UPDATER_ROLE, user.address)
      ).to.be.reverted;
    });
  });

  describe("Price Updates", function () {
    beforeEach(async function () {
      await priceFeedAggregator.setPriceFeed(token.address, mockAggregator.address);
    });

    it("should reflect updated prices from feed", async function () {
      const newPrice = MOCK_INITIAL_ANSWER * 2;
      await mockAggregator.updateAnswer(newPrice);

      const [price, ] = await priceFeedAggregator.getLatestPrice(token.address);
      expect(price).to.equal(newPrice);
    });

    it("should maintain independent prices for different tokens", async function () {
      // Deploy second mock token and price feed
      const Token2 = await ethers.getContractFactory("LendingToken");
      const token2 = await Token2.deploy();
      
      const mockAggregator2 = await MockV3Aggregator.deploy(MOCK_DECIMALS, MOCK_INITIAL_ANSWER * 2);
      await priceFeedAggregator.setPriceFeed(token2.address, mockAggregator2.address);

      const [price1, ] = await priceFeedAggregator.getLatestPrice(token.address);
      const [price2, ] = await priceFeedAggregator.getLatestPrice(token2.address);

      expect(price1).to.equal(MOCK_INITIAL_ANSWER);
      expect(price2).to.equal(MOCK_INITIAL_ANSWER * 2);
    });
  });
}); 