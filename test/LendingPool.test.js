const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingPool", function () {
  let LendingPool, CreditScore, LendingToken;
  let lendingPool, creditScore, lendingToken;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    CreditScore = await ethers.getContractFactory("CreditScore");
    creditScore = await CreditScore.deploy();

    LendingToken = await ethers.getContractFactory("LendingToken");
    lendingToken = await LendingToken.deploy();

    LendingPool = await ethers.getContractFactory("LendingPool");
    lendingPool = await LendingPool.deploy(creditScore.address, lendingToken.address);
  });

  describe("Deposits", function () {
    it("Should accept deposits", async function () {
      const depositAmount = ethers.utils.parseEther("1");
      await lendingPool.connect(user1).deposit({ value: depositAmount });
      expect(await lendingPool.deposits(user1.address)).to.equal(depositAmount);
    });
  });

  describe("Lending Features", function () {
    it("Should apply loyalty discount for eligible users", async function () {
      const depositAmount = ethers.utils.parseEther("10");
      const loanAmount = ethers.utils.parseEther("1");
      
      // Add initial deposit to the pool
      await lendingPool.connect(owner).deposit({ value: depositAmount });
      
      // Setup user with 5 successful loans
      for(let i = 0; i < 5; i++) {
        // Provide collateral
        await lendingPool.connect(user1).borrow(loanAmount, { 
          value: ethers.utils.parseEther("1.5") // 150% collateral ratio
        });
        
        // Repay loan with interest
        const interest = await lendingPool.calculateInterest(loanAmount, await ethers.provider.getBlock('latest').then(b => b.timestamp));
        await lendingPool.connect(user1).repayLoan({ value: loanAmount.add(interest) });
      }
      
      const discount = await lendingPool.calculateLoyaltyDiscount(user1.address);
      expect(discount).to.equal(5); // 5% loyalty discount
    });

    it("Should give early repayment bonus", async function () {
      // Setup loan
      const bonus = await lendingPool.calculateEarlyRepaymentBonus(ethers.utils.parseEther("1"));
      expect(bonus).to.equal(ethers.utils.parseEther("0.02"));
    });
  });

  // Add more tests...
}); 