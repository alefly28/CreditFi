// Import necessary Hardhat modules
const hre = require("hardhat");

async function main() {
    // Get the contract factory for CreditScore
    const CreditScore = await hre.ethers.getContractFactory("CreditScore");

    // Deploy the CreditScore contract
    const creditScore = await CreditScore.deploy();

    // Wait for the contract deployment to finish
    await creditScore.deployed();

    // Log the address of the deployed contract
    console.log("CreditScore contract deployed to:", creditScore.address);
}

// Run the script and catch errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


