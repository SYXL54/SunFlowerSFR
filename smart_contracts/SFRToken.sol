// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SFRToken is ERC20 { 
    // 直接在合约中内置可铸币地址（硬编码）

    constructor() ERC20("SFR Token", "SFR"){
        _mint(msg.sender, 1000000 * 10 ** decimals()); 
    }

    // only Bank contract can 
    function mint(address to, uint256 amount) external {
        _mint(to, amount); // 
    }

    // only Bank contract can
    function burn(address from, uint256 amount) public {
        _burn(from, amount); //  _burn() not burn()
    }
}