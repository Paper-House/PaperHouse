import React from "react";
import { NavLink } from "react-router-dom";
import "./mypapers.css";

export const Mypapers = () => {
  return (
    <div className="Mypapers_container">
      <div className="sidebar_">
        <NavLink id="sidebar_active_button" to="/mypaper" activeClassName="active">
          My Papers
        </NavLink>
        <NavLink id="my-papers" to="/activites" activeClassName="active">
          Activities
        </NavLink>
      </div>
    </div>
  );
};
