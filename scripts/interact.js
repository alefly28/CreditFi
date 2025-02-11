const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Load deployment addresses
  const network = process.env.HARDHAT_NETWORK || "localhost";
  const deploymentFile = `deployments-${network}.json`;
  
  if (!fs.existsSync(deploymentFile)) {
    console.error(`Deployment file not found: ${deploymentFile}`);
    console.error("Please deploy the contracts first using: npx hardhat run scripts/deploy.js --network <network>");
    process.exit(1);
  }

  const deployments = JSON.parse(fs.readFileSync(deploymentFile));

  // Get contract instances
  const CreditScore = await ethers.getContractFactory("CreditScore");
  const LendingToken = await ethers.getContractFactory("LendingToken");
  const LendingPool = await ethers.getContractFactory("LendingPool");

  const creditScore = CreditScore.attach(deployments.creditScore);
  const lendingToken = LendingToken.attach(deployments.lendingToken);
  const lendingPool = LendingPool.attach(deployments.lendingPool);

  // Get signers
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with contracts using account:", deployer.address);

  // Example interactions
  console.log("\nChecking contract states:");
  console.log("-------------------------");

  // Check if contracts are paused
  const isCreditScorePaused = await creditScore.paused();
  console.log("CreditScore paused:", isCreditScorePaused);

  // Get total deposits in lending pool
  const totalDeposits = await lendingPool.totalDeposits();
  console.log("Total deposits:", ethers.utils.formatEther(totalDeposits), "ETH");

  // Example: Update a user's credit score
  console.log("\nUpdating credit score for a test user...");
  try {
    const tx = await creditScore.updateScore(
      deployer.address,
      80, // repaymentHistory
      ethers.utils.parseEther("1000"), // walletBalance
      150, // collateralRatio
      ethers.utils.parseEther("5000"), // transactionVolume
      0, // loanDefaults
      365 // timeInDeFi
    );
    await tx.wait();
    console.log("Credit score updated successfully");

    // Get the updated credit score
    const score = await creditScore.calculateCreditScore(deployer.address);
    console.log("New credit score:", score.toString());
  } catch (error) {
    console.error("Error updating credit score:", error.message);
  }

  // Example: Make a deposit
  console.log("\nMaking a test deposit...");
  try {
    const depositAmount = ethers.utils.parseEther("0.1");
    const tx = await lendingPool.deposit({ value: depositAmount });
    await tx.wait();
    console.log("Deposited:", ethers.utils.formatEther(depositAmount), "ETH");

    // Check updated balance
    const userDeposit = await lendingPool.deposits(deployer.address);
    console.log("User deposit balance:", ethers.utils.formatEther(userDeposit), "ETH");
  } catch (error) {
    console.error("Error making deposit:", error.message);
  }

  console.log("\nInteraction complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 