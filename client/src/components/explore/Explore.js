import React, { useState } from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import PaperCard from "./PaperCard";

export const Explore = () => {
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
    },    {
      paperid: 1,
      title:
        "Computing interaction effects and standard errors in logit and probit models",
      author: "Edward C. Norton",
      publisher: "0x0aa121493Ba3f231570dBB3aAA62a9De64F374f6",
      date: "10 june 2021",
      thumbnail: "https://ipfs",
      category: "space",
    },    {
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
    <div className="explore container">
      <div className="explore_title">
        <h3>Explore</h3>
      </div>
      <div className="explore_categories">
        <button
          className="explore_category_item"
          aria-expanded={category == "all" ? true : false}
          onClick={(e) => setcategory(e.target.innerText.toLowerCase())}
        >
          All
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "science" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          ⚛ Science
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "space" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          🚀 Space
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "whitepapers" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          📃 WhitePapers
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "ml/ai" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          🤖 ML/AI
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "medical" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          ⚕️ Medical
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category == "economics" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          📊 Economics
        </button>
      </div>
      <div className="explore_papers">
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
