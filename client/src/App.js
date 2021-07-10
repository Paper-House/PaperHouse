import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/navbar/Navbar";

class App extends Component {
  componentDidMount = async () => {
    console.log("Component Mounted.");
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="container"></div>
      </>
    );
  }
}

export default App;
