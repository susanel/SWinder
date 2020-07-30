import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_sm from "../assets/images/logo/logo26px.png";
import logo_md from "../assets/images/logo/logo.png";

const AboutUserInfo = ({ user, isActive }) => {
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

  const style = {
    marginRight: 8,
    width: 18,
    height: 18,
    verticalAlign: "middle",
    color: "#aaa",
  };

  return (
    <div className={componentClasses.join(" ")}>
      <div className="log-info">
        <div>
          <FontAwesomeIcon icon="map-marker-alt" style={style} />
          {user.numberKm} kilometers away
        </div>
        <div>
          <FontAwesomeIcon icon="clock" style={style} />
          Active: {user.numberMin} minutes ago
        </div>
      </div>
      <div className="pickup-line">
        <p>{user.message}</p>
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
    const { nextUser, isMobile } = this.props;

    return (
      <section className="card">
        <header className="logo">
          <FontAwesomeIcon
            className="swinder-icon"
            icon="fire-alt"
            size={isMobile ? "3x" : "5x"}
            color="#F1C40F"
          />
          <img src={isMobile ? logo_sm : logo_md} alt="Swinder logo" />
        </header>
        <article className="person">
          <div className="image-container">
            <img
              src={process.env.PUBLIC_URL + nextUser.imgPath}
              alt={nextUser.name}
            />
          </div>
          <div className="username">
            <strong>{nextUser.name}</strong>
            <span>
              {nextUser.birth_year !== "unknown" ? nextUser.birth_year : null}
            </span>
            <button onClick={this.handleShowUserInfo}>
              <FontAwesomeIcon
                className="info-icon"
                icon="info"
                style={{ fontSize: 22 }}
              />
            </button>
          </div>
          <AboutUserInfo isActive={this.state.isActive} user={nextUser} />
        </article>
      </section>
    );
  }
}

export default CardSection;
