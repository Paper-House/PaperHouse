// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PaperHouse is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _paperIds;

    constructor() ERC721("PaperHouse", "PH") {}

    struct ResearchPaper {
        address owner;
        string author;
        uint256 tokenId;
        bool isfunding;
    }

    mapping(uint256 => ResearchPaper) public papers;

    function publish(
        string memory tokenURI,
        string memory _author,
        bool _isfunding
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
            _isfunding
        );

        papers[newpaperId] = rpaper;
    }

    function getPapers(uint256 paperId)
        public
        view
        returns (ResearchPaper memory, string memory)
    {
        string memory tokenUri;

        tokenUri = tokenURI(paperId);

        return (papers[paperId], tokenUri);
    }
}
