const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("LendingGovernance", function () {
  let governanceToken;
  let timelock;
  let governor;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const name = "LendingGovernance";
  const votingDelay = 1;
  const votingPeriod = 50400;
  const proposalThreshold = ethers.utils.parseEther("100000");
  const quorumPercentage = 4;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy governance token
    const GovernanceToken = await ethers.getContractFactory("LendingToken");
    governanceToken = await GovernanceToken.deploy();
    await governanceToken.deployed();

    // Setup timelock
    const minDelay = 3600; // 1 hour
    const proposers = [owner.address];
    const executors = [owner.address];
    const TimelockController = await ethers.getContractFactory("TimelockController");
    timelock = await TimelockController.deploy(minDelay, proposers, executors, owner.address);
    await timelock.deployed();

    // Deploy governor
    const Governor = await ethers.getContractFactory("LendingGovernance");
    governor = await Governor.deploy(
      name,
      governanceToken.address,
      timelock.address,
      votingDelay,
      votingPeriod,
      proposalThreshold,
      quorumPercentage
    );
    await governor.deployed();

    // Setup roles
    const proposerRole = await timelock.PROPOSER_ROLE();
    const executorRole = await timelock.EXECUTOR_ROLE();
    await timelock.grantRole(proposerRole, governor.address);
    await timelock.grantRole(executorRole, governor.address);

    // Mint tokens and delegate
    await governanceToken.mint(owner.address, ethers.utils.parseEther("1000000"));
    await governanceToken.delegate(owner.address);
    await time.increase(1); // Wait for delegation to take effect
  });

  describe("Deployment", function () {
    it("should set correct initial parameters", async function () {
      expect(await governor.votingDelay()).to.equal(votingDelay);
      expect(await governor.votingPeriod()).to.equal(votingPeriod);
      expect(await governor.proposalThreshold()).to.equal(proposalThreshold);
      expect(await governor.name()).to.equal(name);
    });

    it("should set correct governance token", async function () {
      expect(await governor.token()).to.equal(governanceToken.address);
    });

    it("should set correct timelock", async function () {
      expect(await governor.timelock()).to.equal(timelock.address);
    });
  });

  describe("Proposal Creation", function () {
    it("should allow creating proposals", async function () {
      const targets = [governanceToken.address];
      const values = [0];
      const calldatas = [
        governanceToken.interface.encodeFunctionData("mint", [addr1.address, ethers.utils.parseEther("1000")])
      ];
      const description = "Mint 1000 tokens to addr1";

      await expect(
        governor.propose(targets, values, calldatas, description)
      ).to.emit(governor, "ProposalCreated");
    });
  });

  describe("Voting", function () {
    let proposalId;

    beforeEach(async function () {
      const targets = [governanceToken.address];
      const values = [0];
      const calldatas = [
        governanceToken.interface.encodeFunctionData("mint", [addr1.address, ethers.utils.parseEther("1000")])
      ];
      const description = "Mint 1000 tokens to addr1";

      const tx = await governor.propose(targets, values, calldatas, description);
      const receipt = await tx.wait();
      proposalId = receipt.events[0].args.proposalId;

      await time.increase(votingDelay + 1);
    });

    it("should allow voting on active proposals", async function () {
      await expect(governor.castVote(proposalId, 1))
        .to.emit(governor, "VoteCast");
    });
  });

  describe("Quorum", function () {
    it("should calculate quorum correctly", async function () {
      const blockNumber = await ethers.provider.getBlockNumber();
      const quorum = await governor.quorum(blockNumber - 1);
      const expectedQuorum = ethers.utils.parseEther("1000000").mul(quorumPercentage).div(100);
      expect(quorum).to.equal(expectedQuorum);
    });

    it("should require quorum for proposal to succeed", async function () {
      const targets = [governanceToken.address];
      const values = [0];
      const calldatas = [
        governanceToken.interface.encodeFunctionData("mint", [addr1.address, ethers.utils.parseEther("1000")])
      ];
      const description = "Mint 1000 tokens to addr1";

      const tx = await governor.propose(targets, values, calldatas, description);
      const receipt = await tx.wait();
      const proposalId = receipt.events[0].args.proposalId;

      await time.increase(votingDelay + 1);
      await governor.castVote(proposalId, 1);
      await time.increase(votingPeriod + 1);

      expect(await governor.state(proposalId)).to.equal(3); // Defeated due to not meeting quorum
    });
  });
}); 