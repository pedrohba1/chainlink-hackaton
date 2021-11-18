pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract NFTMarket is ReentrancyGuard, ERC1155Holder {
    using Counters for Counters.Counter;
    Counters.Counter private latestItemId;
    Counters.Counter private itemsSold;
    mapping(uint256 => MarketItem) private marketItems;

    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        uint256 amount;
        address nftContract;
        address payable seller;
        bool sold;
    }

    event SelOrderCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        uint256 price,
        uint256 amount,
        address indexed nftContract,
        address seller
    );

    constructor() {}

    function sell(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        uint256 _amount
    ) public payable nonReentrant {
        require(_price > 0, "prince cannot be 0");

        IERC1155(_nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            _amount,
            ""
        );

        marketItems[latestItemId.current()] = MarketItem(
            latestItemId.current(),
            _tokenId,
            _price,
            _amount,
            _nftContract,
            payable(msg.sender),
            false
        );

        emit SelOrderCreated(
            latestItemId.current(),
            _tokenId,
            _price,
            _amount,
            _nftContract,
            payable(msg.sender)
        );
    }
}
