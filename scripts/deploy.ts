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
  console.log(`Deployer Balance: ${ethers.formatEther(balance)} native tokens\n`);

  if (balance === BigInt(0) && network.name !== "hardhat" && network.name !== "localhost") {
    console.warn(
      "WARNING: Deployer balance is 0. Deployment may fail due to insufficient funds."
    );
  }

  console.log("Deploying Stamply...");
  const StamplyFactory = await ethers.getContractFactory("Stamply");
  const stamply = await StamplyFactory.deploy();
  await stamply.waitForDeployment();

  const contractAddress = await stamply.getAddress();
  const deploymentTx = stamply.deploymentTransaction();

  console.log(`\n========================================`);
  console.log(`SUCCESS! Stamply contract deployed to:`);
  console.log(`Address: ${contractAddress}`);
  if (deploymentTx) {
    console.log(`Tx Hash: ${deploymentTx.hash}`);
    if (network.config.chainId === 968) {
      console.log(`Explorer: https://scan.bohr.life/tx/${deploymentTx.hash}`);
    }
  }
  console.log(`========================================\n`);
  console.log(`Next step: Update NEXT_PUBLIC_CONTRACT_ADDRESS in your frontend .env file:`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}\n`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
