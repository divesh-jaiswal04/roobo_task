// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartWallet {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function delegateCall(address _contract, bytes memory _data) external returns (bytes memory) {
        (bool success, bytes memory result) = _contract.delegatecall(_data);
        require(success, "Delegate call failed");
        return result;
    }

    function transfer(address payable _recipient, uint256 _amount) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        payable(_recipient).call{value:_amount}("");
    }

    function destroyWallet() external {
        require(tx.origin == owner, "Only owner can call this function");
        selfdestruct(payable(owner));
    }

    receive() external payable{}
}