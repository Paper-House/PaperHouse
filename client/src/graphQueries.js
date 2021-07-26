export const apiEndpoint =
  "https://api.thegraph.com/subgraphs/name/sairajk19/paperhouse";

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
