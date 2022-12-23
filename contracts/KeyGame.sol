// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KeyGame {
    struct Key {
        uint256 id;
        uint256 index;
        uint256 create;
        uint256 price;
        address owner;
    }

    IERC20 _coin;
    Key public current;
    uint256 _index = 0;
    uint256 public cashPool = 0;
    uint256 _initPrice = 0.01 ether;
    mapping(address => Key) _keys;
    
    event KeyBought(address indexed buyer, uint256 indexed id, uint256 price, Key newKey);

    function setCoin(address coin) public {
        require(msg.sender == address(this));
        _coin = IERC20(coin);
    }

    function _generateKey(uint256 _price) internal returns (Key memory) {
        _index++;
        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
        return Key(id, _index, block.timestamp, _price, address(0));
    }

    function buyKey() public {
        uint256 amount = _coin.allowance(msg.sender, address(this));
        require(amount >= current.price);
        _coin.transferFrom(msg.sender, address(this), current.price);
        _keys[msg.sender] = current;

        cashPool += current.price / 2;
        current = _generateKey(current.price * 2);
        emit KeyBought(msg.sender, current.id, current.price, current);
    }
}