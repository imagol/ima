pragma solidity ^0.4.0;

import "./StandardToken.sol";

contract ImagolStandardToken is StandardToken {
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string _name, string _symbol, uint8 _decimals, uint256 _totalTokenAmount, address _creator) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply_ = _totalTokenAmount;
        balances[_creator] = _totalTokenAmount;
    }
}
