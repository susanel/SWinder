import React from "react";
import kylo from "../assets/images/characters/kylo.jpg";
import rey from "../assets/images/characters/rey.jpg";
import l337 from "../assets/images/characters/l337.jpg";

const LoadingPage = ({ userSex, username }) => {
  const resolveUserSex = () => {
    if (userSex === "male") {
      return kylo;
    } else if (userSex === "female") {
      return rey;
    } else {
      return l337;
    }
  };

  return (
    <div className="loading">
      <div className="image-container">
        <img src={userSex !== "" ? resolveUserSex() : null} alt={username} />
      </div>
      <p>Looking for potential matches in your Universe</p>
    </div>
  );
};

export default LoadingPage;
