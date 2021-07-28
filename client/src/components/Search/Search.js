import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./search.css";

export default function Search({ input }) {
  const papers = useSelector((state) => state.paper.papers.data);
  const [result, setresult] = useState([]);
  useEffect(() => {
    papers.map((paper, index) => {
      if (paper.title.toLowerCase().search(input) != -1) {
        setresult([
          ...result,
          {
            paperid: paper.paperid,
            title: paper.title,
            thumbnail: paper.thumbnail,
            publisher: paper.publisher,
          },
        ]);
      }
    });
  }, [input]);
  return (
    <div className="nav_search_container">
      {result.map((paper) => {
        return <li>{paper.title}</li>;
      })}
    </div>
  );
}
