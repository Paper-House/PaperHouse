import React, { useState } from "react";
import "./mypapers.css";
import { Link } from "react-router-dom";
import PaperCard from "../explore/PaperCard";

export const Mypapers = () => {
  const [category, setcategory] = useState("all");
  const address = "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6";
  const data = [
    {
      paperid: 2,
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
      publisher: "0x0aa121493Ba3f231s70dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "ml/ai",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBBfaAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "medical",
    },
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAf62a9De64F374f6",
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
  function UpdatePaper(paperid, updateAmount, fundToggle) {
    //smart contract call
    console.log(paperid, fundToggle);
  }
  return (
    <div className="mypapers">
      <div className="mypapers_papers">
        {data.map((paper) => {
          if (paper.publisher === address)
          return (
              <PaperCard
                data={paper}
                page="mypapers"
                currentAmount="2.5ETH"
                callupdate={(updateAmount, fundToggle) =>
                  UpdatePaper(paper.paperid, updateAmount, fundToggle)
                }
              />
            );
        })}
      </div>
    </div>
  );
};
