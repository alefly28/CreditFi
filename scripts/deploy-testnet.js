const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Deploy CreditScore
  const CreditScore = await hre.ethers.getContractFactory("CreditScore");
  const creditScore = await CreditScore.deploy();
  await creditScore.deployed();
  console.log("CreditScore deployed to:", creditScore.address);

  // Wait for few block confirmations
  await creditScore.deployTransaction.wait(6);

  // Deploy LendingToken
  const LendingToken = await hre.ethers.getContractFactory("LendingToken");
  const lendingToken = await LendingToken.deploy();
  await lendingToken.deployed();
  console.log("LendingToken deployed to:", lendingToken.address);

  await lendingToken.deployTransaction.wait(6);

  // Deploy LendingPool
  const LendingPool = await hre.ethers.getContractFactory("LendingPool");
  const lendingPool = await LendingPool.deploy(creditScore.address, lendingToken.address);
  await lendingPool.deployed();
  console.log("LendingPool deployed to:", lendingPool.address);

  await lendingPool.deployTransaction.wait(6);

  // Deploy LendingRewards
  const LendingRewards = await hre.ethers.getContractFactory("LendingRewards");
  const lendingRewards = await LendingRewards.deploy();
  await lendingRewards.deployed();
  console.log("LendingRewards deployed to:", lendingRewards.address);

  await lendingRewards.deployTransaction.wait(6);

  // Verify contracts on Etherscan
  console.log("Verifying contracts...");

  await hre.run("verify:verify", {
    address: creditScore.address,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: lendingToken.address,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: lendingPool.address,
    constructorArguments: [creditScore.address, lendingToken.address],
  });

  await hre.run("verify:verify", {
    address: lendingRewards.address,
    constructorArguments: [],
  });

  console.log("Deployment and verification completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 