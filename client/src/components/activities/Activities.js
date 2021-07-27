import React from "react";
import { useSelector } from "react-redux";

import "./Activities.css";

import pf from "../assets/pf.png";

const ActivityCard = ({ image, title, address, fundAmount }) => {
  return (
    <div className="Activities__main--card">
      <img src={image} alt="thumbnail" />
      <div className="Activities__main--section--info">
        <h5>{title}</h5>
        <div className="Activities__main--section--transaction--info">
          <div className="Activities__main--address">
            <img src={pf} alt="pf" />
            <p>{address}</p>
          </div>
          <p id="fundAmount">Funded {fundAmount}ETH</p>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const myActivities = useSelector((state) => state.paper.myActivities).data;
  const { address } = useSelector((state) => state.paper.wallet);
  return (
    <div className="Activities__container">
      <div className="Activities__main--section">
        {myActivities.length != 0
          ? myActivities.map((activity) => {
            console.log(activity.title)
              return (
                <ActivityCard
                  image={activity.thumbnail}
                  title={activity.title}
                  address={address}
                  fundAmount={activity.amount}
                />
              );
            })
          : (!address) ? "Connect Your Wallet" : "Loading"}
      </div>
      <div></div>
    </div>
  );
};

export default Activities;
