import React, { Component } from "react";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

class App extends Component {
  state = {
    person: {},
  };
  render() {
    return (
      <main className="app">
        <div className="logo">
          <img src={logo} alt="Star Wars logo" />
        </div>
        <Card />
        <div className="btns">
          <button className="times">
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: 40, height: 40, color: "#EA6B4F" }}
            />
          </button>
          <button className="heart">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: 40, height: 40, color: "#76BF93" }}
            />
          </button>
        </div>
      </main>
    );
  }
}

// <i class="fas fa-heart"></i>
// <i class="fas fa-times"></i>

export default App;
