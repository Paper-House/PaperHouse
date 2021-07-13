import React, { useState } from "react";
import "./mypapers.css";
import { Link } from "react-router-dom";
import PaperCard from "../explore/PaperCard";

export const Mypapers = () => {
  const [category, setcategory] = useState("all");

  const data = [
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "science",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "whitepapers",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "space",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "science",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "ml/ai",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "medical",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "space",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "economics",
    },
  ];
  return (
    <div className="mypapers container">
      <div className="explore_title">
        <h3>My Papers</h3>
      </div>
      <div className="mypapers_papers">
        {data.map((paper) => {
          if (category === "all") {
            return (
              <Link to={`paper?token=${paper.paperid}`}>
                <PaperCard data={paper} />
              </Link>
            );
          }
          if (paper.category === category) {
            return (
              <Link to={`paper?token=${paper.paperid}`}>
                <PaperCard data={paper} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};
