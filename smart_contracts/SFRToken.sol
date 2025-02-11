// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SFRToken is ERC20, Ownable { 
    constructor() ERC20("SFR Token", "SFR") Ownable(msg.sender){
        _mint(msg.sender, 1000000 * 10 ** decimals()); //初始化100万SFR
    }

    // 只有银行合约能调用这个函数来铸造 SFR
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount); // 
    }

    // 只有银行合约能销毁 SFR
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount); // 调用 _burn() 而不是 burn()
    }
}
