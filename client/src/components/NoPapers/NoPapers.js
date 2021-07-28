import React from "react";

import NoPapersPng from "../assets/NoPapers.png";

import "./NoPapers.css";

const NoPapers = () => {
  return <div className="NoPapers--container">
	  <img src={NoPapersPng} />
	  <h2>No Papers Published</h2>
  </div>;
};

export default NoPapers;
