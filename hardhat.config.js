require("@nomicfoundation/hardhat-toolbox")
// require("@nomiclabs/hardhat-etherscan")
// require("hardhat-deploy")
// require("hardhat-contract-sizer")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
   
    sepolia: {
      url: "https://sepolia.infura.io/v3/60f3b7566e31462483f911b78b7fc13e",
      accounts: [""]
    }
  }
};