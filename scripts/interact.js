const hre = require("hardhat");
const deployments = require("../deployments/sepolia.json");

async function main() {
  // Get contract instances
  const creditScore = await hre.ethers.getContractAt("CreditScore", deployments.creditScore);
  const lendingPool = await hre.ethers.getContractAt("LendingPool", deployments.lendingPool);
  
  // Example interaction
  const minCreditScore = await lendingPool.minimumCreditScore();
  console.log("Minimum credit score:", minCreditScore.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 