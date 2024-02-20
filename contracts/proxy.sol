// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./smart_wallet.sol";

contract ProxyContract {
    mapping(address => address) public userToWallet;
    event WalletCreated (address owner, address deployedAddress);
    function createUserWallet() external {
        require(userToWallet[msg.sender] == address(0), "User already has a wallet");
        
        SmartWallet newWallet = new SmartWallet(msg.sender);
        userToWallet[msg.sender] = address(newWallet);
        emit WalletCreated(msg.sender, address(newWallet));
    }

    function destroyUserWallet() external {
        require(userToWallet[msg.sender] != address(0), "User does not have a wallet");
        
        address payable walletAddress = payable(userToWallet[msg.sender]);
        SmartWallet(walletAddress).destroyWallet();
        userToWallet[msg.sender] = address(0);
    }
}
