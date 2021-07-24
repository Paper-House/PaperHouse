import React, { useEffect, useState } from "react";
import Portis from "@portis/web3";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import {
  setContract,
  setWallet,
  setWeb3,
  setCorrectNetwork,
} from "../redux/reducers/papersreducer";
import PaperHouse from "../contracts/PaperHouse.json";

const portis = new Portis(
  "a7653496-491a-42cd-813c-471536ebf61e",
  "maticMumbai"
);

const getInstance = (web3, Networkid) => {
  try {
    const instance = new web3.eth.Contract(
      PaperHouse.abi,
      PaperHouse.networks[Networkid].address
    );
    return instance;
  } catch (err) {
    console.log(err);
  }
};
const getNetworkid = async (web3) => {
  return await web3.eth.net.getId();
};
export default function ConnectWallet({ wallet }) {
  const dispatch = useDispatch();
  const [networkChange, setnetworkChange] = useState("");
  const state = useSelector((state) => state.paper);
  const web3 = state.web3;
  useEffect(() => {
    if (wallet === 1 && window.web3 !== undefined) {
      dispatch(setWeb3(new Web3(window.ethereum)));
    } else if (wallet === 2) {
      dispatch(setWeb3(new Web3(portis.provider)));
    }
  }, [wallet]);
  useEffect(() => {
    if (web3 !== undefined) {
      if (wallet === 1) {
        dispatch(
          setWallet({
            connected: false,
            address: "",
            network: "",
            correctNetwork: false,
          })
        );
        window.ethereum
          .enable()
          .then(async (accounts) => {
            dispatch(
              setWallet({
                connected: true,
                address: accounts[0],
                network: await web3.eth.net.getId(),
                correctNetwork: false,
              })
            );
            getNetworkid(web3).then((id) => {
              if (id === 80001) {
                dispatch(setContract(getInstance(web3, id)));
                dispatch(setCorrectNetwork(true));
              } else {
                dispatch(setCorrectNetwork(false));
              }
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              setWallet({
                connected: false,
                address: "",
                network: "",
                correctNetwork: false,
              })
            );
          });
      } else if (wallet === 2) {
        dispatch(
          setWallet({
            connected: false,
            address: "",
            network: "",
            correctNetwork: false,
          })
        );

        web3.eth
          .getAccounts()
          .then(async (accounts) => {
            dispatch(
              setWallet({
                connected: true,
                address: accounts[0],
                network: await web3.eth.net.getId(),
                correctNetwork: false,
              })
            );
            getNetworkid(web3).then((id) => {
              if (id === 80001) {
                dispatch(setContract(getInstance(web3, id)));
                dispatch(setCorrectNetwork(true));
              } else {
                dispatch(setCorrectNetwork(false));
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [web3, networkChange]);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(
          setWallet({
            connected: true,
            address: accounts[0],
          })
        );
        console.log(accounts);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setnetworkChange(chainId);
      });
    }
  }, []);

  return "";
}
