import React from "react";
import kylo from "../assets/images/characters/kylo.jpg";
import rey from "../assets/images/characters/rey.jpg";
import l337 from "../assets/images/characters/l337.jpg";

const LoadingPage = ({ userSex }) => {
  console.log(userSex);
  console.log(typeof userSex);

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
        <img src={userSex !== "" ? resolveUserSex() : null} alt="Kylo Ren" />
      </div>
      <p>Looking for potential matches in your Universe</p>
    </div>
  );
};

export default LoadingPage;
