import React from "react";

const Match = ({ imgPath, user }) => {
  return (
    <div className="match">
      <div className="liked-char-img">
        <img src={imgPath} alt="user" />
      </div>
      <h2>{user.name}</h2>
    </div>
  );
};

const Matches = ({ likedUsers }) => {
  return (
    <div className="matches-container">
      <h1>Your matches</h1>
      <div className="matches">
        {likedUsers.map((user, i) => (
          <Match key={i} imgPath={user.imgPath} user={user.likedUser} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
