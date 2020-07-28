import React from "react";

const LoadingPage = () => {
  return (
    <div className="loading">
      <div className="image-container">
        <img src="/assets/images/characters/kylo.jpg" alt="Kylo Ren" />
      </div>
      <p>Looking for potential matches in your Universe</p>
    </div>
  );
};

export default LoadingPage;
