import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHeart,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const ControlSection = ({
  handleNextUser,
  handleShowMatches,
  isButtonDisabled,
}) => {
  const btns = [
    {
      className: "times",
      matchText: "nope",
      icon: faTimes,
      style: { width: 40, height: 40, color: "#EA6B4F" },
    },
    {
      className: "heart",
      matchText: "like",
      icon: faHeart,
      style: {
        width: 40,
        height: 40,
        color: "#76BF93",
      },
    },
  ];

  return (
    <div className="btns">
      {btns.map((btn, index) => (
        <button
          key={index}
          className={btn.className}
          disabled={isButtonDisabled}
          onClick={() => {
            handleNextUser(btn.matchText);
          }}
        >
          <FontAwesomeIcon icon={btn.icon} style={btn.style} />
        </button>
      ))}
      <button className="matches" onClick={handleShowMatches}>
        <FontAwesomeIcon
          icon={faUserFriends}
          style={{
            width: 30,
            height: 30,
            color: "#F1C40F",
            verticalAlign: "middle",
          }}
        />
      </button>
    </div>
  );
};

export default ControlSection;
