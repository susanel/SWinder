import React from "react";
import yoda from "../assets/images/characters/19.jpg";

const ErrorPage = () => {
  return (
    <div className="error">
      <p className="big">Ocurred, a 404 error has...</p>
      <div className="image-container">
        <img src={yoda} alt="Yoda" />
      </div>
      <p>
        The dark side I sense in you. Due to disturbance in the force I couldn't
        find the page you were looking for.
      </p>
    </div>
  );
};

export default ErrorPage;
