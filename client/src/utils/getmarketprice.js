import axios from "axios";
export const getMATIC = async () => {
  const { data } = await axios.post(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      query:
        '{tokenDayDatas(first: 3, orderBy: date, orderDirection: desc, where: { token: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"}) { id date token { id symbol } priceUSD } }',
      variables: null,
    }
  );
  return Number(data.data.tokenDayDatas[0].priceUSD).toFixed(2);
};
