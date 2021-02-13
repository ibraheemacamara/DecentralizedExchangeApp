// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IkaCoin is ERC20{

    constructor () ERC20("IkaCoin", "IKC") {
        _mint(msg.sender, 1000000000000000000000);
    }
}