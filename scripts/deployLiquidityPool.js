const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const priceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";  // Replace with the actual Chainlink price feed address
    
    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
    const liquidityPool = await LiquidityPool.deploy(priceFeedAddress); // Pass the argument to the constructor
    
    await liquidityPool.deployed();

    console.log("LiquidityPool contract deployed to:", liquidityPool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
