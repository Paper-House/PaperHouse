import React, { useEffect } from "react";
import "./search.css";

export default function Search({ input }) {
  return <div className="nav_search_container">You searched :{input}</div>;
}
