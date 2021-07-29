import { toGatewayURL } from "nft.storage";

export const getURL = (url) => {
  const tokenURI = toGatewayURL(url, {Option: { gateway: "https://ipfs.io" }});
  return tokenURI.href;
};
