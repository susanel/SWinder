import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt, faInfo } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo/logo.png";

const AboutUserInfo = ({ user, nextUserLogInfo, isActive }) => {
  const componentClasses = ["about"];
  if (isActive) {
    componentClasses.push("show");
  }

  const characterFeatures = [
    { title: "gender", feature: user.gender },
    { title: "height", feature: user.height },
    { title: "weight", feature: user.mass },
    { title: "hair color", feature: user.hair_color },
    { title: "eye color", feature: user.eye_color },
  ];

  const info_divs = characterFeatures.map((item, i) => (
    <div key={i} className="feature">
      <strong>{item.title}: </strong>
      <span>{item.feature}</span>
    </div>
  ));

  return (
    <div className={componentClasses.join(" ")}>
      <div className="log-info">
        <span>{nextUserLogInfo.numberKm} kilometers away</span>
        <span> Active: {nextUserLogInfo.numberMin} minutes ago</span>
      </div>
      <div className="pickup-line">
        <p>{nextUserLogInfo.message}</p>
      </div>
      <div className="features">{info_divs}</div>
    </div>
  );
};

class CardSection extends React.Component {
  state = { isActive: false };

  handleShowUserInfo = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const { nextUser, nextUserLogInfo } = this.props;

    return (
      <section className="card">
        <header className="logo">
          <FontAwesomeIcon
            className="swinder-icon"
            icon={faFireAlt}
            size="5x"
            color="#F1C40F"
          />
          <img src={logo} alt="Swinder logo" />
        </header>
        <div className="person">
          <div className="image-container">
            <img
              src={process.env.PUBLIC_URL + nextUserLogInfo.imgPath}
              alt={nextUser.name}
            />
          </div>
          <div className="username">
            <strong>{nextUser.name}</strong>
            <span>23</span>
            <button onClick={this.handleShowUserInfo}>
              <FontAwesomeIcon
                className="info-icon"
                icon={faInfo}
                style={{ fontSize: 20 }}
              />
            </button>
          </div>
          <AboutUserInfo
            isActive={this.state.isActive}
            user={nextUser}
            nextUserLogInfo={nextUserLogInfo}
          />
        </div>
      </section>
    );
  }
}

export default CardSection;
