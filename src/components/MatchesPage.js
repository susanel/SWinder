import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo2_sm from "../assets/images/logo/logo28px.png";
import logo2_md from "../assets/images/logo/logo65px.png";

const Match = ({ name, imgPath }) => {
  return (
    <div className="match">
      <div className="image-container">
        <img src={process.env.PUBLIC_URL + imgPath} alt="user" />
      </div>
      <h2>{name}</h2>
    </div>
  );
};

const MatchesPage = ({ likedUsers, handleShowMatches, isMobile }) => {
  const users = likedUsers.map((user, i) => (
    <Match key={i} imgPath={user.imgPath} name={user.name} />
  ));

  const noMatchesMessage = (
    <div className="no-matches">
      <p>You have 0 matches at the moment.</p>
      <p>Give more "likes" to get laid in the Universum.</p>
    </div>
  );

  const style = isMobile
    ? { width: 40, height: 30, color: "F1C40F" }
    : { width: 50, height: 40, color: "F1C40F" };

  return (
    <>
      <div className="matches-container">
        <div className="logo">
          <button onClick={handleShowMatches}>
            <FontAwesomeIcon icon="long-arrow-alt-left" style={style} />
          </button>
          <img src={isMobile ? logo2_sm : logo2_md} alt="Swinder logo" />
        </div>

        <div className="matches">
          <h1>Your matches</h1>
          {likedUsers.length === 0 ? noMatchesMessage : users}
        </div>
      </div>
    </>
  );
};

export default MatchesPage;
