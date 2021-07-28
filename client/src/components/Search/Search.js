import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import pf from "../assets/pf.png";
import "./search.css";

export default function Search({ input }) {
  const papers = useSelector((state) => state.paper.papers.data);
  const [result, setresult] = useState([]);
  useEffect(() => {
    papers.map((paper, index) => {
      if (paper.title.toLowerCase().search(input) != -1) {
        if (!result.find((res) => res.paperid === paper.paperid)) {
          setresult([
            {
              paperid: paper.paperid,
              title: paper.title,
              thumbnail: paper.thumbnail,
              publisher: paper.publisher,
            },
            ...result,
          ]);
        }
      }
    });
  }, [input]);
  return (
    <div className="nav_search_container">
      {result.map((paper) => {
        return (
          <li>
            <Link to={`/paper/${paper.paperid}`}>
              <SearchResultCard
                image={paper.thumbnail}
                title={paper.title}
                address={paper.publisher}
              />
            </Link>
          </li>
        );
      })}
    </div>
  );
}

const SearchResultCard = ({ image, title, address }) => {
  return (
    <div className="SearchNav__main--card">
      <img src={image} alt="thumbnail" />
      <div className="SearchNav__main--section--info">
        <h5>{title}</h5>
        <div className="SearchNav__main--section--transaction--info">
          <div className="SearchNav__main--address">
            <img src={pf} alt="pf" />
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
