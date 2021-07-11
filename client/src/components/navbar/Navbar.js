import React from "react";

import "./Navbar.css";

import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <nav>
      <img src={logo} />
      <div className="paper-search">
        <form>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#0097fd"
            />
          </svg>
          <input type="text" placeholder="Search Papers" />
        </form>
      </div>
      <div className="nav-buttons">
        <div className="nav-buttons-left">
          <a id="explore">Explore</a>
          <a id="my-papers">My Papers</a>
        </div>
        <div className="nav-buttons-right">
          <a id="publish">Publish</a>
          <a id="connect">Connect</a>
        </div>
      </div>

      <div className="mobile__slider__toogle--search">
        <div className="search__icon--circle">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#0097fd"
            />
          </svg>
        </div>
        <div className="dropdown__icon--circle">
          <svg
            viewBox="0 0 18 8"
            fill="none"
            width="13.200000000000001"
            height="13.200000000000001"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447716 2 1 2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H1ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H4Z"
              fill="#0097fd"
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
}
