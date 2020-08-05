import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterInfoSection = ({ character, handleShowUserInfo, isActive }) => {
  const componentClasses = ["about"];
  if (isActive) {
    componentClasses.push("show");
  }

  const characterFeatures = [
    { title: "gender", feature: character.gender },
    { title: "height", feature: character.height },
    { title: "weight", feature: character.mass },
    { title: "hair color", feature: character.hair_color },
    { title: "eye color", feature: character.eye_color },
  ];

  const info_divs = characterFeatures.map((item, i) => (
    <div key={i} className="feature">
      <strong>{item.title}: </strong>
      <span>{item.feature}</span>
    </div>
  ));

  const style = {
    marginRight: 8,
    width: 18,
    height: 18,
    verticalAlign: "middle",
    color: "#aaa",
  };

  return (
    <section className={componentClasses.join(" ")}>
      <div className="username">
        <strong>{character.name}</strong>
        <span>
          {character.birth_year !== "unknown" ? character.birth_year : null}
        </span>
        <button onClick={handleShowUserInfo}>
          <FontAwesomeIcon icon="info" style={{ fontSize: 22 }} />
        </button>
      </div>
      <div className="log-info">
        <div>
          <FontAwesomeIcon icon="map-marker-alt" style={style} />
          {character.numberKm} kilometers away
        </div>
        <div>
          <FontAwesomeIcon icon="clock" style={style} />
          Active: {character.numberMin} minutes ago
        </div>
      </div>
      <div className="pickup-line">
        <p>{character.message}</p>
      </div>
      <div className="features">{info_divs}</div>
    </section>
  );
};

export default CharacterInfoSection;
