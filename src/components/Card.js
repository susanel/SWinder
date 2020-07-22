import React from "react";
import characterImg from "../assets/characters/1.jpg";

const Card = () => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="char-img">
          <img src={characterImg} alt="" />
        </div>
        <div className="info">
          <div className="short-info">
            <span>Luke</span>, <span>23</span>
          </div>
          <div className="log-info">
            <span>3 kilometers away </span>
            <span>Active: 19 minutes ago</span>
          </div>
          <div className="about">
            <p>I have a big lightsaber and know how to use it...</p>
            <p>Have been looking for love in Alderaan places</p>
            <p>Open-minded and wanting to explore</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
