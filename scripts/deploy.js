async function main() {
  try {
      const { ethers } = require("hardhat");
      const ProxyContract = await ethers.getContractFactory("ProxyContract");
      const SmartWallet = await ethers.getContractFactory("SmartWallet");

      // Deploy ProxyContract
      console.log("Deploying ProxyContract...");
      const proxyContract = await ProxyContract.deploy();
      // await proxyContract.deployed(); // Wait for deployment to be confirmed
      console.log("ProxyContract deployed to:", proxyContract.target);

      // Deploy SmartWallet with signer's address as the owner
      console.log("Deploying SmartWallet...");
      const [signer] = await ethers.getSigners();
      const smartWallet = await SmartWallet.deploy(signer.address);
      // await smartWallet.deployed(); // Wait for deployment to be confirmed
      console.log("SmartWallet deployed to:", smartWallet.target);
  } catch (error) {
      console.error("Error deploying contracts:", error.message);
      process.exit(1);
  }
}

main();


// Deploying ProxyContract...
// ProxyContract deployed to: 0x95f4F87D200E29519deDa63BD947C38C42E8dF07
// Deploying SmartWallet...
// SmartWallet deployed to: 0xA7aB3484516d2Ce6fF61b871164B030fb62ac62E