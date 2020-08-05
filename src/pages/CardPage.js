import React from "react";
import CharacterInfoSection from "../components/CharacterInfoSection";
import ControlSection from "../components/ControlSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_sm from "../assets/images/logo/logo26px.png";
import logo_md from "../assets/images/logo/logo.png";

class CardPage extends React.Component {
  state = { isActive: false };

  handleShowUserInfo = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const {
      nextCharacter,
      isMobile,
      isButtonDisabled,
      handleNextCharacter,
    } = this.props;

    return (
      <div className="card-wrap">
        <main className="card">
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
                src={process.env.PUBLIC_URL + nextCharacter.imgPath}
                alt={nextCharacter.name}
              />
            </div>
            <CharacterInfoSection
              handleShowUserInfo={this.handleShowUserInfo}
              character={nextCharacter}
              isActive={this.state.isActive}
            />
          </article>
        </main>
        <ControlSection
          handleNextCharacter={handleNextCharacter}
          isButtonDisabled={isButtonDisabled}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

export default CardPage;
