import React from "react";
import img from "../assets/images/characters/kylo.jpg";

const LoadingPage = () => {
  return (
    <div className="loading">
      <div className="image-container">
        <img src={img} alt="Kylo Ren" />
      </div>
      <p>Looking for potential matches in your Universe</p>
    </div>
  );
};

export default LoadingPage;
