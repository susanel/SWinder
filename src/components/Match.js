import React from "react";

const Match = ({ name, imgPath }) => {
  return (
    <div className="match">
      <div className="image-container">
        <img src={process.env.PUBLIC_URL + imgPath} alt="user" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default Match;
