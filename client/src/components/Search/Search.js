import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import pf from "../assets/pf.png";
import "./search.css";
import makeBlockie from "ethereum-blockies-base64";

export default function Search({ input, resetInput }) {
  const papers = useSelector((state) => state.paper.papers.data);
  const [result, setresult] = useState([]);
  useEffect(() => {
    papers.forEach((paper) => {
      if (paper.title.toLowerCase().search(input.toLowerCase()) !== -1) {
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
      {result.length !== 0 ? (
        result.map((paper, index) => {
          return (
            <li onClick={() => resetInput("")} key={index}>
              <a href={`/paper/${paper.paperid}`}>
                <SearchResultCard
                  image={paper.thumbnail}
                  title={paper.title}
                  address={paper.publisher}
                />
              </a>
            </li>
          );
        })
      ) : (
        <h3 style={{ textAlign: "center", color: "white" }}>No Results</h3>
      )}
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
            <img src={makeBlockie(address)} alt="pf" />
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
