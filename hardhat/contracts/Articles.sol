// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Articles is ERC1155 {

    mapping(uint256  => string) private _uris; 
    uint256 public articleCounter;

    constructor() public ERC1155("Articles") {
        articleCounter = 0;
    }

    function uri(uint256 tokenId) override public view returns (string memory){
        return(_uris[tokenId]);
    }

    function createCollectible(uint256 amount, string memory _uri ) public {
    _mint(msg.sender, articleCounter, amount, "");
    _uris[articleCounter] = _uri;
    }
}