import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import "./Navbar.css";

import logo from "../assets/logo.svg";
import metamask from "../assets/metamask_icon.svg";
import portis from "../assets/portis_icon.svg";
import ConnectWallet from "../ConnectWallet";
import { setPapers } from "../../redux/reducers/papersreducer";
import web3 from "web3";
import {
  setMyActivities,
  setMyPapers,
  setMyPapersLoading,
  setMyActivitiesLoading,
} from "../../redux/reducers/papersreducer";
import axios from "axios";
import { toGatewayURL } from "nft.storage";

import {
  apiEndpoint,
  getAllPapersQuery,
  GETMYPAPES,
  myActivities,
} from "../../graphQueries";

import { getURL } from "../../utils/getURL";
import useENS from "../../hooks/useENS";
import Search from "../Search/Search";

export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

export const Navbar = () => {
  const [dropHeight, setDropHeight] = useState(2.2);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [ismetamask, setismetamask] = useState(false);
  const [walletToggle, setWalletToggle] = useState(false);
  const [SearchToggle, setSearchToggle] = useState(false);
  const dispatch = useDispatch();
  const [Connecting, setConnecting] = useState(false);
  const [wallet, setwallet] = useState(0);
  const containerRef = useRef(null);
  const height = useDimensions(containerRef);
  const [Searchinput, setSearchinput] = useState(undefined);

  //add paperId of paper here to blacklist tht paper
  const Paper_blacklist = [10];

  const { connected, correctNetwork, address } = useSelector(
    (state) => state.paper.wallet
  );
  const { ensName, ensAvatar } = useENS(address);

  function blacklist(paperid) {
    if (Paper_blacklist.find((list) => list == paperid)) return true;
    return false;
  }

  useEffect(() => {
    axios
      .post(apiEndpoint, { query: getAllPapersQuery.query })
      .then(({ data }) => {
        data.data.papers.map((data) => {
          if (!blacklist(data.paperId)) {
            axios.get(getURL(data.tokenUri)).then((metadata) => {
              var paper = {};
              paper.paperid = data.paperId;
              paper.title = metadata.data.name;
              paper.thumbnail = getURL(metadata.data.image);
              paper.category = metadata.data.category.toLowerCase();
              paper.author = metadata.data.author;
              paper.date = metadata.data.publishDate;
              paper.publisher = data.owner;
              dispatch(setPapers(paper));
            });
          }
        });
      });

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.keyCode === 27) {
          setWalletToggle(false);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setismetamask(true);
    } else {
      setismetamask(false);
    }
  }, [window.ethereum]);

  useEffect(() => {
    if (connected) {
      setWalletToggle(false);
      setConnecting(false);
      dispatch(setMyPapersLoading(true));
      axios
        .post(apiEndpoint, {
          query: GETMYPAPES(address).query,
        })
        .then(({ data }) => {
          data = data.data.papers;
          data.length === 0
            ? dispatch(setMyPapersLoading(false))
            : dispatch(setMyPapersLoading(true));
          let payloadData = {};
          data.map((paper) => {
            let nftUrl = toGatewayURL(paper.tokenUri).href;
            dispatch(setMyPapersLoading(true));
            axios
              .get(nftUrl)
              .then(({ data }) => {
                let thumbnail =
                  "https://ipfs.io" + "/ipfs" + data.image.slice(6);
                payloadData = {
                  paperid: paper.paperId,
                  title: data.name,
                  author: data.author,
                  publisher: paper.owner,
                  date: data.publishDate,
                  thumbnail: thumbnail,
                  category: data.category,
                  allowFunding: JSON.parse(paper.allowFunding),
                  fundAmount: web3.utils.fromWei(paper.fundAmount, "ether"),
                };
                dispatch(setMyPapers(payloadData));
                dispatch(setMyPapersLoading(false));
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));

      setMyActivitiesLoading(true);
      axios
        .post(apiEndpoint, {
          query: myActivities(address).query,
        })
        .then((activityData) => {
          activityData = activityData.data.data.paperFundings;
          activityData.length == 0
            ? dispatch(setMyActivitiesLoading(false))
            : dispatch(setMyActivitiesLoading(true));
          let myActivitiesPayload = {};
          activityData.map((activity) => {
            dispatch(setMyActivitiesLoading(true));
            let nftUrl = toGatewayURL(activity.tokenUri).href;
            axios.get(nftUrl).then(({ data }) => {
              let thumbnail = "https://ipfs.io" + "/ipfs" + data.image.slice(6);
              myActivitiesPayload = {
                thumbnail: thumbnail,
                title: data.name,
                from: activity.from,
                amount: web3.utils.fromWei(activity.amount, "ether"),
              };
              dispatch(setMyActivities(myActivitiesPayload));
              dispatch(setMyActivitiesLoading(false));
            });
          });
        });
    } else {
      console.log("Wallet not connected.");
    }
  }, [address]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerHeight >= 1024 ? setDropHeight(2.5) : setDropHeight(2.2);
      setHamburgerOpen(false);
    });
    window.innerHeight >= 1024 ? setDropHeight(2.5) : setDropHeight(2.2);
  }, []);

  useEffect(() => {
    if (walletToggle) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "visible";
    }

    if (connected) {
      if (correctNetwork) {
        window.document.body.style.overflow = "visible";
      } else {
        window.document.body.style.overflow = "hidden";
      }
    }
  }, [walletToggle, correctNetwork]);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height / dropHeight}px at 50% 50px)`,
      transition: {
        type: "spring",
        stiffness: 150,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: `circle(0px at 90% 35px)`,
      transition: {
        delay: 0,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const hamburgerClickHandle = () => {
    isHamburgerOpen ? setHamburgerOpen(false) : setHamburgerOpen(true);
  };

  return (
    <>
      <ConnectWallet
        wallet={wallet}
        setWallconnect={(prop) => setwallet(prop)}
        setConnecting={setConnecting}
      />
      {connected ? correctNetwork ? null : <WrongNetwork /> : null}
      <div className="nav__backdrop">
        <nav>
          <NavLink
            to="/"
            className="logo-navlink"
            exact
            activeClassName="active"
          >
            <img src={logo} style={SearchToggle ? { display: "none" } : null} />
          </NavLink>
          <div
            className="paper-search"
            style={SearchToggle ? { display: "block", width: "100%" } : null}
          >
            <form onSubmit={(e) => e.preventDefault()}>
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
              <input
                type="text"
                placeholder="Search Papers"
                onChange={(e) => setSearchinput(e.target.value)}
              />
            </form>
            {!Searchinput ? null : (
              <Search input={Searchinput} resetInput={setSearchinput} />
            )}
          </div>
          <div className="nav-buttons">
            <div className="nav-buttons-left">
              <NavLink id="explore" to="/explore">
                Explore
              </NavLink>
              <NavLink id="my-papers" to="/myprofile">
                My Profile
              </NavLink>
            </div>
            <div className="nav-buttons-right">
              <NavLink id="publish" to="/publish">
                Publish
              </NavLink>
              <a
                id="connect"
                className="nav-user"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setWalletToggle(!walletToggle);
                }}
              >
                {ensAvatar && (
                  <img className="nav-avatar" src={ensAvatar} alt={address} />
                )}
                {!connected ? "Connect" : ensName || "Connected"}
              </a>
            </div>
          </div>
          <div
            className="search__icon--circle_cancel"
            onClick={() => setSearchToggle(!SearchToggle)}
            style={SearchToggle ? { display: "block" } : { display: "none" }}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              width="13.200000000000001"
              height="13.200000000000001"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2"></path>
              <path d="M12 12L4 4" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
          <div
            className="mobile__slider__toogle--search"
            style={SearchToggle ? { display: "none" } : null}
          >
            <div
              className="search__icon--circle"
              onClick={() => setSearchToggle(!SearchToggle)}
            >
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
              <motion.nav
                initial={false}
                animate={isHamburgerOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                className="mobile__name-motion-nav"
              >
                {/* <Navigation /> */}
                <motion.div
                  className="mobile__name-motion-div-sidebar container"
                  variants={sidebar}
                >
                  <nav>
                    <NavLink
                      to="/"
                      className="logo-navlink"
                      exact
                      activeClassName="active"
                    >
                      <img src={logo} />
                    </NavLink>
                  </nav>
                  <div className="nav__mobile-dropdown-navigation">
                    <div className="nav__mobile-dropdown-navigation-buttons">
                      <NavLink
                        id="explore"
                        to="/explore"
                        onClick={hamburgerClickHandle}
                      >
                        Explore 🚀️
                      </NavLink>
                      <NavLink
                        id="my-papers"
                        to="/myprofile"
                        onClick={hamburgerClickHandle}
                      >
                        My Profile
                      </NavLink>
                      <div className="nav__mobile-dropdown-navigation-buttons-connect-publish">
                        <NavLink
                          id="publish"
                          to="/publish"
                          onClick={hamburgerClickHandle}
                        >
                          Publish
                        </NavLink>
                        <a
                          id="connect"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            hamburgerClickHandle();
                            setWalletToggle(!walletToggle);
                          }}
                        >
                          {!connected ? "Connect" : "Connected"}
                        </a>
                      </div>
                      <div className="mobile__nav-dropdown-socialMedia">
                        <div className="mobile-nav-social">
                          <a
                            href="https://github.com/Paper-House"
                            target="_blank"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={hamburgerClickHandle}
                            >
                              <path
                                d="M8.72727 0.0947266C3.90836 0.0947266 0 4.00236 0 8.822C0 12.678 2.50036 15.9493 5.96873 17.1035C6.40436 17.1842 6.54545 16.9136 6.54545 16.6838V15.0591C4.11782 15.5871 3.61236 14.0293 3.61236 14.0293C3.21527 13.0205 2.64291 12.7522 2.64291 12.7522C1.85091 12.2104 2.70327 12.222 2.70327 12.222C3.57964 12.2831 4.04073 13.1216 4.04073 13.1216C4.81891 14.4555 6.08218 14.07 6.58036 13.8467C6.65818 13.2831 6.88436 12.8976 7.13455 12.6802C5.19636 12.4584 3.15855 11.71 3.15855 8.36673C3.15855 7.41327 3.49964 6.63509 4.05745 6.02418C3.96727 5.80382 3.66836 4.91582 4.14255 3.71436C4.14255 3.71436 4.87564 3.48018 6.54327 4.60891C7.23927 4.41545 7.98545 4.31873 8.72727 4.31509C9.46909 4.31873 10.216 4.41545 10.9135 4.60891C12.5796 3.48018 13.3113 3.71436 13.3113 3.71436C13.7862 4.91655 13.4873 5.80455 13.3971 6.02418C13.9571 6.63509 14.2953 7.414 14.2953 8.36673C14.2953 11.7187 12.2538 12.4569 10.3105 12.6729C10.6233 12.9435 10.9091 13.4744 10.9091 14.2889V16.6838C10.9091 16.9158 11.0487 17.1885 11.4916 17.1027C14.9571 15.9471 17.4545 12.6765 17.4545 8.822C17.4545 4.00236 13.5469 0.0947266 8.72727 0.0947266Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </div>
                        <div className="mobile-nav-social">
                          <a href="#">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={hamburgerClickHandle}
                            >
                              <path
                                d="M9.45453 1.71698C11.8575 1.71698 12.1425 1.72598 13.092 1.76948C15.531 1.88048 16.6703 3.03773 16.7813 5.45873C16.8248 6.40748 16.833 6.69248 16.833 9.09548C16.833 11.4992 16.824 11.7835 16.7813 12.7322C16.6695 15.151 15.5333 16.3105 13.092 16.4215C12.1425 16.465 11.859 16.474 9.45453 16.474C7.05153 16.474 6.76653 16.465 5.81778 16.4215C3.37278 16.3097 2.23953 15.1472 2.12853 12.7315C2.08503 11.7827 2.07603 11.4985 2.07603 9.09473C2.07603 6.69173 2.08578 6.40748 2.12853 5.45798C2.24028 3.03773 3.37653 1.87973 5.81778 1.76873C6.76728 1.72598 7.05153 1.71698 9.45453 1.71698ZM9.45453 0.0947266C7.01028 0.0947266 6.70428 0.105227 5.74428 0.148727C2.47578 0.298727 0.659279 2.11223 0.509279 5.38373C0.465029 6.34448 0.454529 6.65048 0.454529 9.09473C0.454529 11.539 0.465029 11.8457 0.508529 12.8057C0.658529 16.0742 2.47203 17.8907 5.74353 18.0407C6.70428 18.0842 7.01028 18.0947 9.45453 18.0947C11.8988 18.0947 12.2055 18.0842 13.1655 18.0407C16.431 17.8907 18.252 16.0772 18.3998 12.8057C18.444 11.8457 18.4545 11.539 18.4545 9.09473C18.4545 6.65048 18.444 6.34448 18.4005 5.38448C18.2535 2.11898 16.4378 0.299477 13.1663 0.149477C12.2055 0.105227 11.8988 0.0947266 9.45453 0.0947266V0.0947266ZM9.45453 4.47323C6.90228 4.47323 4.83303 6.54248 4.83303 9.09473C4.83303 11.647 6.90228 13.717 9.45453 13.717C12.0068 13.717 14.076 11.6477 14.076 9.09473C14.076 6.54248 12.0068 4.47323 9.45453 4.47323ZM9.45453 12.0947C7.79778 12.0947 6.45453 10.7522 6.45453 9.09473C6.45453 7.43798 7.79778 6.09473 9.45453 6.09473C11.1113 6.09473 12.4545 7.43798 12.4545 9.09473C12.4545 10.7522 11.1113 12.0947 9.45453 12.0947ZM14.259 3.21098C13.662 3.21098 13.1783 3.69473 13.1783 4.29098C13.1783 4.88723 13.662 5.37098 14.259 5.37098C14.8553 5.37098 15.3383 4.88723 15.3383 4.29098C15.3383 3.69473 14.8553 3.21098 14.259 3.21098Z"
                                fill="#F70075"
                              />
                            </svg>
                          </a>
                        </div>
                        <div className="mobile-nav-social">
                          <a href="#">
                            <svg
                              width="18"
                              height="15"
                              viewBox="0 0 18 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={hamburgerClickHandle}
                            >
                              <path
                                d="M17.4545 2.32255C16.8291 2.60022 16.1569 2.78722 15.4514 2.87151C16.1717 2.44014 16.7249 1.7566 16.9849 0.942012C16.3113 1.34151 15.5647 1.63193 14.7699 1.78847C14.1346 1.1106 13.2272 0.687012 12.2242 0.687012C9.9724 0.687012 8.31774 2.78793 8.82632 4.96889C5.92853 4.82368 3.3587 3.43535 1.63815 1.32522C0.724404 2.89276 1.16428 4.94339 2.71695 5.9818C2.14603 5.96339 1.6077 5.80685 1.13807 5.54547C1.09982 7.16118 2.25795 8.67276 3.93528 9.00922C3.4444 9.14239 2.90678 9.17355 2.35995 9.06872C2.80336 10.4542 4.09111 11.4622 5.61828 11.4905C4.15203 12.6401 2.3047 13.1537 0.454529 12.9355C1.99799 13.9251 3.83186 14.5023 5.80103 14.5023C12.2766 14.5023 15.9352 9.0333 15.7142 4.1281C16.3956 3.6358 16.987 3.02168 17.4545 2.32255Z"
                                fill="#1DA1F2"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <Hamburger
                  toggled={isHamburgerOpen}
                  toggle={setHamburgerOpen}
                  color={"hsla(204, 100%, 50%, 0.733)"}
                  direction="right"
                  size={25}
                  className="react-ham"
                />
              </motion.nav>
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
              <h3> Connect Wallet</h3>
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
            {ismetamask ? (
              <button
                onClick={() => {
                  if (ismetamask) {
                    if (wallet != 1) {
                      setwallet(1);
                      setConnecting(true);
                    } else {
                      setWalletToggle(false);
                    }
                  }
                }}
                disabled={Connecting}
                className="connectwallet_metamask display_none_metamask"
              >
                <h3>{ismetamask ? "MetaMask" : "Install Metamask"}</h3>
                {Connecting && wallet == 1 ? <h3>Connecting...</h3> : ""}
                {Connecting && wallet == 1 ? (
                  <div className="Wallet_loader">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="css-1p66nw2"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <img src={metamask} alt="portis" />
                )}{" "}
              </button>
            ) : (
              <a
                href="https://metamask.io/"
                className="connectwallet_metamask display_none_metamask"
                target="_blank"
              >
                <h3>{ismetamask ? "MetaMask" : "Install Metamask"}</h3>
                <img src={metamask} alt="portis" />
              </a>
            )}
            <button
              onClick={() => {
                if (wallet != 2) {
                  setwallet(2);
                  setConnecting(true);
                } else {
                  setWalletToggle(false);
                }
              }}
              disabled={Connecting}
              className="connectwallet_portis"
            >
              <h3>Portis</h3>
              {Connecting && wallet == 2 ? <h3>Connecting...</h3> : ""}
              {Connecting && wallet == 2 ? (
                <div className="Wallet_loader">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="css-1p66nw2"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              ) : (
                <img src={portis} alt="portis" />
              )}
            </button>
            <h3 className="new_eth">
              New to Ethereum?{" "}
              <a href="https://ethereum.org/en/wallets/" target="_blank">
                Learn more about wallets
              </a>
            </h3>
          </div>
        </div>
      ) : null}
    </>
  );
};

function WrongNetwork() {
  return (
    <div className="wrong_network">
      <div className="wrong_network_box">
        <div className="Wallet_loader">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="css-1p66nw2"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h3>Wrong Network</h3>
        <p>Change Network to polygon Mumbai Testnet</p>
      </div>
    </div>
  );
}
