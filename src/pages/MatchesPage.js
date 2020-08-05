import React from "react";
import Match from "../components/Match";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo2_sm from "../assets/images/logo/logo28px.png";
import logo2_md from "../assets/images/logo/logo65px.png";
import kylo from "../assets/images/characters/kylo.jpg";
import rey from "../assets/images/characters/rey.jpg";
import l337 from "../assets/images/characters/l337.jpg";

const MatchesPage = ({ likedCharacters, isMobile, username, userSex }) => {
  const users = likedCharacters.map((user, i) => (
    <Match key={i} imgPath={user.imgPath} name={user.name} />
  ));

  const noMatchesMessage = (
    <div className="no-matches">
      <p>You have 0 matches at the moment.</p>
      <p>Give more "likes" to get laid in the Universum.</p>
    </div>
  );

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
    <>
      <div className="matches-container">
        <Link to="/card" className="back">
          <FontAwesomeIcon
            className="arrow-icon"
            icon="long-arrow-alt-left"
            size={isMobile ? "3x" : "4x"}
          />
        </Link>

        <div className="logo">
          <img src={isMobile ? logo2_sm : logo2_md} alt="Swinder logo" />
        </div>

        <div className="matches">
          <div className="my-profile">
            <h2>My profile</h2>
            <div className="image-container">
              <img
                src={userSex !== "" ? resolveUserSex() : null}
                alt="Kylo Ren"
              />
            </div>
            <h3>{username}</h3>
          </div>
          <h1> My matches </h1>
          {likedCharacters.length === 0 ? noMatchesMessage : users}
        </div>
      </div>
    </>
  );
};

export default MatchesPage;
