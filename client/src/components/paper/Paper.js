import React, { useState, useEffect } from "react";
import "./paper.css";
import { AddressBtn } from "../addressBtn";
import pf from "../assets/pf.png";
import { Icon } from "@iconify/react";
import linkOut from "@iconify/icons-akar-icons/link-out";
import shareBox from "@iconify/icons-akar-icons/share-box";
import ViewSDKClient from "../ViewSDKClient";
export const Paper = () => {
  const [clipboard, setclipboard] = useState(false);
  const [Adobeloading, setAdobeloading] = useState(true);
  function copyClip() {
    navigator.clipboard.writeText(window.location.href);
    setclipboard(true);
    setTimeout(() => {
      setclipboard(false);
    }, 1500);
  }
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
  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  return (
    <>
      <ScrollToTopOnMount />
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
          <div className="paper_fund">
            <div className="paper_fund_info">
              <h3>
                1.3ETH <p> Funded</p>
              </h3>
              <h3>2ETH</h3>
            </div>
            <div className="paper_fund_bar">
              <div className="paper_fund_bar_bg"></div>
              <div className="paper_fund_bar_current"></div>
              <h3>50%</h3>
            </div>
            <button>FUND THIS RESEARCH PAPER</button>
          </div>
        </div>
      </div>
    </>
  );
};
