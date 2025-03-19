const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("LendingRewards", function () {
  let LendingRewards;
  let lendingRewards;
  let owner;
  let distributor;
  let user;
  let otherUser;

  const REWARDS_DISTRIBUTOR_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("REWARDS_DISTRIBUTOR_ROLE")
  );
  const POINTS_MULTIPLIER = 100;
  const CLAIM_COOLDOWN = 7 * 24 * 60 * 60; // 7 days in seconds
  const MIN_POINTS_TO_CLAIM = 100 * POINTS_MULTIPLIER;

  beforeEach(async function () {
    [owner, distributor, user, otherUser] = await ethers.getSigners();
    LendingRewards = await ethers.getContractFactory("LendingRewards");
    lendingRewards = await LendingRewards.deploy();
    await lendingRewards.deployed();

    // Grant distributor role
    await lendingRewards.grantRole(REWARDS_DISTRIBUTOR_ROLE, distributor.address);
  });

  describe("Deployment", function () {
    it("should set the right admin", async function () {
      const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero;
      expect(await lendingRewards.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });

    it("should set correct token details", async function () {
      expect(await lendingRewards.name()).to.equal("Lending Rewards");
      expect(await lendingRewards.symbol()).to.equal("LRWD");
      expect(await lendingRewards.decimals()).to.equal(18);
    });

    it("should set correct constants", async function () {
      expect(await lendingRewards.POINTS_MULTIPLIER()).to.equal(POINTS_MULTIPLIER);
      expect(await lendingRewards.CLAIM_COOLDOWN()).to.equal(CLAIM_COOLDOWN);
      expect(await lendingRewards.MIN_POINTS_TO_CLAIM()).to.equal(MIN_POINTS_TO_CLAIM);
    });
  });

  describe("Points Management", function () {
    it("should allow distributor to add points", async function () {
      const points = 100;
      await expect(lendingRewards.connect(distributor).addPoints(user.address, points))
        .to.emit(lendingRewards, "PointsAdded")
        .withArgs(user.address, points * POINTS_MULTIPLIER);

      expect(await lendingRewards.userPoints(user.address)).to.equal(points * POINTS_MULTIPLIER);
      expect(await lendingRewards.totalPointsEarned(user.address)).to.equal(points * POINTS_MULTIPLIER);
    });

    it("should prevent non-distributor from adding points", async function () {
      await expect(
        lendingRewards.connect(user).addPoints(user.address, 100)
      ).to.be.reverted;
    });

    it("should accumulate points correctly", async function () {
      await lendingRewards.connect(distributor).addPoints(user.address, 100);
      await lendingRewards.connect(distributor).addPoints(user.address, 50);

      expect(await lendingRewards.userPoints(user.address)).to.equal(150 * POINTS_MULTIPLIER);
      expect(await lendingRewards.totalPointsEarned(user.address)).to.equal(150 * POINTS_MULTIPLIER);
    });
  });

  describe("Rewards Claiming", function () {
    beforeEach(async function () {
      await lendingRewards.connect(distributor).addPoints(user.address, 200);
    });

    it("should allow claiming rewards with sufficient points", async function () {
      await expect(lendingRewards.connect(user).claimRewards())
        .to.emit(lendingRewards, "RewardsClaimed")
        .withArgs(user.address, 200);

      expect(await lendingRewards.userPoints(user.address)).to.equal(0);
      expect(await lendingRewards.balanceOf(user.address)).to.equal(200);
    });

    it("should prevent claiming with insufficient points", async function () {
      await lendingRewards.connect(distributor).addPoints(otherUser.address, 50);
      await expect(
        lendingRewards.connect(otherUser).claimRewards()
      ).to.be.revertedWith("Not enough points");
    });

    it("should enforce claim cooldown", async function () {
      await lendingRewards.connect(user).claimRewards();
      await lendingRewards.connect(distributor).addPoints(user.address, 200);

      await expect(
        lendingRewards.connect(user).claimRewards()
      ).to.be.revertedWith("Too soon to claim");

      // Fast forward past cooldown
      await time.increase(CLAIM_COOLDOWN + 1);

      await expect(lendingRewards.connect(user).claimRewards())
        .to.emit(lendingRewards, "RewardsClaimed");
    });
  });

  describe("User Stats", function () {
    it("should return correct user stats", async function () {
      const points = 150;
      await lendingRewards.connect(distributor).addPoints(user.address, points);

      const [currentPoints, totalEarned, nextClaimTime] = await lendingRewards.getUserStats(user.address);
      expect(currentPoints).to.equal(points * POINTS_MULTIPLIER);
      expect(totalEarned).to.equal(points * POINTS_MULTIPLIER);
      expect(nextClaimTime).to.equal(0 + CLAIM_COOLDOWN);
    });

    it("should update stats after claiming", async function () {
      await lendingRewards.connect(distributor).addPoints(user.address, 200);
      const blockTime = await time.latest();
      
      await lendingRewards.connect(user).claimRewards();

      const [currentPoints, totalEarned, nextClaimTime] = await lendingRewards.getUserStats(user.address);
      expect(currentPoints).to.equal(0);
      expect(totalEarned).to.equal(200 * POINTS_MULTIPLIER);
      expect(nextClaimTime).to.be.closeTo(blockTime + CLAIM_COOLDOWN, 5);
    });
  });

  describe("Emergency Controls", function () {
    it("should allow admin to pause the contract", async function () {
      await lendingRewards.pause();
      expect(await lendingRewards.paused()).to.be.true;
    });

    it("should prevent points addition when paused", async function () {
      await lendingRewards.pause();
      await expect(
        lendingRewards.connect(distributor).addPoints(user.address, 100)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("should prevent claiming when paused", async function () {
      await lendingRewards.connect(distributor).addPoints(user.address, 200);
      await lendingRewards.pause();
      await expect(
        lendingRewards.connect(user).claimRewards()
      ).to.be.revertedWith("Pausable: paused");
    });

    it("should allow admin to unpause the contract", async function () {
      await lendingRewards.pause();
      await lendingRewards.unpause();
      expect(await lendingRewards.paused()).to.be.false;
    });
  });

  describe("Role Management", function () {
    it("should allow admin to grant distributor role", async function () {
      await expect(lendingRewards.grantDistributorRole(otherUser.address))
        .to.emit(lendingRewards, "RoleGranted")
        .withArgs(REWARDS_DISTRIBUTOR_ROLE, otherUser.address, owner.address);
    });

    it("should allow admin to revoke distributor role", async function () {
      await expect(lendingRewards.revokeDistributorRole(distributor.address))
        .to.emit(lendingRewards, "RoleRevoked")
        .withArgs(REWARDS_DISTRIBUTOR_ROLE, distributor.address, owner.address);
    });

    it("should prevent non-admin from managing roles", async function () {
      await expect(
        lendingRewards.connect(user).grantDistributorRole(otherUser.address)
      ).to.be.reverted;
    });
  });
}); 