import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./search.css";

export default function Search({ input }) {
  const papers = useSelector((state) => state.paper.papers.data);
  const [result, setresult] = useState([]);
  useEffect(() => {
    papers.map((paper, index) => {
      if (paper.title.toLowerCase().search(input) != -1) {
        console.log(paper);
      }
    });
  }, [input]);
  return <div className="nav_search_container">You searched :{input}</div>;
}
