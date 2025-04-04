const { ethers, network, run } = require("hardhat");

async function main() {
  console.log("Starting deployment on network:", network.name);

  // Deploy CreditScore
  console.log("\nDeploying CreditScore contract...");
  const CreditScore = await ethers.getContractFactory("CreditScore");
  const creditScore = await CreditScore.deploy();
  await creditScore.deployed();
  console.log("CreditScore deployed to:", creditScore.address);

  // Deploy LendingToken
  console.log("\nDeploying LendingToken contract...");
  const LendingToken = await ethers.getContractFactory("LendingToken");
  const lendingToken = await LendingToken.deploy();
  await lendingToken.deployed();
  console.log("LendingToken deployed to:", lendingToken.address);

  // Deploy LendingPool
  console.log("\nDeploying LendingPool contract...");
  const LendingPool = await ethers.getContractFactory("LendingPool");
  const lendingPool = await LendingPool.deploy(
    creditScore.address,
    lendingToken.address
  );
  await lendingPool.deployed();
  console.log("LendingPool deployed to:", lendingPool.address);

  // Setup roles and permissions
  console.log("\nSetting up roles and permissions...");
  const updaterRole = await creditScore.UPDATER_ROLE();
  await creditScore.grantRole(updaterRole, lendingPool.address);
  console.log("Granted UPDATER_ROLE to LendingPool");

  // Transfer ownership of LendingToken to LendingPool
  await lendingToken.transferOwnership(lendingPool.address);
  console.log("Transferred LendingToken ownership to LendingPool");

  // Wait for a few block confirmations
  console.log("\nWaiting for block confirmations...");
  await creditScore.deployTransaction.wait(5);
  await lendingToken.deployTransaction.wait(5);
  await lendingPool.deployTransaction.wait(5);

  // Verify contracts on Etherscan if not on localhost
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\nVerifying contracts on Etherscan...");
    
    try {
      await run("verify:verify", {
        address: creditScore.address,
        constructorArguments: [],
      });
      console.log("CreditScore verified");

      await run("verify:verify", {
        address: lendingToken.address,
        constructorArguments: [],
      });
      console.log("LendingToken verified");

      await run("verify:verify", {
        address: lendingPool.address,
        constructorArguments: [creditScore.address, lendingToken.address],
      });
      console.log("LendingPool verified");
    } catch (error) {
      console.error("Error verifying contracts:", error);
    }
  }

  // Log deployment summary
  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("Network:", network.name);
  console.log("CreditScore:", creditScore.address);
  console.log("LendingToken:", lendingToken.address);
  console.log("LendingPool:", lendingPool.address);
  
  // Save deployment addresses to a file
  const fs = require("fs");
  const deployments = {
    network: network.name,
    creditScore: creditScore.address,
    lendingToken: lendingToken.address,
    lendingPool: lendingPool.address,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    `deployments-${network.name}.json`,
    JSON.stringify(deployments, null, 2)
  );
  console.log("\nDeployment addresses saved to deployments-" + network.name + ".json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 