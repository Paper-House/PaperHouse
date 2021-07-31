import { useEffect, useState } from "react";
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
  "175d7ef0-8644-4b07-9ce9-d40ce13ed8cb",
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
export default function ConnectWallet({
  wallet,
  setWallconnect,
  setConnecting,
}) {
  const dispatch = useDispatch();
  const [networkChange, setnetworkChange] = useState("");
  const state = useSelector((state) => state.paper);
  const web3 = state.web3;
  useEffect(() => {
    if (window.ethereum !== undefined) {
      dispatch(setWeb3(new Web3(window.ethereum)));
      setWallconnect(1);
    }
  }, []);
  useEffect(() => {
    if (wallet === 1 && window.web3 !== undefined) {
      dispatch(setWeb3(new Web3(window.ethereum)));
    } else if (wallet === 2) {
      dispatch(setWeb3(new Web3(portis.provider)));
    }
  }, [wallet]);
  useEffect(() => {
    if (window.web3 !== undefined) {
      if (wallet === 1) {
        dispatch(
          setWallet({
            connected: false,
            address: "",
            network: "",
            correctNetwork: true,
            balance: "",
          })
        );
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            dispatch(
              setWallet({
                connected: true,
                address: accounts[0],
                network: await web3.eth.net.getId(),
                correctNetwork: true,
                balance: await web3.eth.getBalance(accounts[0]),
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
            setWallconnect(0);
            setConnecting(false);
            dispatch(
              setWallet({
                connected: false,
                address: "",
                network: "",
                correctNetwork: true,
                balance: "",
              })
            );
          });
      } else if (wallet === 2) {
        dispatch(
          setWallet({
            connected: false,
            address: "",
            network: "",
            correctNetwork: true,
            balance: "",
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
                correctNetwork: true,
                balance: await web3.eth.getBalance(accounts[0]),
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
            setWallconnect(0);
            setConnecting(false);
            dispatch(
              setWallet({
                connected: false,
                address: "",
                network: "",
                correctNetwork: true,
                balance: "",
              })
            );
          });
      }
    }
  }, [web3, networkChange]);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setnetworkChange(chainId);
      });

      window.ethereum.on("disconnect", () => {
        dispatch(
          setWallet({
            connected: false,
            address: "",
            network: "",
            correctNetwork: true,
            balance: "",
          })
        );
      });
    }
  }, []);

  return "";
}
