import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingComponent = () => {
  const style = { color: "#F1C40F" };
  return (
    <div className="loading">
      <FontAwesomeIcon
        className="spinner"
        icon={faSpinner}
        pulse
        style={style}
        size="6x"
      />
    </div>
  );
};

export default LoadingComponent;
