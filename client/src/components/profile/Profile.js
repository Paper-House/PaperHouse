import React, { useState } from "react";

import makeBlockie from "ethereum-blockies-base64";

import "./Profile.css";

import { Mypapers } from "../mypapers/index";
import Activities from "../activities/Activities";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const path = props.location.pathname;

  const { connected, address } = useSelector((state) => state.paper.wallet);

  const [navComponent, setNavComponent] = useState("My Papers");
  const [heading, setHeading] = useState(
    path === "/profile" ? "Papers Published" : "My Papers"
  );
  const [myPaperColor, setMyPaperColor] = useState("My Papers");
  const [myActivitiesColor, setActivitiesColor] = useState("My Papers");
  const handleNav = (option) => {
    setNavComponent(option);
    setHeading(option);
  };
  function checkNav() {
    const navcomp = path === "/profile" ? "Papers Published" : "My Papers";
    if (navComponent === navcomp) return <Mypapers path={path} />;
    else if (navComponent === "Activities") return <Activities />;
    else return <Mypapers path={path} />;
  }
  return (
    <div className="Profile_container container">
      <div className="Activities__nav--section">
        <h2 id="heading">{heading}</h2>
        <div className="Activities__navigation">
          <div
            className="Activities__navigation-mypapers"
            onClick={() => {
              handleNav(path === "/profile" ? "Papers Published" : "My Papers");
              setMyPaperColor("#0088fe");
              setActivitiesColor("#116096");
            }}
            style={{ backgroundColor: myPaperColor }}
          >
            {path === "/profile" ? "Papers" : "My Papers"}
          </div>
          <div
            className="Activities__navigation-activities"
            onClick={() => {
              handleNav("Activities");
              setActivitiesColor("#0088fe");
              setMyPaperColor("#116096");
            }}
            style={{ backgroundColor: myActivitiesColor }}
          >
            Activities
          </div>
        </div>
        <div className="Activities__person--proflie">
          {connected ? (
            <>
              <p>{address}</p> <img src={makeBlockie(address)} alt="pf" />
            </>
          ) : null}
        </div>
      </div>
      <div className="Activities__nav--section-mob">
        <h2 id="heading">{heading}</h2>
        <div className="Activities__person--proflie">
          {connected ? (
            <>
              <p>{address}</p> <img src={makeBlockie(address)} alt="pf" />
            </>
          ) : null}
        </div>
        <div className="Activities__navigation">
          <div
            className="Activities__navigation-mypapers"
            onClick={() => {
              handleNav(path === "/profile" ? "Papers Published" : "My Papers");
              setMyPaperColor("#0088fe");
              setActivitiesColor("#116096");
            }}
            style={{ backgroundColor: myPaperColor }}
          >
            {path === "/profile" ? "Papers" : "My Papers"}
          </div>
          <div
            className="Activities__navigation-activities"
            onClick={() => {
              handleNav("Activities");
              setActivitiesColor("#0088fe");
              setMyPaperColor("#116096");
            }}
            style={{ backgroundColor: myActivitiesColor }}
          >
            Activities
          </div>
        </div>
      </div>
      {checkNav()}
    </div>
  );
};

export default Profile;
