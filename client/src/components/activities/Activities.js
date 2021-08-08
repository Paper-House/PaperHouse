import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./Activities.css";

import ConnectWallet from "../connectWallet/ConnectWallet";
import NoActivities from "../NoActivities/NoActivities";
import makeBlockie from "ethereum-blockies-base64";

const ActivityCard = ({ image, title, address, fundAmount }) => {
  return (
    <div className="Activities__main--card">
      <img src={image} alt="thumbnail" />
      <div className="Activities__main--section--info">
        <div className="Activities-title">
          <h5>{title}</h5>
        </div>
        <div className="Activities__main--section--transaction--info">
          <div className="Activities__main--address">
            <img src={makeBlockie(address)} alt="pf" />
            <p>{address}</p>
          </div>
          <p id="fundAmount">Funded {Number(fundAmount).toFixed(3)} MATIC</p>
        </div>
      </div>
    </div>
  );
};

const ActivityCardLoading = () => {
  return (
    <div
      className="Activities__main--card"
      style={{
        padding: "0px 3px 3px 3px",
        display: "block",
        overflow: "hidden",
      }}
    >
      {/* <img src={image} alt="thumbnail" /> */}
      <Skeleton width={"100%"} height={"70px"} />
    </div>
  );
};

const Activities = () => {
  const myActivities = useSelector((state) => state.paper.myActivities).data;
  const { address, connected } = useSelector((state) => state.paper.wallet);
  const activityLoading = useSelector(
    (state) => state.paper.myActivities.loading
  );
  // const activityLoading = true;
  const [urlAddress, setUrlAddress] = useState(null);

  useEffect(() => {
    setUrlAddress(window.location.search.slice(9));
  });

  return (
    <>
      {!activityLoading ? (
        <div className="Activities__container">
          {myActivities.length != 0 ? (
            <div className="Activities__main--section">
              {myActivities.map((activity) => {
                return (
                  <ActivityCard
                    image={activity.thumbnail}
                    title={activity.title}
                    address={activity.from}
                    fundAmount={activity.amount}
                  />
                );
              })}
            </div>
          ) : !address ? (
            <div
              className="Activities__main--section"
              style={{ display: "block" }}
            >
              <ConnectWallet />
            </div>
          ) : (
            <div
              className="Activities__main--section"
              style={{ display: "block" }}
            >
              <NoActivities />
            </div>
          )}
        </div>
      ) : (
        <div className="Activities__container">
          <div className="Activities__main--section">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => {
              return <ActivityCardLoading />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Activities;
