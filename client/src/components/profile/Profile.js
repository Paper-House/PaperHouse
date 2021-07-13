import React, { useState } from "react";

import pf from "../assets/pf.png";

import "./Profile.css";

import { Mypapers } from "../mypapers/index";
import Activities from "../activities/Activities";

const Profile = () => {
  const [navComponent, setNavComponent] = useState("My Papers");
  const [heading, setHeading] = useState("My Papers");
  const [myPaperColor, setMyPaperColor] = useState("My Papers");
  const [myActivitiesColor, setActivitiesColor] = useState("My Papers");

  const handleNav = (option) => {
    setNavComponent(option);
    setHeading(option);
  };

  return (
    <div className="Profile_container container">
      <div className="Activities__nav--section">
        <h2 id="heading">{heading}</h2>
        <div className="Activities__navigation">
          <div
            className="Activities__navigation-mypapers"
            onClick={() => {handleNav("My Papers"); setMyPaperColor("#0088fe"); setActivitiesColor("#116096")}}
			style={{backgroundColor:myPaperColor}}
          >
            My Papers
          </div>
          <div
            className="Activities__navigation-activities"
            onClick={() => {handleNav("Activities"); setActivitiesColor("#0088fe"); setMyPaperColor("#116096")}}
			style={{backgroundColor:myActivitiesColor}}
          >
            Activities
          </div>
        </div>
        <div className="Activities__person--proflie">
          <p>
            043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89
          </p>
          <img src={pf} alt="pf" />
        </div>
      </div>
      <div className="Activities__nav--section-mob">
        <h2>Activities</h2>
        <div className="Activities__person--proflie">
          <p>
            043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89
          </p>
          <img src={pf} alt="pf" />
        </div>
        <div className="Activities__navigation">
          <div
            className="Activities__navigation-mypapers"
            onClick={() => {handleNav("My Papers"); setMyPaperColor("#0088fe"); setActivitiesColor("#116096")}}
			style={{backgroundColor:myPaperColor}}
          >
            My Papers
          </div>
          <div
            className="Activities__navigation-activities"
            onClick={() => {handleNav("Activities"); setActivitiesColor("#0088fe"); setMyPaperColor("#116096")}}
			style={{backgroundColor:myActivitiesColor}}
          >
            Activities
          </div>
        </div>
      </div>
      {navComponent == "My Papers" ? (
        <Mypapers />
      ) : navComponent == "Activities" ? (
        <Activities />
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
