import React, { useState, useEffect } from "react";
import "./mypapers.css";
import { Link } from "react-router-dom";
import PaperCard from "../explore/PaperCard";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiEndpoint, GETMYPAPES, myActivities } from "../../graphQueries";
import Web3 from "web3";
import { NFTStorage, File, toGatewayURL } from "nft.storage";
import Skeleton from "react-loading-skeleton";
import { PaperCardLoading } from "../paperCardLoading/index";

export const Mypapers = ({ path }) => {
  const [category, setcategory] = useState("all");
  const [pageData, setPageData] = useState([]);
  const [urlAddress, setUrlAddress] = useState(null);
  const [profileDataPapers, setProfileDataPapers] = useState([]);

  const paperData = useSelector((state) => state.paper.myPapers).data;
  const { connected, address, correctNetwork } = useSelector(
    (state) => state.paper.wallet
  );
  const myPapersLoading = useSelector((state) => state.paper.myPapers.loading);
  // const myPapersLoading = true;

  if (paperData.length != 0) {
    console.log(paperData);
  }

  console.log(`My Papers Loading ${myPapersLoading}`);

  useEffect(() => {
    setUrlAddress(window.location.search.slice(9));
  }, []);

  useEffect(() => {
    if (urlAddress) {
      let payloadData = [];
      axios
        .post(apiEndpoint, {
          query: GETMYPAPES(urlAddress).query,
        })
        .then(({ data }) => {
          data = data.data.papers;
          data.map((paper) => {
            let nftUrl = toGatewayURL(paper.tokenUri).href;
            axios
              .get(nftUrl)
              .then(({ data }) => {
                console.log(data);
                let thumbnail =
                  "https://ipfs.io" + "/ipfs" + data.image.slice(6);
                payloadData.push({
                  paperid: paper.id.slice(2),
                  title: data.name,
                  author: data.author,
                  publisher: paper.owner,
                  date: data.publishDate,
                  thumbnail: thumbnail,
                  category: data.category,
                });
                // dispatch(setMyPapers(payloadData));
                setProfileDataPapers(payloadData);
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("no url address");
    }
  }, [urlAddress]);

  console.log(profileDataPapers);
  console.log(paperData);

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
          {!myPapersLoading ? (
            paperData.length !== 0 ? (
              <PaperCardRenderer data={paperData} path={path} />
            ) : profileDataPapers.length !== 0 ? (
              <PaperCardRenderer data={profileDataPapers} path={path} />
            ) : !address ? (
              "Connect Your Wallet"
            ) : (
              ""
            )
          ) : (
            [1, 2, 3, 4, 5].map((item) => <PaperCardLoading />)
          )}
        </div>
      </div>
    </>
  );
};

const PaperCardRenderer = ({ data, path }) => {
  console.log(data);
  // const address = "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6";
  const { connected, address, correctNetwork } = useSelector(
    (state) => state.paper.wallet
  );
  const contract = useSelector((state) => state.paper.contract);
  const [updating, setUpdating] = useState(false);

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

  return data.map((paper) => {
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
  });
};
