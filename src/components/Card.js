import React from "react";

const characterMessages = [
  "I have a big lightsaber and know how to use it...",
  "Have been looking for love in Alderaan places.",
  "Open-minded and wanting to explore",
];

const AboutUserInfo = ({ user }) => {
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

  const getMessage = () => {
    const number = Math.floor(Math.random() * characterMessages.length);
    const message = characterMessages[number];
    return message;
  };

  return (
    <div className="about">
      <p>{getMessage()}</p>
      <div className="more-info">
        <p>Details:</p>
        {info_divs}
      </div>
    </div>
  );
};

const Card = ({ user, imgPath }) => {
  const getRandomNumber = (unit) => {
    const numberKm = Math.floor(Math.random() * 21);
    const numberMin = Math.floor(Math.random() * 60);

    if (unit === "km") {
      return numberKm;
    } else if (unit === "min") {
      return numberMin;
    }
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="char-img">
          <img src={imgPath} alt="" />
        </div>
        <div className="info">
          <div className="short-info">
            <span>{user.name}</span>, <span>23</span>
          </div>
          <div className="log-info">
            <span>{getRandomNumber("km")} kilometers away</span>
            <span> Active: {getRandomNumber("min")} minutes ago</span>
          </div>
          <AboutUserInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default Card;
