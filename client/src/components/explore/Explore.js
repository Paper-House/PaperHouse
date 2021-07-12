import React from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import PaperCard from "./PaperCard";

export const Explore = () => {
  const data = [
    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    }, {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
    },
  ];
  return (
    <div className="explore container">
      <div className="explore_title">
        <h3>Explore</h3>
      </div>
      <div className="explore_categories">
        <div className="explore_category_item">
          <h3>All</h3>
        </div>
        <div className="explore_category_item">
          <h3>⚛ Science</h3>
        </div>
        <div className="explore_category_item">
          <h3>🚀 Space</h3>
        </div>
        <div className="explore_category_item">
          <h3>📃 Whiite Papers</h3>
        </div>
        <div className="explore_category_item">
          <h3>🤖 ML/AL</h3>
        </div>
        <div className="explore_category_item">
          <h3>⚕️ Medical</h3>
        </div>
        <div className="explore_category_item">
          <h3>📊 Economics</h3>
        </div>
      </div>
      <div className="explore_papers">
        {data.map((paper) => {
          return (
            <Link to={`paper?token=${paper.paperid}`}>
              <PaperCard data={paper} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
