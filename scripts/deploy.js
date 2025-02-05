const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Deploy CreditScore
  const CreditScore = await ethers.getContractFactory("CreditScore");
  const creditScore = await CreditScore.deploy();
  await creditScore.deployed();
  console.log("CreditScore deployed to:", creditScore.address);

  // Deploy LendingPlatform
  const LendingPlatform = await ethers.getContractFactory("LendingPlatform");
  const lendingPlatform = await LendingPlatform.deploy(
    creditScore.address,
    process.env.PRICE_FEED_ADDRESS
  );
  await lendingPlatform.deployed();
  console.log("LendingPlatform deployed to:", lendingPlatform.address);

  // Setup roles
  const updaterRole = await creditScore.UPDATER_ROLE();
  await creditScore.grantRole(updaterRole, lendingPlatform.address);
  console.log("Roles configured");

  // Verify contracts on Etherscan
  if (process.env.ETHERSCAN_API_KEY) {
    await hre.run("verify:verify", {
      address: creditScore.address,
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: lendingPlatform.address,
      constructorArguments: [creditScore.address, process.env.PRICE_FEED_ADDRESS],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 