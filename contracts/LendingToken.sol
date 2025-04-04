// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LendingToken is ERC20, Ownable {
    constructor() ERC20("Lending Token", "LEND") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
} 