const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreditScore", function () {
  let CreditScore;
  let creditScore;
  let owner;
  let updater;
  let user;

  beforeEach(async function () {
    [owner, updater, user] = await ethers.getSigners();
    CreditScore = await ethers.getContractFactory("CreditScore");
    creditScore = await CreditScore.deploy();
    await creditScore.deployed();

    const updaterRole = await creditScore.UPDATER_ROLE();
    await creditScore.grantRole(updaterRole, updater.address);
  });

  describe("Score Updates", function () {
    it("should update score with valid parameters", async function () {
      await expect(creditScore.connect(updater).updateScore(
        user.address,
        80, // repaymentHistory
        ethers.utils.parseEther("1000"), // walletBalance
        150, // collateralRatio
        ethers.utils.parseEther("5000"), // transactionVolume
        2, // loanDefaults
        365 // timeInDeFi
      )).to.emit(creditScore, "ScoreUpdated");

      const userData = await creditScore.getUserScoreData(user.address);
      expect(userData.repaymentHistory).to.equal(80);
    });

    it("should revert with invalid parameters", async function () {
      await expect(
        creditScore.connect(updater).updateScore(
          user.address,
          101, // invalid repaymentHistory > 100
          ethers.utils.parseEther("1000"),
          150,
          ethers.utils.parseEther("5000"),
          2,
          365
        )
      ).to.be.revertedWith("Invalid repayment history");
    });
  });

  describe("Access Control", function () {
    it("should prevent unauthorized updates", async function () {
      await expect(
        creditScore.connect(user).updateScore(
          user.address,
          80,
          ethers.utils.parseEther("1000"),
          150,
          ethers.utils.parseEther("5000"),
          2,
          365
        )
      ).to.be.reverted;
    });
  });

  // Add more test cases...
}); 