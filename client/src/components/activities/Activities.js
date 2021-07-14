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
                  43a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89
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
                  43a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89
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
                  43a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89
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
