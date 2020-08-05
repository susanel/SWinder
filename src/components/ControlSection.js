import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ControlSection = ({
  handleNextCharacter,
  isButtonDisabled,
  isMobile,
}) => {
  const btns = [
    {
      className: "times",
      matchText: "nope",
      icon: "times",
      style: isMobile
        ? { width: 34, height: 34, color: "#EA6B4F" }
        : { width: 40, height: 40, color: "#EA6B4F" },
    },
    {
      className: "heart",
      matchText: "like",
      icon: "heart",
      style: isMobile
        ? { width: 34, height: 34, color: "#76BF93" }
        : { width: 40, height: 40, color: "#76BF93" },
    },
  ];

  return (
    <section className="btns">
      {btns.map((btn, index) => (
        <button
          key={index}
          className={btn.className}
          disabled={isButtonDisabled}
          onClick={() => {
            handleNextCharacter(btn.matchText);
          }}
        >
          <FontAwesomeIcon icon={btn.icon} style={btn.style} />
        </button>
      ))}
      <Link to="/matches">
        <FontAwesomeIcon
          icon="user-friends"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </Link>
    </section>
  );
};

export default ControlSection;
