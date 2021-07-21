import React, { useEffect } from "react";
import Portis from "@portis/web3";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import {
  setContract,
  setWallet,
  setWeb3,
} from "../redux/reducers/papersreducer";
import PaperHouse from "../contracts/PaperHouse.json";

const portis = new Portis("a7653496-491a-42cd-813c-471536ebf61e", "mainnet");

const getInstance = (web3) => {
  return new web3.eth.Contract(
    PaperHouse.abi,
    PaperHouse.networks["5777"].address
  );
};

export default function ConnectWallet({ wallet }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.paper);
  const web3 = state.web3;
  useEffect(() => {
    const providerURL = "https://rpc-mumbai.matic.today/";

    if (wallet === 1 && window.web3 !== undefined) {
      dispatch(setWeb3(new Web3(window.ethereum)));
    } else if (wallet === 2) {
      dispatch(setWeb3(new Web3(portis.provider)));
    } else {
      const provider = new Web3.providers.HttpProvider(providerURL);
      dispatch(setWeb3(new Web3(provider)));
    }
  }, [wallet]);
  useEffect(() => {
    if (web3 !== undefined) {
      if (wallet === 1) {
        window.web3.currentProvider
          .enable()
          .then((accounts) => {
            dispatch(
              setWallet({ connected: true, address: accounts[0], network: "" })
            );
            dispatch(
              setContract(
                new web3.eth.Contract(
                  PaperHouse.abi,
                  PaperHouse.networks["5777"].address
                )
              )
            );
          })
          .catch((err) => {
            console.log(err);
            dispatch(setWallet({ connected: false, address: "", network: "" }));
          });
      } else if (wallet === 2) {
        web3.eth
          .getAccounts()
          .then((accounts) => {
            dispatch(
              setWallet({ connected: true, address: accounts[0], network: "" })
            );
            dispatch(
              setContract(
                new web3.eth.Contract(
                  PaperHouse.abi,
                  PaperHouse.networks["5777"].address
                )
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [web3]);
  return "";
}

export const getContract = (web3) => {
  const networkId = web3.eth.net.getId();
  const deployedNetwork = PaperHouse.networks[networkId];
  console.log(deployedNetwork);
  return new web3.eth.Contract(
    PaperHouse.abi,
    deployedNetwork && deployedNetwork.address
  );
};
