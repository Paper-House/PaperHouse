import React, { useState, useEffect } from "react";
import "./mypapers.css";
import { Link } from "react-router-dom";
import PaperCard from "../explore/PaperCard";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiEndpoint, getMyPapers } from "../../graphQueries";
import Web3 from "web3";

export const Mypapers = ({ path }) => {
  const [category, setcategory] = useState("all");
  // const address = "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6";
  const { connected, address, correctNetwork } = useSelector(
    (state) => state.paper.wallet
  );
  const contract = useSelector((state) => state.paper.contract);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    console.log({query: getMyPapers(address).query})
    axios
      .post(apiEndpoint, {query: getMyPapers(address).query})
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [address]);

  const data = [
    {
      paperid: 5,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: address,
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "science",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xd4D2761e241b07a367E47a1f3c76d40d12283DF5",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "whitepapers",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xd4D2761e241b07a367E47a1f3c76d40d12283DF5",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "space",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xd4D2761e241b07a367E47a1f3c76d40d12283DF5",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "science",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xd4D2761e241b07a367E47a1f3c76d40d12283DF5",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "ml/ai",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xd4D2761e241b07a367E47a1f3c76d40d12283DF5",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "medical",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xC2f3dcB8A963b12D7853021a8ca4582872A28546",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "space",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0xC2f3dcB8A963b12D7853021a8ca4582872A28546",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "economics",
    },
  ];

  const toastStyles = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  function UpdatePaper(paperid, updateAmount, fundToggle) {
    //smart contract call
    // Web3.utils.toWei(fund, "ether");
    if (connected && correctNetwork) {
      setUpdating(true);
      contract.methods
        .updatepaper(
          paperid,
          fundToggle,
          Web3.utils.toWei(updateAmount, "ether")
        )
        .send({ from: address })
        .then(() => {
          toast("🦄️ Research Paper Updated!", toastStyles);
          setUpdating(false);
        })
        .catch((error) => {
          toast("Error while updating paper, try again...", toastStyles);
          setUpdating(false);
          console.log(error);
        });

      console.log(paperid, fundToggle);
    }
  }

  return (
    <>
      <ToastContainer
        className="toast-margin"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mypapers">
        <div className="mypapers_papers">
          {data.map((paper) => {
            if (paper.publisher === address)
              return (
                <PaperCard
                  data={paper}
                  page={path === "/profile" ? "" : "mypapers"}
                  currentAmount="2.5ETH"
                  callupdate={(updateAmount, fundToggle) =>
                    UpdatePaper(paper.paperid, updateAmount, fundToggle)
                  }
                  updating={updating}
                  allowFunding={false}
                />
              );
          })}
        </div>
      </div>
    </>
  );
};
