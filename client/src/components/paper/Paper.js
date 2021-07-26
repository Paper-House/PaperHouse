import React, { useState, useEffect, useRef } from "react";
import "./paper.css";
import { useSelector } from "react-redux";
import { AddressBtn } from "../addressBtn";
import pf from "../assets/pf.png";
import { Icon } from "@iconify/react";
import linkOut from "@iconify/icons-akar-icons/link-out";
import shareBox from "@iconify/icons-akar-icons/share-box";
import ViewSDKClient from "../ViewSDKClient";
import Web3 from "web3";
import { toastStyles } from "../publish/Publish";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setWallet } from "../../redux/reducers/papersreducer";
export const Paper = () => {
  const [clipboard, setclipboard] = useState(false);
  const [Adobeloading, setAdobeloading] = useState(true);
  const [ShowPopup, setShowPopup] = useState(false);
  const [fundAmount, setfundAmount] = useState("");
  const [loading, setloading] = useState(false);
  const [ShowFundButton, setShowFundButton] = useState(false);
  const [maticconversion, setmaticconversion] = useState(0);
  const { connected, address, correctNetwork, balance, network } = useSelector(
    (state) => state.paper.wallet
  );
  const contract = useSelector((state) => state.paper.contract);
  const web3 = useSelector((state) => state.paper.web3);

  const dispatch = useDispatch();

  function copyClip() {
    navigator.clipboard.writeText(window.location.href);
    setclipboard(true);
    setTimeout(() => {
      setclipboard(false);
    }, 1500);
  }
  function FundPaper(paper_id, fundAmount) {
    console.log(fundAmount);
    console.log(typeof fundAmount);
    if (connected && correctNetwork && paper_id && fundAmount) {
      setloading(true);
      contract.methods
        .fundapaper(paper_id)
        .send({
          from: address,
          value: Web3.utils.toWei(fundAmount, "ether"),
        })
        .then(async (receipt) => {
          console.log(receipt);
          setloading(false);
          toast("Research Paper Funded", toastStyles.default);
          dispatch(
            setWallet({
              connected: connected,
              address: address,
              network: network,
              correctNetwork: correctNetwork,
              balance: await web3.eth.getBalance(address),
            })
          );
          setShowPopup(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Transaction Faild", toastStyles.error);

          setloading(false);
          setShowPopup(false);
        });
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      var scrollY = window.scrollY;
      if (scrollY > 5) {
        setShowFundButton(true);
      } else {
        setShowFundButton(false);
      }
    });
  }, []);
  useEffect(() => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(
        "adobe-dc-view",
        {
          dockPageControls: false,
          showLeftHandPanel: false,
          enableFormFilling: false,
          showAnnotationTools: false,
        },
        "https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf",
        "IPFS - Content Addressed, Versioned, P2P File System",
        () => setTimeout(() => setAdobeloading(false), 2000)
      );
    });
  }, []);
  useEffect(() => {
    if (ShowPopup) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "visible";
    }
  }, [ShowPopup]);
  
  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  return (
    <>
      <ScrollToTopOnMount />
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
      {ShowPopup ? (
        <div className="paper_funding_popup_container ">
          <div className="paper_funding_popup_box">
            <div className="paper_funding_popup_box_heading">
              <h3>Enter Amount</h3>
            </div>
            <div className="paper_funding_popup_box_input">
              <div className="paper_funding_popup_box_input_balanceinfo">
                <h3>Fund Matic</h3>
                <h3>
                  Balance{" "}
                  {balance
                    ? `${web3.utils.fromWei(balance, "ether")} Matic`
                    : "0 Matic"}
                </h3>
              </div>
              <div className="paper_funding_popup_box_input_box">
                <input
                  type="number"
                  placeholder="0 MATIC"
                  onChange={(e) => {
                    setmaticconversion(e.target.value * 1.05);
                    setfundAmount(e.target.value);
                  }}
                />
                <div className="popup_input_row">
                  <h3>~$ {maticconversion}</h3> <h3>Max 50.2 Matic</h3>
                </div>
              </div>
            </div>
            <div className="paper_funding_popup_box_buttons">
              <button
                className="paper_popup_fund"
                disabled={connected == false || loading == true}
                onClick={() => FundPaper(1, fundAmount)}
              >
                {connected ? (
                  loading ? (
                    <div className="Wallet_loader">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="css-1p66nw2"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    "Fund"
                  )
                ) : (
                  "Connect Wallet"
                )}
              </button>
              <button onClick={() => setShowPopup(!ShowPopup)}>Decline</button>
            </div>
          </div>
        </div>
      ) : null}

      <div class="paper_container container">
        <div className="paper_pdf">
          {Adobeloading ? (
            <div className="pdf_loading">
              <div className="Wallet_loader">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="css-1p66nw2"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          ) : null}
          <div id="adobe-dc-view"></div>
          {!Adobeloading ? (
            <div className="paper_share" onClick={copyClip}>
              {clipboard ? (
                <h3>Copied!</h3>
              ) : (
                <>
                  <Icon icon={shareBox} />
                  <h3>Share</h3>
                </>
              )}
            </div>
          ) : null}
        </div>
        <div className="paper_info">
          <div className="paper_details">
            <div className="paper_title">
              <h3>
                Computing interaction effects and standard errors in logit and
                probit models
              </h3>
            </div>

            <div className="paper_publisher">
              <h3>Published By</h3>

              <AddressBtn
                address={"0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6"}
              />
            </div>

            <p className="paper_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse amet tellus elit eros, consectetur. Egestas
              pellentesque hendrerit viverra condimentum nulla adipiscing
              vulputate scelerisque. Urna ac nibh a eget. Nisl pharetra ornare
              sed tellus metus. Sodales condimentum ac rhoncus viverra eu sed
              et. Consequat cras posuere cursus risus turpis sapien at cras
              condimentum. Augue facilisis vulputate nulla lacus, tellus eget
              ut. Quam nisi lectus nulla eget elit commodo sapien gravida mi.
              Vitae diam porttitor risus enim, ut volutpat parturient et
            </p>
            <div className="paper_authors_section">
              <h3>Authors</h3>
              <p>Edward C. Norton</p>
            </div>
            <div className="paper_view">
              <a href="#">
                <button className="paper_view_polyscan">
                  View on polygonscan <Icon icon={linkOut} />
                </button>
              </a>
              <a href="#">
                <button className="paper_view_ipfs_meta">
                  View IPFS Metadata <Icon icon={linkOut} />
                </button>
              </a>{" "}
              <a href="#">
                <button className="paper_view_ipfs">
                  View on IPFS <Icon icon={linkOut} />
                </button>
              </a>
            </div>
            <div className="paper_funders">
              <div className="paper_funders_title">
                <h3>Funders</h3>
              </div>
              <div className="paper_funders_list">
                <div className="paper_funder">
                  <img src={pf} alt="" srcset="" />
                  <div className="paper_funder-address">
                    0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                    <h2>Funded 0.2ETH</h2>
                  </div>
                </div>
                <div className="paper_funder">
                  <img src={pf} alt="" srcset="" />
                  <div className="paper_funder-address">
                    0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                    <h2>Funded 0.2ETH</h2>
                  </div>
                </div>
                <div className="paper_funder">
                  <img src={pf} alt="" srcset="" />
                  <div className="paper_funder-address">
                    0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                    <h2>Funded 0.2ETH</h2>
                  </div>
                </div>
                <div className="paper_funder">
                  <img src={pf} alt="" srcset="" />
                  <div className="paper_funder-address">
                    0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                    <h2>Funded 0.2ETH</h2>
                  </div>
                </div>
                <div className="paper_funder">
                  <img src={pf} alt="" srcset="" />
                  <div className="paper_funder-address">
                    0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                    <h2>Funded 0.2ETH</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade"></div>
          </div>
          <div
            className={
              ShowFundButton ? "paper_fund" : "paper_fund paper_fund_none"
            }
          >
            <div className="paper_fund_info">
              <div>
                {" "}
                <h3>
                  1.3 MATIC <p> Funded</p>
                </h3>
                <h5>$25.5</h5>
              </div>
              <div>
                <h3>2 MATIC</h3>
                <h5>$50.5</h5>
              </div>
            </div>
            <div className="paper_fund_bar">
              <div className="paper_fund_bar_bg"></div>
              <div className="paper_fund_bar_current"></div>
              <h3>50%</h3>
            </div>
            <button onClick={() => setShowPopup(!ShowPopup)}>
              FUND THIS RESEARCH PAPER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
