import React from "react";

import "./Activities.css";

import pf from "../assets/pf.png";
import thumbnail from "../assets/thumb.png";

const Activities = () => {
  return (
    <div className="Activities__container">
      <div className="Activities__main--section">
        {" "}
        {/* flex */}
        <div className="Activities__main--card">
          <img src={thumbnail} alt="thumbnail" />
          <div className="Activities__main--section--info">
            <h5>
              Computing interaction effects and standard errors in logit and
              probit models
            </h5>
            <div className="Activities__main--section--transaction--info">
              <div className="Activities__main--address">
                <img src={pf} alt="pf" />
                <p>
                0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                </p>
              </div>
              <p>Funded 0.5ETH</p>
            </div>
          </div>
        </div>
        <div className="Activities__main--card">
          <img src={thumbnail} alt="thumbnail" />
          <div className="Activities__main--section--info">
            <h5>
              Computing interaction effects and standard errors in logit and
              probit models
            </h5>
            <div className="Activities__main--section--transaction--info">
              <div className="Activities__main--address">
                <img src={pf} alt="pf" />
                <p>
                0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                </p>
              </div>
              <p>Funded 0.5ETH</p>
            </div>
          </div>
        </div>
        <div className="Activities__main--card">
          <img src={thumbnail} alt="thumbnail" />
          <div className="Activities__main--section--info">
            <h5>
              Computing interaction effects and standard errors in logit and
              probit models
            </h5>
            <div className="Activities__main--section--transaction--info">
              <div className="Activities__main--address">
                <img src={pf} alt="pf" />
                <p>
                0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6
                </p>
              </div>
              <p>Funded 0.5ETH</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Activities;
