const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProxyContract", function () {
  let ProxyContract;
  let SmartWallet;
  let proxyContract;
  let smartWallet;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    ProxyContract = await ethers.getContractFactory("ProxyContract");
    SmartWallet = await ethers.getContractFactory("SmartWallet");

    [owner, addr1, addr2] = await ethers.getSigners();

    proxyContract = await ProxyContract.deploy();
    smartWallet = await SmartWallet.deploy(owner.address);
});

    it("should create a user wallet", async function () {
      await proxyContract.connect(addr1).createUserWallet();
      expect(await proxyContract.userToWallet(addr1.address)).to.not.equal("0x0000000000000000000000000000000000000000");
    });

    it("should destroy user wallet", async function () {
      await proxyContract.connect(addr1).createUserWallet();
      await proxyContract.connect(addr1).destroyUserWallet();
      expect(await proxyContract.userToWallet(addr1.address)).to.equal("0x0000000000000000000000000000000000000000");
    });
    
    it("should not allow creating wallet for user who already has one", async function () {
      await proxyContract.connect(addr1).createUserWallet();
      await expect(proxyContract.connect(addr1).createUserWallet()).to.be.revertedWith("User already has a wallet");
    });

    it("should not allow destroying wallet for user who doesn't have one", async function () {
      await expect(proxyContract.connect(addr1).destroyUserWallet()).to.be.revertedWith("User does not have a wallet");
    });
  });


describe("SmartWallet", function () {
    let SmartWallet;
    let smartWallet;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        SmartWallet = await ethers.getContractFactory("SmartWallet");
        [owner, addr1, addr2] = await ethers.getSigners();
        smartWallet = await SmartWallet.deploy(owner.address);
    });

    it("should destroy wallet only by owner", async function () {
        await expect(smartWallet.connect(addr1).destroyWallet()).to.be.revertedWith("Only owner can call this function");
        await expect(smartWallet.destroyWallet()).to.not.be.reverted;
    });

    // it("should delegate call to another contract", async function () {
    //     const DummyContract = await ethers.getContractFactory("DummyContract");
    //     const dummyContract = await DummyContract.deploy();
    //     await dummyContract.deployed();
    //     const data = dummyContract.interface.encodeFunctionData("dummyFunction");
    //     const result = await smartWallet.delegateCall(dummyContract.address, data);
    //     expect(result).to.exist;
    // });

    // it("should transfer funds to recipient", async function () {
    //     const amountToSend = ethers.utils.parseEther("1");
    //     await owner.sendTransaction({ to: smartWallet.address, value: amountToSend });
    //     const initialBalanceRecipient = await ethers.provider.getBalance(addr1.address);
    //     await smartWallet.connect(addr1).transfer(addr1.address, amountToSend);
    //     const finalBalanceRecipient = await ethers.provider.getBalance(addr1.address);
    //     expect(finalBalanceRecipient.sub(initialBalanceRecipient)).to.equal(amountToSend);
    // });

    // it("should receive funds", async function () {
    //     const amountToSend = ethers.utils.parseEther("1");
    //     await owner.sendTransaction({ to: smartWallet.address, value: amountToSend });
    //     const finalBalanceSmartWallet = await ethers.provider.getBalance(smartWallet.address);
    //     expect(finalBalanceSmartWallet).to.equal(amountToSend);
    // });
});
