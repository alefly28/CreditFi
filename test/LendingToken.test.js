const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingToken", function () {
  let LendingToken;
  let lendingToken;
  let owner;
  let user;
  let otherUser;

  beforeEach(async function () {
    [owner, user, otherUser] = await ethers.getSigners();
    LendingToken = await ethers.getContractFactory("LendingToken");
    lendingToken = await LendingToken.deploy();
    await lendingToken.deployed();
  });

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      expect(await lendingToken.owner()).to.equal(owner.address);
    });

    it("should set correct token details", async function () {
      expect(await lendingToken.name()).to.equal("Lending Token");
      expect(await lendingToken.symbol()).to.equal("LEND");
      expect(await lendingToken.decimals()).to.equal(18);
    });

    it("should start with zero total supply", async function () {
      expect(await lendingToken.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("should allow owner to mint tokens", async function () {
      const amount = ethers.utils.parseEther("100");
      await expect(lendingToken.mint(user.address, amount))
        .to.emit(lendingToken, "Transfer")
        .withArgs(ethers.constants.AddressZero, user.address, amount);

      expect(await lendingToken.balanceOf(user.address)).to.equal(amount);
    });

    it("should prevent non-owner from minting tokens", async function () {
      const amount = ethers.utils.parseEther("100");
      await expect(
        lendingToken.connect(user).mint(user.address, amount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should update total supply after minting", async function () {
      const amount = ethers.utils.parseEther("100");
      await lendingToken.mint(user.address, amount);
      expect(await lendingToken.totalSupply()).to.equal(amount);
    });
  });

  describe("Token Transfers", function () {
    beforeEach(async function () {
      await lendingToken.mint(user.address, ethers.utils.parseEther("1000"));
    });

    it("should allow users to transfer tokens", async function () {
      const amount = ethers.utils.parseEther("100");
      await expect(lendingToken.connect(user).transfer(otherUser.address, amount))
        .to.emit(lendingToken, "Transfer")
        .withArgs(user.address, otherUser.address, amount);

      expect(await lendingToken.balanceOf(otherUser.address)).to.equal(amount);
    });

    it("should fail when transferring more than balance", async function () {
      const amount = ethers.utils.parseEther("1001");
      await expect(
        lendingToken.connect(user).transfer(otherUser.address, amount)
      ).to.be.reverted;
    });

    it("should update balances correctly after transfer", async function () {
      const initialBalance = ethers.utils.parseEther("1000");
      const transferAmount = ethers.utils.parseEther("300");

      await lendingToken.connect(user).transfer(otherUser.address, transferAmount);

      expect(await lendingToken.balanceOf(user.address)).to.equal(
        initialBalance.sub(transferAmount)
      );
      expect(await lendingToken.balanceOf(otherUser.address)).to.equal(transferAmount);
    });
  });

  describe("Allowances", function () {
    beforeEach(async function () {
      await lendingToken.mint(user.address, ethers.utils.parseEther("1000"));
    });

    it("should allow setting allowances", async function () {
      const amount = ethers.utils.parseEther("100");
      await expect(lendingToken.connect(user).approve(otherUser.address, amount))
        .to.emit(lendingToken, "Approval")
        .withArgs(user.address, otherUser.address, amount);

      expect(await lendingToken.allowance(user.address, otherUser.address)).to.equal(amount);
    });

    it("should allow transferFrom with sufficient allowance", async function () {
      const amount = ethers.utils.parseEther("100");
      await lendingToken.connect(user).approve(otherUser.address, amount);

      await expect(
        lendingToken.connect(otherUser).transferFrom(user.address, otherUser.address, amount)
      )
        .to.emit(lendingToken, "Transfer")
        .withArgs(user.address, otherUser.address, amount);

      expect(await lendingToken.allowance(user.address, otherUser.address)).to.equal(0);
    });

    it("should fail transferFrom with insufficient allowance", async function () {
      const approveAmount = ethers.utils.parseEther("100");
      const transferAmount = ethers.utils.parseEther("101");

      await lendingToken.connect(user).approve(otherUser.address, approveAmount);

      await expect(
        lendingToken.connect(otherUser).transferFrom(user.address, otherUser.address, transferAmount)
      ).to.be.reverted;
    });
  });

  describe("Ownership", function () {
    it("should allow owner to transfer ownership", async function () {
      await expect(lendingToken.transferOwnership(otherUser.address))
        .to.emit(lendingToken, "OwnershipTransferred")
        .withArgs(owner.address, otherUser.address);

      expect(await lendingToken.owner()).to.equal(otherUser.address);
    });

    it("should prevent non-owner from transferring ownership", async function () {
      await expect(
        lendingToken.connect(user).transferOwnership(otherUser.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
}); 