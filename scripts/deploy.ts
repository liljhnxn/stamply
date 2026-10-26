import hre from "hardhat";

const { ethers, network } = hre;

async function main() {
  console.log(`\n========================================`);
  console.log(`Deploying Stamply contract to: ${network.name}`);
  console.log(`Chain ID: ${network.config.chainId}`);
  console.log(`========================================\n`);

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account found! Please set PRIVATE_KEY in your .env file."
    );
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer Address: ${deployer.address}`);
  console.log(`Deployer Balance: ${ethers.formatEther(balance)} BOT\n`);

  console.log("Preparing Stamply contract factory...");
  const StamplyFactory = await ethers.getContractFactory("Stamply");

  // Query network fee data to use minimum gas without overpaying
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || 20000000000n;
  console.log(`Current Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} Gwei`);

  // Estimate exact deployment gas
  const deployTxReq = await StamplyFactory.getDeployTransaction();
  const estimatedGas = await ethers.provider.estimateGas(deployTxReq);
  const estimatedCost = estimatedGas * gasPrice;

  console.log(`Estimated Deployment Gas: ${estimatedGas.toString()} units`);
  console.log(`Estimated Deployment Cost: ${ethers.formatEther(estimatedCost)} BOT\n`);

  if (balance < estimatedCost && network.name !== "hardhat" && network.name !== "localhost") {
    console.error(`================================================================`);
    console.error(`ERROR: Insufficient funds in deployer wallet to cover gas!`);
    console.error(`Required: ~${ethers.formatEther(estimatedCost)} BOT`);
    console.error(`Available: ${ethers.formatEther(balance)} BOT`);
    console.error(`Please send at least 0.02 BOT to deployer address:`);
    console.error(`${deployer.address}`);
    console.error(`================================================================\n`);
    throw new Error("Insufficient deployer balance for gas fee.");
  }

  console.log("Deploying Stamply (optimized for lowest gas fee)...");
  // Pass exact gasPrice to ensure no excessive fee is used
  const stamply = await StamplyFactory.deploy({
    gasPrice: gasPrice,
  });
  console.log(`Transaction broadcast! Hash: ${stamply.deploymentTransaction()?.hash}`);
  console.log("Waiting for block confirmation...");
  await stamply.waitForDeployment();

  const contractAddress = await stamply.getAddress();
  const deploymentTx = stamply.deploymentTransaction();
  const receipt = await deploymentTx?.wait();

  const gasUsed = receipt?.gasUsed || 0n;
  const actualCost = gasUsed * (receipt?.gasPrice || gasPrice);

  console.log(`\n========================================`);
  console.log(`SUCCESS! Stamply contract deployed to:`);
  console.log(`Address: ${contractAddress}`);
  if (deploymentTx) {
    console.log(`Tx Hash: ${deploymentTx.hash}`);
    console.log(`Gas Used: ${gasUsed.toString()}`);
    console.log(`Actual Cost: ${ethers.formatEther(actualCost)} BOT`);

    console.log(`Explorer: https://scan.botchain.ai/tx/${deploymentTx.hash}`);
  }
  console.log(`========================================\n`);
  console.log(`Next step: Update NEXT_PUBLIC_CONTRACT_ADDRESS in your frontend .env file:`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}\n`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
