// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PaperHouse is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _paperIds;
    Counters.Counter private _donations;

    constructor() ERC721("PaperHouse", "PH") {}

    event published(uint256 _paperid);
    event funding(address _from, address _to, uint256 value, uint256 _paperid);

    struct ResearchPaper {
        address owner;
        string author;
        uint256 tokenId;
        bool allowFunding;
        uint256 fundAmount;
        uint256 totalAmountFunded;
    }

    struct Donations {
        address from;
        address to;
        uint256 amount;
        uint256 paperId;
    }

    mapping(uint256 => ResearchPaper) public papers;
    mapping(uint256 => Donations) public donations;

    function publish(
        string memory tokenURI,
        string memory _author,
        bool _isfunding,
        uint256 _fundAmount
    ) public {
        _tokenIds.increment();
        _paperIds.increment();

        uint256 newtokenId = _tokenIds.current();
        uint256 newpaperId = _paperIds.current();

        _mint(msg.sender, newtokenId);
        _setTokenURI(newtokenId, tokenURI);

        ResearchPaper memory rpaper = ResearchPaper(
            msg.sender,
            _author,
            newtokenId,
            _isfunding,
            _fundAmount,
            0
        );

        papers[newpaperId] = rpaper;
        emit published(newtokenId);
    }

    function fundapaper(uint256 _paperid) public payable {
        if (_donations.current() <= 10) _donations.increment();

        ResearchPaper storage rpaper = papers[_paperid];

        require(rpaper.allowFunding == true, "Funding not allowed");

        require(
            msg.value <= (rpaper.fundAmount - rpaper.totalAmountFunded),
            "no more Funding allowed"
        );

        payable(address(rpaper.owner)).transfer(msg.value);

        uint256 amount = rpaper.totalAmountFunded;

        amount += msg.value;
        rpaper.totalAmountFunded = amount;

        uint256 lowest = _donations.current();


            uint256 lowest_amt
         = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

        for (uint256 i = 0; i <= 10 && _donations.current() > 10; i++) {
            // find the lowest amount.
            if (
                donations[i].amount < msg.value &&
                donations[i].amount < lowest_amt
            ) {
                lowest = i;
                lowest_amt = donations[i].amount;
            } // 200 600 700 400 500
        }

        if (lowest <= 10) {
            // Check if the donator already exist in top funders.
            for (uint256 i = 0; i < 10; i++) {
                // if yes then update the amount.
                if (donations[i].from == msg.sender) {
                    donations[i].to = rpaper.owner;
                    donations[i].amount = msg.value;
                    donations[i].paperId = _paperid;

                    emit funding(msg.sender, rpaper.owner, msg.value, _paperid);

                    return;
                }
            }

            // else just add as a new donator.
            donations[lowest].from = msg.sender;
            donations[lowest].to = rpaper.owner;
            donations[lowest].amount = msg.value;
            donations[lowest].paperId = _paperid;

            emit funding(msg.sender, rpaper.owner, msg.value, _paperid);
        }
    }

    function getPaper(uint256 paperId)
        public
        view
        returns (ResearchPaper memory, string memory)
    {
        string memory tokenUri;

        tokenUri = tokenURI(paperId);

        return (papers[paperId], tokenUri);
    }
}
