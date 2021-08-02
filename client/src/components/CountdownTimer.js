import React, { useEffect, useState } from "react";

import "./CountdownTimer.css";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`8/08/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timerLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setYear(new Date().getFullYear());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className="container counterContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="live">
        <h1 id="live">
          Site Will Be Live In
        </h1>
        <div className="timer">
          <h2 style={{ textAlign: "center", color: "white" }}>
             {timerLeft["days"]} Days
          </h2>
          <h2 style={{ textAlign: "center", color: "white" }}>
             {timerLeft["hours"]} Hours
          </h2>
          <h2 style={{ textAlign: "center", color: "white" }}>
             {timerLeft["minutes"]} Minutes
          </h2>
          <h2 style={{ textAlign: "center", color: "white" }}>
             {timerLeft["seconds"]} Seconds
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
