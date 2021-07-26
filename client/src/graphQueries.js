export const apiEndpoint =
  "https://api.thegraph.com/subgraphs/name/sairajk19/thepaperhousegraph";

export const getAllPapersQuery = {
  query: `{
  papers {
    id
    paperId
    owner
    author
    tokenUri
    allowFunding
    fundAmount
    totalAmountFunded
  }
}
`,
};
export const getPaper = (paperid) => {
  return {
    query: `{
  papers(where: {id: "0x${paperid}"}) {
    id
    owner
    author
    tokenUri
    allowFunding
    fundAmount
    totalAmountFunded
  }
}`,
  };
};

export const getFundings = (paperid) => {
  return {
    query: `{
      paperFundings(where: {paperid: "${paperid}"}) {
    id
    from
    to
    amount
    paperid
  }
}`,
  };
};

export const getFundingQuery = (address) => {
  return {
    query: `{
  fundings(where: {to: "${address}"}) {
    id
    from
    to
    amount
    paperid
  }
}`,
  };
};

export const getMyPapers = (address) => {
  return {
    query: `{
  papers(where: {owner: "${address}"}) {
    id
    owner
    author
    tokenUri
    allowFunding
    fundAmount
    totalAmountFunded
  }
}`,
  };
};
