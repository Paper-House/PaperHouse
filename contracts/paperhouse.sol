// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PaperHouse is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PaperHouse", "PH") {}

    event Published(
        uint256 paperId,
        string tokenUri,
        string author,
        address owner,
        bool allowFunding,
        uint256 fundAmount
    );
    event Funding(
        address from,
        address to,
        uint256 amount,
        uint256 paperId,
        uint256 totalAmountFunded
    );
    event UpdatePaper(uint256 paperId, bool allowFunding, uint256 amount);

    struct ResearchPaper {
        uint256 tokenId;
        address owner;
        string author;
        string tokenUri;
        bool allowFunding;
        uint256 fundAmount;
        uint256 totalAmountFunded;
    }
    mapping(uint256 => ResearchPaper) public papers;

    function publish(
        string memory tokenURI,
        string memory _author,
        bool _isfunding,
        uint256 _fundAmount
    ) public {
        _tokenIds.increment();

        uint256 newtokenId = _tokenIds.current();

        _mint(msg.sender, newtokenId);
        _setTokenURI(newtokenId, tokenURI);

        ResearchPaper memory rpaper = ResearchPaper(
            newtokenId,
            msg.sender,
            _author,
            tokenURI,
            _isfunding,
            _fundAmount,
            0
        );

        papers[newtokenId] = rpaper;

        emit Published(
            newtokenId,
            tokenURI,
            _author,
            msg.sender,
            _isfunding,
            _fundAmount
        );
    }

    function fundapaper(uint256 _paperid) public payable {
        ResearchPaper storage rpaper = papers[_paperid];

        require(rpaper.allowFunding == true, "Funding not allowed");

        require(
            msg.value <= (rpaper.fundAmount - rpaper.totalAmountFunded),
            "no more Funding allowed"
        );

        payable(rpaper.owner).transfer(msg.value);

        uint256 amount = rpaper.totalAmountFunded;

        amount += msg.value;
        rpaper.totalAmountFunded = amount;

        emit Funding(msg.sender, rpaper.owner, msg.value, _paperid, amount);
    }

    function updatepaper(
        uint256 _paperid,
        bool _allowFunding,
        uint256 _amount
    ) public {
        ResearchPaper storage rpaper = papers[_paperid];
        require(
            msg.sender == rpaper.owner,
            "you are not the owner of this paper to update"
        );
        rpaper.allowFunding = _allowFunding;
        rpaper.fundAmount = _amount;

        emit UpdatePaper(_paperid, _allowFunding, _amount);
    }
}
