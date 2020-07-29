import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../assets/images/logo/logo65px.png";

const Match = ({ imgPath, user }) => {
  return (
    <div className="match">
      <div className="image-container">
        <img src={process.env.PUBLIC_URL + imgPath} alt="user" />
      </div>
      <h2>{user.name}</h2>
    </div>
  );
};

const MatchesPage = ({ likedUsers, handleShowMatches }) => {
  const users = likedUsers.map((user, i) => (
    <Match key={i} imgPath={user.imgPath} user={user.likedUser} />
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
        <div className="logo">
          <button onClick={handleShowMatches}>
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              style={{ width: 50, height: 40, color: "F1C40F" }}
            />
          </button>
          <img src={logo2} alt="Swinder logo" />
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
