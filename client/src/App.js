import React, { Component, Profiler } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/navbar/index";
import { Home } from "./components/home/index";
import { Explore } from "./components/explore/index";
import { Publish } from "./components/publish/index";
import { Paper } from "./components/paper/index";
import { Mypapers } from "./components/mypapers/index";
import CountdownTimer from "./components/CountdownTimer";
import Profile from "./components/profile/Profile";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProfilePapers from "./components/ProfilePapers/ProfilePapers";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  return (
    <Router>
      <SkeletonTheme color="#1e5383" highlightColor="rgba(0, 151, 253,.4)">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Explore} />
          <Route path="/explore" component={Explore} />
          <Route path="/publish" component={Publish} />
          <Route path="/mypaper" component={Mypapers} />
          <Route path="/paper/:paperid" component={Paper} />
          <Route path="/myprofile" component={Profile} />
          <Route path="/profile" component={ProfilePapers} />
          <Route path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </SkeletonTheme>
    </Router>
  );
}
