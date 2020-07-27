import React from "react";

const AboutUserInfo = ({ user, message }) => {
  const characterFeatures = [
    { title: "gender", feature: user.gender },
    { title: "homeworld", feature: user.homeworld },
    { title: "height", feature: user.height },
    { title: "weight", feature: user.mass },
    { title: "hair color", feature: user.hair_color },
    { title: "eye color", feature: user.eye_color },
  ];

  const info_divs = characterFeatures.map((item, i) => (
    <div key={i}>
      <strong>{item.title}: </strong>
      {item.feature}
    </div>
  ));

  return (
    <div className="about">
      <p>{message}</p>
      <div className="more-info">
        <p>Details:</p>
        {info_divs}
      </div>
    </div>
  );
};

const Card = ({ nextUser, nextUserLogInfo }) => {
  // console.log(nextUser.name);
  // console.log(nextUserLogInfo.imgPath);

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="char-img">
          <img src={nextUserLogInfo.imgPath} alt="" />
        </div>
        <div className="info">
          <div className="short-info">
            <span>{nextUser.name}</span>, <span>23</span>
          </div>
          <div className="log-info">
            <span>{nextUserLogInfo.numberKm} kilometers away</span>
            <span> Active: {nextUserLogInfo.numberMin} minutes ago</span>
          </div>
          <AboutUserInfo user={nextUser} message={nextUserLogInfo.message} />
        </div>
      </div>
    </div>
  );
};

export default Card;
