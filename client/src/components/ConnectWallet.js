import Portis from "@portis/web3";
import Web3 from "web3";

export const getPortis = () => {
  const prtis = new Portis("a7653496-491a-42cd-813c-471536ebf61e", "mainnet");
  const web3 = new Web3(prtis.provider);
  return web3;
};

export const getMetamask = () =>
  new Promise((resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable();
        // Accounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    } else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  });
