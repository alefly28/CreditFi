const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("CreditScore", function () {
  let CreditScore;
  let creditScore;
  let owner;
  let updater;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, updater, user1, user2] = await ethers.getSigners();
    CreditScore = await ethers.getContractFactory("CreditScore");
    creditScore = await CreditScore.deploy();
    await creditScore.deployed();

    // Grant updater role
    const updaterRole = await creditScore.UPDATER_ROLE();
    await creditScore.grantRole(updaterRole, updater.address);
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const adminRole = await creditScore.DEFAULT_ADMIN_ROLE();
      expect(await creditScore.hasRole(adminRole, owner.address)).to.be.true;
    });

    it("Should set the correct score bounds", async function () {
      expect(await creditScore.MAX_SCORE()).to.equal(850);
      expect(await creditScore.MIN_SCORE()).to.equal(300);
    });
  });

  describe("Score Updates", function () {
    it("Should update score with valid parameters", async function () {
      await expect(creditScore.connect(updater).updateScore(
        user1.address,
        80, // repaymentHistory
        ethers.utils.parseEther("1000"), // walletBalance
        150, // collateralRatio
        ethers.utils.parseEther("5000"), // transactionVolume
        2, // loanDefaults
        365 // timeInDeFi
      )).to.emit(creditScore, "ScoreUpdated");

      const userData = await creditScore.getUserScoreData(user1.address);
      expect(userData.repaymentHistory).to.equal(80);
      expect(userData.walletBalance).to.equal(ethers.utils.parseEther("1000"));
    });

    it("Should revert with invalid parameters", async function () {
      await expect(
        creditScore.connect(updater).updateScore(
          user1.address,
          101, // invalid repaymentHistory > 100
          ethers.utils.parseEther("1000"),
          150,
          ethers.utils.parseEther("5000"),
          2,
          365
        )
      ).to.be.revertedWith("Invalid repayment history");
    });

    it("Should calculate correct credit score", async function () {
      await creditScore.connect(updater).updateScore(
        user1.address,
        90, // excellent repayment history
        ethers.utils.parseEther("2000"), // good balance
        150, // standard collateral ratio
        ethers.utils.parseEther("10000"), // high volume
        0, // no defaults
        730 // 2 years in DeFi
      );

      const score = await creditScore.calculateCreditScore(user1.address);
      expect(score).to.be.within(700, 850); // Should be a high score
    });
  });

  describe("Positive/Negative Actions", function () {
    it("Should record positive actions", async function () {
      await creditScore.connect(updater).recordPositiveAction(
        user1.address,
        "Early loan repayment"
      );

      const userData = await creditScore.getUserScoreData(user1.address);
      expect(userData.positiveActions).to.equal(1);
    });

    it("Should record negative actions", async function () {
      await creditScore.connect(updater).recordNegativeAction(
        user1.address,
        "Missed payment"
      );

      const userData = await creditScore.getUserScoreData(user1.address);
      expect(userData.negativeActions).to.equal(1);
    });

    it("Should affect credit score calculation", async function () {
      // Set initial score
      await creditScore.connect(updater).updateScore(
        user1.address,
        80,
        ethers.utils.parseEther("1000"),
        150,
        ethers.utils.parseEther("5000"),
        0,
        365
      );

      const initialScore = await creditScore.calculateCreditScore(user1.address);

      // Add positive action
      await creditScore.connect(updater).recordPositiveAction(
        user1.address,
        "Early repayment"
      );

      const scoreAfterPositive = await creditScore.calculateCreditScore(user1.address);
      expect(scoreAfterPositive).to.be.gt(initialScore);

      // Add negative action
      await creditScore.connect(updater).recordNegativeAction(
        user1.address,
        "Late payment"
      );

      const scoreAfterNegative = await creditScore.calculateCreditScore(user1.address);
      expect(scoreAfterNegative).to.be.lt(scoreAfterPositive);
    });
  });

  describe("Access Control", function () {
    it("Should prevent unauthorized updates", async function () {
      await expect(
        creditScore.connect(user1).updateScore(
          user1.address,
          80,
          ethers.utils.parseEther("1000"),
          150,
          ethers.utils.parseEther("5000"),
          2,
          365
        )
      ).to.be.reverted;
    });

    it("Should allow admin to grant and revoke roles", async function () {
      const updaterRole = await creditScore.UPDATER_ROLE();
      
      // Grant role
      await creditScore.connect(owner).grantRole(updaterRole, user2.address);
      expect(await creditScore.hasRole(updaterRole, user2.address)).to.be.true;

      // Revoke role
      await creditScore.connect(owner).revokeRole(updaterRole, user2.address);
      expect(await creditScore.hasRole(updaterRole, user2.address)).to.be.false;
    });
  });

  describe("Emergency Functions", function () {
    it("Should allow admin to pause and unpause", async function () {
      await creditScore.connect(owner).pause();
      expect(await creditScore.paused()).to.be.true;

      await expect(
        creditScore.connect(updater).updateScore(
          user1.address,
          80,
          ethers.utils.parseEther("1000"),
          150,
          ethers.utils.parseEther("5000"),
          2,
          365
        )
      ).to.be.reverted;

      await creditScore.connect(owner).unpause();
      expect(await creditScore.paused()).to.be.false;
    });

    it("Should allow emergency withdrawal when paused", async function () {
      const token = await (await ethers.getContractFactory("LendingToken")).deploy();
      await token.deployed();

      // Send some tokens to the contract
      await token.mint(creditScore.address, ethers.utils.parseEther("100"));

      // Pause the contract
      await creditScore.connect(owner).pause();

      // Perform emergency withdrawal
      await expect(
        creditScore.connect(owner).emergencyWithdraw(
          token.address,
          ethers.utils.parseEther("100")
        )
      ).to.emit(creditScore, "EmergencyWithdraw");
    });
  });
}); 