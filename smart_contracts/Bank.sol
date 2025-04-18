// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SFRToken.sol";  // 导入 SFR 代币合约

contract Bank {
    SFRToken public sfrToken;  // 代币合约实例



    event Deposit(address indexed user, uint256 amount, string message); // 记录存款日志，铸造失败原因排查
    // event RewardIssued(address indexed user, uint256 amount);  // 记录奖励事件

    constructor(address _sfrToken){
        sfrToken = SFRToken(_sfrToken);
    }

    // 存款：用户存入 ETH，铸造等量的 SFR
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");

        // 让 SFRToken 合约铸造 SFR 代币给存款用户
        sfrToken.mint(msg.sender, msg.value);

        emit Deposit(msg.sender, msg.value, "Minting SFR successful"); // 记录deposit事件
    }

    // 取款：用户返还 SFR，销毁 SFR 并返还 ETH
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(sfrToken.balanceOf(msg.sender) >= amount, "Insufficient SFR token balance");
        require(address(this).balance >= amount, "eth not enough");

        // 用户需要先授权给 Bank 合约，让其能转移 SFR
        sfrToken.transferFrom(msg.sender, address(this), amount);
        
        // 销毁用户返还的 SFR
        sfrToken.burn(address(this), amount);

        // 退还 ETH
        payable(msg.sender).transfer(amount);
    }

    // 查询银行 ETH 余额
    function getBankBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 允许合约接收 ETH
    receive() external payable {}
}
