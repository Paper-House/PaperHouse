import React, { Component, Profiler } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/navbar/index";
import { Home } from "./components/home/index";
import { Explore } from "./components/explore/index";
import { Publish } from "./components/publish/index";
import { Paper } from "./components/paper/index";
import { Mypapers } from "./components/mypapers/index";
import Profile from "./components/profile/Profile";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/publish" component={Publish} />
          <Route path="/mypaper" component={Mypapers} />
          <Route path="/paper" component={Paper} />
          <Route path="/myprofile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}
