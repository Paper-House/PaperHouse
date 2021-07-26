export const apiEndpoint =
  "https://api.thegraph.com/subgraphs/name/sairajk19/thepaperhousegraph";

export const getAllPapersQuery = {
  query: `{
  papers {
    id
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
