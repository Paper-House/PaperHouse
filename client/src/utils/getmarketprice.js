import axios from "axios";
export const getMATIC = async () => {
  const { data } = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      qs: {
        start: "1",
        limit: "50",
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": "ebf620b1-655e-4bd1-9e5f-b7a328c5a857",
      },
      json: true,
      gzip: true,
    }
  );
  const { quote } = data.data.find((crypto) => crypto.symbol === "MATIC");
  const { USD } = quote;
  return USD.price.toFixed(2);
};
