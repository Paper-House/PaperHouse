import React from "react";
import "./paper.css";
import { AddressBtn } from "../addressBtn";
import pf from "../assets/pf.png";
import { Icon, InlineIcon } from "@iconify/react";
import linkOut from "@iconify/icons-akar-icons/link-out";
import shareBox from "@iconify/icons-akar-icons/share-box";
export const Paper = () => {
  return (
    <div class="paper_container container">
      <div className="paper_pdf">
        <embed
          src="https://bitcoin.org/bitcoin.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          className="embeded_pdf"
        />
        <a href="">
          {" "}
          <div className="paper_share">
            <Icon icon={shareBox} />

            <h3>Share</h3>
          </div>
        </a>
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
            <a>
              <AddressBtn />
            </a>
          </div>

          <p className="paper_description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            amet tellus elit eros, consectetur. Egestas pellentesque hendrerit
            viverra condimentum nulla adipiscing vulputate scelerisque. Urna ac
            nibh a eget. Nisl pharetra ornare sed tellus metus. Sodales
            condimentum ac rhoncus viverra eu sed et. Consequat cras posuere
            cursus risus turpis sapien at cras condimentum. Augue facilisis
            vulputate nulla lacus, tellus eget ut. Quam nisi lectus nulla eget
            elit commodo sapien gravida mi. Vitae diam porttitor risus enim, ut
            volutpat parturient et
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
                <div>
                  <h3>0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6</h3>
                  <h2>Funded 0.2ETH</h2>
                </div>
              </div>
              <div className="paper_funder">
                <img src={pf} alt="" srcset="" />
                <div>
                  <h3>0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6</h3>
                  <h2>Funded 0.2ETH</h2>
                </div>
              </div>
              <div className="paper_funder">
                <img src={pf} alt="" srcset="" />
                <div>
                  <h3>0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6</h3>
                  <h2>Funded 0.2ETH</h2>
                </div>
              </div>
              <div className="paper_funder">
                <img src={pf} alt="" srcset="" />
                <div>
                  <h3>0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6</h3>
                  <h2>Funded 0.2ETH</h2>
                </div>
              </div>
              <div className="paper_funder">
                <img src={pf} alt="" srcset="" />
                <div>
                  <h3>0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6</h3>
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
  );
};
