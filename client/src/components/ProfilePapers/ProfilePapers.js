import React, { useState, useEffect } from "react";
import PaperCard from "../explore/PaperCard";
import { toast } from "react-toastify";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { toGatewayURL } from "nft.storage";
import { apiEndpoint, GETMYPAPES } from "../../graphQueries";
import { PaperCardLoading } from "../paperCardLoading/index";
import {
  setProfilePaper,
  setProfilePaperLoading,
} from "../../redux/reducers/papersreducer";
import axios from "axios";
import "./ProfilePapers.css";
import { useHistory } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";

const ProfilePapers = () => {
  const dispatch = useDispatch();
  const [urlAddress, setUrlAddress] = useState(null);
  const history = useHistory();

  const profilePaper = useSelector((state) => state.paper.profilePaper.data);
  const profilePaperLoading = useSelector(
    (state) => state.paper.profilePaper.loading
  );
  const { connected, address } = useSelector((state) => state.paper.wallet);

  useEffect(() => {
    setUrlAddress(window.location.search.slice(9));
  }, []);

  useEffect(() => {
    if (urlAddress && profilePaper.length === 0) {
      dispatch(setProfilePaperLoading(true));
      axios
        .post(apiEndpoint, {
          query: GETMYPAPES(urlAddress).query,
        })
        .then(({ data }) => {
          data = data.data.papers;
          console.log(data);
          let payloadData = {};
          data.map((paper) => {
            let nftUrl = toGatewayURL(paper.tokenUri).href;
            axios
              .get(nftUrl)
              .then(({ data }) => {
                let thumbnail =
                  "https://ipfs.io" + "/ipfs" + data.image.slice(6);
                payloadData = {
                  paperid: paper.id.slice(2),
                  title: data.name,
                  author: data.author,
                  publisher: paper.owner,
                  date: data.publishDate,
                  thumbnail: thumbnail,
                  category: data.category,
                };
                dispatch(setProfilePaper(payloadData));
              })
              .catch((err) => {
                console.log(err);
                history.push("/not-found");
              });
          });
          dispatch(setProfilePaperLoading(false));
        })
        .catch((err) => {
          console.log(err);
          history.push("/not-found");
        });
    } else {
      console.log("no url address");
    }
  }, [urlAddress]);

  return (
    <div className="ProfilePapersContainer container">
      <div className="ProfilePapers__nav--section">
        <h2 id="heading">Papers</h2>
        <div className="ProfilePapers__person--proflie">
          {urlAddress ? (
            <>
              <p>{urlAddress}</p> <img src={makeBlockie(urlAddress)} alt="pf" />
            </>
          ) : null}
        </div>
      </div>
      <div className="ProfilePapers__nav--section-mob">
        <h2 id="heading">Papers</h2>
        <div className="ProfilePapers__person--proflie">
          {urlAddress ? (
            <>
              <p>{urlAddress}</p> <img src={makeBlockie(urlAddress)} alt="pf" />
            </>
          ) : null}
        </div>
      </div>

      <div className="mypapers">
        {!profilePaperLoading ? (
          <div className="mypapers_papers">
            <PaperCardRenderer data={profilePaper} />
          </div>
        ) : (
          <div className="mypapers_papers">
            {[1, 2, 3, 4, 5].map((item) => (
              <PaperCardLoading page={"/explore"} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PaperCardRenderer = ({ data }) => {
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
    let fund = fundToggle ? updateAmount : "0";
    if (connected && correctNetwork) {
      setUpdating(true);
      contract.methods
        .updatepaper(paperid, fundToggle, Web3.utils.toWei(fund, "ether"))
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
    }
  }

  return data.map((paper) => {
    return (
      <PaperCard
        data={paper}
        page={"/profile"}
        currentAmount={`${paper.fundAmount} MATIC`}
        callupdate={(updateAmount, fundToggle) =>
          UpdatePaper(paper.paperid, updateAmount, fundToggle)
        }
        updating={updating}
        allowFunding={paper.allowFunding}
        paperLink={`/paper/${paper.paperid}`}
      />
    );
  });
};

export default ProfilePapers;
