async function main() {
  // Get the contract to deploy
  const LendingPlatform = await ethers.getContractFactory("LendingPlatform");
  
  // Deploy the contract with arguments (replace addresses with your actual deployed addresses)
  const lendingPlatform = await LendingPlatform.deploy(
    "0x84cC98139B92d611A8b7160768a250771385Ed54", 
    "https://sepolia.infura.io/v3/7354b81f8828486a881d5958c7fc9ac4", 
    "0x694AA1769357215DE4FAC081bf1f309aDC325306"
  );

  await lendingPlatform.deployed();
  console.log("LendingPlatform deployed to:", lendingPlatform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
