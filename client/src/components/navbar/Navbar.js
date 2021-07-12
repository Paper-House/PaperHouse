import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import logo from "../assets/logo.svg";
import metamask from "../assets/metamask.png";
import portis from "../assets/portis.png";
export const Navbar = () => {
  const [walletToggle, setWalletToggle] = useState(false);
  return (
    <>
      <div className="nav__backdrop">
        <nav>
          <NavLink
            to="/"
            className="logo-navlink"
            exact
            activeClassName="active"
          >
            <img src={logo} />
          </NavLink>
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
              <NavLink id="explore" to="/explore">
                Explore
              </NavLink>
              <NavLink id="my-papers" to="/mypaper">
                My Papers
              </NavLink>
            </div>
            <div className="nav-buttons-right">
              <NavLink id="publish" to="/publish">
                Publish
              </NavLink>
              <a
                id="connect"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setWalletToggle(!walletToggle);
                }}
              >
                Connect
              </a>
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
      </div>
      {walletToggle ? (
        <div className="ConnectWallet_container">
          <div
            className="toggleoff"
            onClick={() => setWalletToggle(false)}
          ></div>
          <div className="ConnectWallet">
            <div className="connectwallet_text">
              <h3>Connect Wallet</h3>
              <button onClick={() => setWalletToggle(false)}>
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.7024 23L33.944 14.7775C34.305 14.4166 34.5077 13.9271 34.5077 13.4167C34.5077 12.9063 34.305 12.4167 33.944 12.0558C33.5831 11.6949 33.0936 11.4922 32.5832 11.4922C32.0728 11.4922 31.5833 11.6949 31.2224 12.0558L22.9999 20.2975L14.7774 12.0558C14.4165 11.6949 13.927 11.4922 13.4165 11.4922C12.9061 11.4922 12.4166 11.6949 12.0557 12.0558C11.6948 12.4167 11.492 12.9063 11.492 13.4167C11.492 13.9271 11.6948 14.4166 12.0557 14.7775L20.2974 23L12.0557 31.2225C11.8761 31.4007 11.7335 31.6127 11.6362 31.8462C11.5389 32.0798 11.4888 32.3303 11.4888 32.5833C11.4888 32.8364 11.5389 33.0869 11.6362 33.3204C11.7335 33.554 11.8761 33.766 12.0557 33.9442C12.2339 34.1238 12.4459 34.2664 12.6794 34.3637C12.913 34.461 13.1635 34.5111 13.4165 34.5111C13.6696 34.5111 13.9201 34.461 14.1537 34.3637C14.3872 34.2664 14.5992 34.1238 14.7774 33.9442L22.9999 25.7025L31.2224 33.9442C31.4006 34.1238 31.6125 34.2664 31.8461 34.3637C32.0797 34.461 32.3302 34.5111 32.5832 34.5111C32.8362 34.5111 33.0868 34.461 33.3203 34.3637C33.5539 34.2664 33.7659 34.1238 33.944 33.9442C34.1237 33.766 34.2663 33.554 34.3636 33.3204C34.4609 33.0869 34.511 32.8364 34.511 32.5833C34.511 32.3303 34.4609 32.0798 34.3636 31.8462C34.2663 31.6127 34.1237 31.4007 33.944 31.2225L25.7024 23Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div className="connectwallet_metamask">
              <h3>MetaMask</h3>
              <img src={metamask} alt="metamask" />
            </div>
            <div className="connectwallet_portis">
              <h3>Portis</h3>
              <img src={portis} alt="metamask" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
