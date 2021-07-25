export const apiEndpoint = "https://api.thegraph.com/subgraphs/name/sairajk19/paperhouse"

export const getAllPapers = {
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

export const getFunding = {
  query: `{
  fundings(where: {to: ${address}}) {
    id
    from
    to
    amount
    paperid
  }
}
`,
};
