import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

const MatchesPage = ({ likedUsers, isMobile }) => {
  const users = likedUsers.map((user, i) => (
    <Match key={i} imgPath={user.imgPath} name={user.name} />
  ));

  const noMatchesMessage = (
    <div className="no-matches">
      <p>You have 0 matches at the moment.</p>
      <p>Give more "likes" to get laid in the Universum.</p>
    </div>
  );

  return (
    <>
      <div className="matches-container">
        <Link to="/card">
          <button className="back">
            <FontAwesomeIcon
              className="arrow-icon"
              icon="long-arrow-alt-left"
              size={isMobile ? "3x" : "4x"}
            />
          </button>
        </Link>

        <div className="logo">
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
