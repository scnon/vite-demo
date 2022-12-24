// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KeyGame {
    struct Key {
        uint256 id;
        uint256 index;
        uint256 create;
        uint256 price;
        uint256 cash;
        address owner;
        address[] masters;
    }

    IERC20 _coin;
    address _owner;
    Key public current;
    uint256 _index = 0;
    uint256 public cashPool = 0;
    uint256 _initPrice = 0.01 ether;
    Key [] public keys;
    mapping(address => Key) _keys;

    
    event KeyBought(address indexed buyer, uint256 indexed id, uint256 price, Key newKey);

    constructor() {
        _owner = msg.sender;
        current = _generateKey(_initPrice);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can call this function.");
        _;
    }

    function setCoin(address coin) public onlyOwner {
        _coin = IERC20(coin);
    }

    function _generateKey(uint256 _price) internal returns (Key memory) {
        _index++;
        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
        current = Key(id, _index, block.timestamp, _price, 0, address(0), new address[](0));
        keys.push(current);
        return current;
    }

    function getHistroy() public view returns (Key[] memory) {
        return keys;
    }

    function buyKey(uint256 _id) public payable {
        require(current.owner != address(0), "Key is already sold");
        require(_id == current.id, "Wrong key id");
        uint256 amount = _coin.allowance(msg.sender, address(this));

        require(amount >= current.price, "Not enough allowance");
        _coin.transferFrom(msg.sender, address(this), current.price);

        current.owner = msg.sender;
        _keys[msg.sender] = current;

        uint256 money = current.price / 2;
        for(uint256 i = 0; i < keys.length; i++) {
            if(keys[i].owner == msg.sender) {
                keys[i].masters.push(current.owner);
            }
        }
        current.cash += money / (keys.length - 1);
        cashPool += current.price - current.cash;

        _generateKey(current.price * 2);
        emit KeyBought(msg.sender, current.id, current.price, current);
    }
}