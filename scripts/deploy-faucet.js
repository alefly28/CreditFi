const hre = require("hardhat");

async function main() {
  console.log("Deploying TestnetFaucet...");

  const TestnetFaucet = await hre.ethers.getContractFactory("TestnetFaucet");
  const faucet = await TestnetFaucet.deploy();

  await faucet.deployed();

  console.log("TestnetFaucet deployed to:", faucet.address);

  // Verify the contract on Etherscan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await faucet.deployTransaction.wait(6); // wait for 6 block confirmations

    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: faucet.address,
      constructorArguments: [],
    });
  }

  // Fund the faucet with some ETH if on testnet
  if (hre.network.name === "sepolia") {
    const [deployer] = await hre.ethers.getSigners();
    const fundingAmount = hre.ethers.utils.parseEther("1.0"); // Fund with 1 ETH

    console.log("Funding faucet with initial ETH...");
    await deployer.sendTransaction({
      to: faucet.address,
      value: fundingAmount,
    });
    console.log(`Funded faucet with ${hre.ethers.utils.formatEther(fundingAmount)} ETH`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 