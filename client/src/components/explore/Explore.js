import React, { useEffect, useState } from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import PaperCard from "./PaperCard";
import { useSelector } from "react-redux";
import { PaperCardLoading } from "../paperCardLoading";
import Nopaperloading from "../assets/NoPapers-explore.png";
export const Explore = () => {
  const [category, setcategory] = useState("all");
  const [paperbycat, setpaperbycat] = useState([]);
  const papers = useSelector((state) => state.paper.papers.data);
  useEffect(() => {
    if (papers.length != 0) {
      setpaperbycat(papers);
    }
  }, [papers]);
  useEffect(() => {
    setpaperbycat([]);
    if (papers.length != 0) {
      if (category === "all") {
        setpaperbycat(papers);
      } else {
        let paper_byCategory = [];
        papers.forEach((paper) => {
          if (paper.category === category) {
            paper_byCategory.push(paper);
            setpaperbycat(paper_byCategory);
          }
        });
      }
    }
  }, [category]);
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
      {papers.length === 0 ? (
        <div className="explore_papers">
          {[1, 2, 3, 4].map((data, index) => {
            return <PaperCardLoading key={index} page={"/explore"} />;
          })}
        </div>
      ) : null}
      {papers.length != 0 ? (
        paperbycat.length != 0 ? (
          <div className="explore_papers">
            {paperbycat.map((paper, index) => {
              return (
                <Link to={`/paper/${paper.paperid}`} key={index}>
                  <PaperCard data={paper} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="explore_nopapers">
            <img src={Nopaperloading} alt="" />
            <h3>No Papers</h3>
          </div>
        )
      ) : null}
    </div>
  );
};
