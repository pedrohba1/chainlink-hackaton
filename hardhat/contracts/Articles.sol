// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Articles is ERC1155Supply {
    mapping(uint256 => string) private _uris;
    mapping(uint256 => address) public creators;
    uint256 public lastId;

    constructor() ERC1155("Articles") {
        lastId = 0;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    /**
     * @dev Require msg.sender to be the creator of the token id
     */
    modifier creatorOnly(uint256 _id) {
        require(creators[_id] == msg.sender, "restricted to creator");
        _;
    }

    /**
     * @dev Creates a new token type and assigns _initialSupply msg.sender address
     * @param _initialSupply amount to supply the first owner
     * @param _uri URI for this token
     */
    function create(uint256 _initialSupply, string memory _uri) public {
        _uris[lastId] = _uri;
        creators[lastId] = msg.sender;
        _mint(msg.sender, lastId, _initialSupply, "");
        lastId += 1;
    }

    /**
     * @dev Creates a new token type and assigns _initialSupply to an addresss
     * @param _aditionalSupply amount to supply the first owner
     * @param _id to apply additional supplys
     */
    function increaseSupply(uint256 _aditionalSupply, uint256 _id)
        public
        creatorOnly(_id)
    {
        _mint(msg.sender, _id, _aditionalSupply, "");
    }
}
