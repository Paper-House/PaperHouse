import React, { useState } from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import PaperCard from "./PaperCard";
import { useSelector } from "react-redux";

export const Explore = () => {
  const [category, setcategory] = useState("all");
  const papers = useSelector((state) => state.paper.papers.data);
  return (
    <div className="explore container">
      <div className="explore_title">
        <h3>Explore</h3>
      </div>
      <div className="explore_categories">
        <button
          className="explore_category_item"
          aria-expanded={category === "all" ? true : false}
          onClick={(e) => setcategory(e.target.innerText.toLowerCase())}
        >
          All
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "science" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          ⚛ Science
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "space" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          🚀 Space
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "whitepapers" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          📃 WhitePapers
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "ml/ai" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          🤖 ML/AI
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "medical" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          ⚕️ Medical
        </button>
        <button
          className="explore_category_item"
          aria-expanded={category === "economics" ? true : false}
          onClick={(e) =>
            setcategory(e.target.innerText.split(" ")[1].toLowerCase())
          }
        >
          📊 Economics
        </button>
      </div>
      <div className="explore_papers">
        {papers.length > 0
          ? papers.map((paper) => {
              if (category === "all") {
                console.log(paper.paperid)
                return (
                  <Link to={`/paper/${paper.paperid}`}>
                    <PaperCard data={paper} />
                  </Link>
                );
              }
              if (paper.category === category) {
                return (
                  <Link to={`/paper/${paper.paperid}`}>
                    <PaperCard data={paper} />
                  </Link>
                );
              }
            })
          : ""}
      </div>
    </div>
  );
};
