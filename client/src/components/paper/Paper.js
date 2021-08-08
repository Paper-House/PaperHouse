import React, { useState, useEffect } from "react";
import "./paper.css";
import { useSelector } from "react-redux";
import { AddressBtn } from "../addressBtn";
import { Icon } from "@iconify/react";
import linkOut from "@iconify/icons-akar-icons/link-out";
import shareBox from "@iconify/icons-akar-icons/share-box";
import ViewSDKClient from "../ViewSDKClient";
import Web3 from "web3";
import { toastStyles } from "../publish/Publish";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiEndpoint, getPaper, getFundings } from "../../graphQueries";
import { getURL } from "../../utils/getURL";
import web3 from "web3";
import Skeleton from "react-loading-skeleton";
import { getMATIC } from "../../utils/getmarketprice";
import { useHistory } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
export const Paper = (props) => {
  const { paperid } = props.match.params;
  const [PaperData, setPaperData] = useState({
    paper: {
      title: "",
      description: "",
      author: "",
      publisher: "",
      thumbnail: "",
      pdf: "",
      allowFunding: false,
      fundAmount: "",
      totalAmountFunded: "",
      metadata: "",
    },
    fundings: [],
  });

  const [clipboard, setclipboard] = useState(false);
  const [Adobeloading, setAdobeloading] = useState(true);
  const [UiLoading, setUiLoading] = useState(true);
  const [ShowPopup, setShowPopup] = useState(false);
  const [fundAmount, setfundAmount] = useState("");
  const [loading, setloading] = useState(false);
  const [ShowFundButton, setShowFundButton] = useState(false);
  const [maticconversion, setmaticconversion] = useState(0);
  const [Maticprice, setMaticprice] = useState(0);
  const [Error, setError] = useState(false);

  const history = useHistory();

  getMATIC().then((price) => {
    setMaticprice(price);
  });

  const { connected, address, correctNetwork, balance } = useSelector(
    (state) => state.paper.wallet
  );
  const contract = useSelector((state) => state.paper.contract);

  useEffect(() => {
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.keyCode === 27) {
          setShowPopup(false);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (paperid) {
      axios
        .post(apiEndpoint, { query: getPaper(paperid).query })
        .then(({ data }) => {
          const paper = data.data.papers[0];
          if (paper != undefined) {
            let finalData = {};
            axios.get(getURL(paper.tokenUri)).then((response) => {
              finalData = {
                title: response.data.name,
                description: response.data.description,
                author: response.data.author,
                publisher: paper.owner,
                thumbnail: getURL(response.data.image),
                pdf: getURL(response.data.pdf),
                allowFunding: JSON.parse(paper.allowFunding),
                fundAmount: web3.utils.fromWei(paper.fundAmount, "ether"),
                totalAmountFunded: web3.utils.fromWei(
                  paper.totalAmountFunded,
                  "ether"
                ),
                metadata: getURL(paper.tokenUri),
              };
              setPaperData({
                paper: finalData,
                fundings: [],
              });
              if (!JSON.parse(paper.allowFunding)) {
                setUiLoading(false);
              }
            });
            if (JSON.parse(paper.allowFunding)) {
              axios
                .post(apiEndpoint, { query: getFundings(paperid).query })
                .then(({ data }) => {
                  setPaperData({
                    paper: finalData,
                    fundings: data.data.paperFundings,
                  });
                  setUiLoading(false);
                })
                .catch((err) => console.log(err));
            }
          } else {
            history.push("/not-found");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function copyClip() {
    navigator.clipboard.writeText(window.location.href);
    setclipboard(true);
    setTimeout(() => {
      setclipboard(false);
    }, 1500);
  }
  function FundPaper(paper_id, fundAmount) {
    if (connected && correctNetwork && paper_id && fundAmount) {
      if (
        fundAmount <= PaperData.paper.fundAmount &&
        fundAmount <=
          Number(PaperData.paper.fundAmount) -
            Number(PaperData.paper.totalAmountFunded)
      ) {
        setloading(true);
        contract.methods
          .fundapaper(paper_id)
          .send({
            from: address,
            value: Web3.utils.toWei(String(fundAmount), "ether"),
          })
          .then((receipt) => {
            setloading(false);
            toast("Research Paper Funded", toastStyles.default);
            setmaticconversion(0);
            setfundAmount(0);
            setShowPopup(false);
            setTimeout(() => window.location.reload(), 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Transaction Failed", toastStyles.error);
            setmaticconversion(0);
            setfundAmount(0);
            setloading(false);
            setShowPopup(false);
          });
      } else {
        setError(true);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var scrollY = window.scrollY;
      console.log(scrollY)
      if (scrollY >35) {
        setShowFundButton(true);
      } else {
        setShowFundButton(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!UiLoading) {
      const viewSDKClient = new ViewSDKClient();
      viewSDKClient.ready().then(() => {
        viewSDKClient.previewFile(
          "adobe-dc-view",
          {
            dockPageControls: false,
            showLeftHandPanel: false,
            enableFormFilling: false,
            showAnnotationTools: false,
            defaultViewMode: "FIT_WIDTH",
          },
          PaperData.paper.pdf,
          PaperData.paper.title,
          () => setTimeout(() => setAdobeloading(false), 2000)
        );
      });
    }
  }, [UiLoading]);

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
                    ? `${Number(web3.utils.fromWei(balance, "ether")).toFixed(
                        4
                      )} Matic`
                    : "0 Matic"}
                </h3>
              </div>
              <div className="paper_funding_popup_box_input_box">
                <input
                  type="number"
                  placeholder="0 MATIC"
                  onChange={(e) => {
                    setError(false);
                    setmaticconversion(e.target.value * Maticprice);
                    setfundAmount(e.target.value);
                  }}
                />
                <div className="popup_input_row">
                  <h3>~$ {maticconversion.toFixed(3)}</h3>{" "}
                  <h3>
                    Max{" "}
                    <span>
                      {(
                        PaperData.paper.fundAmount -
                        PaperData.paper.totalAmountFunded
                      ).toFixed(3)}
                    </span>{" "}
                    Matic
                  </h3>
                </div>
              </div>
              <p style={!Error ? { display: "none" } : null}>
                Enter Amount Less Than Max Amount Allowed
              </p>
            </div>
            <div className="paper_funding_popup_box_buttons">
              <button
                className="paper_popup_fund"
                disabled={connected == false || loading == true}
                onClick={() => FundPaper(Number(paperid), fundAmount)}
              >
                {connected ? (
                  loading ? (
                    <div className="Wallet_loader">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
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
              <button
                onClick={() => {
                  setShowPopup(!ShowPopup);
                  setmaticconversion(0);
                  setfundAmount(0);
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="paper_container container">
        <div className="paper_pdf">
          {Adobeloading ? (
            <div className="pdf_loading">
              <div className="Wallet_loader">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
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
          <div
            className="paper_details"
            style={
              !PaperData.paper.allowFunding
                ? { height: "100%", marginBottom: "0" }
                : null
            }
          >
            <div className="paper_title">
              <h3>
                {UiLoading ? (
                  <Skeleton width={"100%"} height={"50px"} count={1} />
                ) : (
                  PaperData.paper.title
                )}
              </h3>
            </div>

            <div className="paper_publisher">
              {UiLoading ? (
                <Skeleton
                  width={"150px"}
                  height={"30px"}
                  count={1}
                  style={{ borderRadius: "100px" }}
                />
              ) : (
                <>
                  <h3>Published By</h3>
                  <AddressBtn address={PaperData.paper.publisher} />
                </>
              )}
            </div>

            <p className="paper_description">
              {UiLoading ? (
                <Skeleton width={"100%"} height={"200px"} count={1} />
              ) : (
                PaperData.paper.description
              )}
            </p>
            <div className="paper_authors_section">
              <h3>
                {UiLoading ? <Skeleton width={"150px"} count={1} /> : "Authors"}
              </h3>

              {UiLoading ? (
                <Skeleton width={"100%"} height={"50px"} count={1} />
              ) : (
                <p>{PaperData.paper.author}</p>
              )}
            </div>
            <div className="paper_view">
              {UiLoading ? (
                [1, 2, 3].map((data, index) => {
                  return (
                    <Skeleton
                      width={"150px"}
                      height={"35px"}
                      style={{
                        marginRight: "10px",
                        marginBottom: "10px",
                        borderRadius: "100px",
                      }}
                      count={1}
                      key={index}
                    />
                  );
                })
              ) : (
                <>
                  <a
                    href={`https://mumbai.polygonscan.com/token/0xea1ac3a3c4b29f55d1271658e8c864b40a6c68e3?a=${paperid}`}
                    target="_blank"
                  >
                    <button className="paper_view_polyscan">
                      View on Polygonscan <Icon icon={linkOut} />
                    </button>
                  </a>
                  <a href={PaperData.paper.metadata} target="_blank">
                    <button className="paper_view_ipfs_meta">
                      View IPFS Metadata <Icon icon={linkOut} />
                    </button>
                  </a>{" "}
                  <a href={PaperData.paper.pdf} target="_blank">
                    <button className="paper_view_ipfs">
                      View on IPFS <Icon icon={linkOut} />
                    </button>
                  </a>
                </>
              )}
            </div>
            {PaperData.paper.allowFunding ? (
              <div className="paper_funders">
                <div className="paper_funders_title">
                  <h3>
                    {" "}
                    {UiLoading ? (
                      <Skeleton width={"150px"} count={1} />
                    ) : (
                      "Funders"
                    )}
                  </h3>
                </div>
                <div className="paper_funders_list">
                  {UiLoading
                    ? [1, 2, 3].map((data, index) => {
                        return (
                          <Skeleton
                            width={"100%"}
                            height={"50px"}
                            style={{
                              marginBottom: "5px",
                              borderRadius: "12px",
                            }}
                            count={1}
                            key={index}
                          />
                        );
                      })
                    : null}
                  {UiLoading ? null : PaperData.fundings.length != 0 ? (
                    PaperData.fundings.map((fund, index) => {
                      return (
                        <div className="paper_funder" key={index}>
                          <img src={makeBlockie(fund.from)} alt="" />
                          <div className="paper_funder-address">
                            {fund.from}
                            <h2>
                              Funded{" "}
                              {Number(
                                web3.utils.fromWei(fund.amount, "ether")
                              ).toFixed(4)}
                              Matic
                            </h2>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="paper_nofunding">
                      <h3>No Funders</h3>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div className="fade"></div>
          </div>
          {PaperData.paper.allowFunding ? (
            <div
              className={
                ShowFundButton ? "paper_fund" : "paper_fund paper_fund_none"
              }
            >
              <div className="paper_fund_info">
                <div>
                  <h3>
                    {UiLoading
                      ? "0"
                      : Number(PaperData.paper.totalAmountFunded).toFixed(
                          3
                        )}{" "}
                    MATIC
                    <p> Funded</p>
                  </h3>
                  <h5>
                    $
                    {UiLoading
                      ? "0"
                      : (
                          PaperData.paper.totalAmountFunded * Maticprice
                        ).toFixed(3)}
                  </h5>
                </div>
                <div>
                  <h3>
                    {UiLoading
                      ? "0"
                      : Number(PaperData.paper.fundAmount).toFixed(3)}{" "}
                    MATIC
                  </h3>
                  <h5>
                    $
                    {UiLoading
                      ? "0"
                      : (PaperData.paper.fundAmount * Maticprice).toFixed(3)}
                  </h5>
                </div>
              </div>
              <div className="paper_fund_bar">
                <div className="paper_fund_bar_bg"></div>
                <div
                  className="paper_fund_bar_current"
                  style={
                    PaperData.paper.fundAmount != "0"
                      ? {
                          width: `${
                            (Number(PaperData.paper.totalAmountFunded) /
                              Number(PaperData.paper.fundAmount)) *
                            100
                          }%`,
                        }
                      : { width: "0px" }
                  }
                ></div>
                <h3>
                  {PaperData.paper.fundAmount != "0"
                    ? (
                        (Number(PaperData.paper.totalAmountFunded) /
                          Number(PaperData.paper.fundAmount)) *
                        100
                      ).toFixed(2)
                    : "0"}
                  %
                </h3>
              </div>
              <button
                disabled={
                  (PaperData.paper.fundAmount == "0") == true ||
                  PaperData.paper.fundAmount ==
                    PaperData.paper.totalAmountFunded
                }
                onClick={() => setShowPopup(!ShowPopup)}
              >
                FUND THIS RESEARCH PAPER
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
