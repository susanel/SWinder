import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_sm from "../assets/images/logo/logo26px.png";
import logo_md from "../assets/images/logo/logo.png";

class LoginPage extends React.Component {
  state = {
    username: "",
    userSex: "",
    characterSex: "",
    checkedUserRadio: [false, false, false],
    checkedCharacterRadio: [false, false, false],
  };

  btns = [
    {
      icon: "male",
      spanText: "Male",
    },
    {
      icon: "female",
      spanText: "Female",
    },
    {
      icon: "robot",
      spanText: "Other",
    },
  ];

  formValidation = () => {
    let username = false;
    let userSex = false;
    let characterSex = false;
    let correct = false;

    if (this.state.username.length >= 3 && this.state.username.length <= 20) {
      username = true;
    }

    if (this.state.userSex) {
      userSex = true;
    }

    if (this.state.characterSex) {
      characterSex = true;
    }

    if (username && userSex && characterSex) {
      correct = true;
    }

    return { username, userSex, characterSex, correct };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.formValidation();
    if (validation.correct) {
      document.querySelector(".login button").classList.add("hide");
      document.querySelector(".login a.find-match").classList.remove("hide");
    } else if (!validation.username) {
      alert("The name should be between 3 and 20 characters long. Try again!");
    } else if (!validation.userSex || !validation.characterSex) {
      alert("You have forgotten to choose gender");
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    if (type === "text") {
      this.setState({
        username: value,
      });
    } else if (type === "radio") {
      const checkedUserRadio = this.state.checkedUserRadio;
      const checkedCharacterRadio = this.state.checkedCharacterRadio;
      const checked = [checkedUserRadio, checkedCharacterRadio];
      let checkedIndex;

      if (name === "userSex") {
        checkedIndex = 0;
      } else if (name === "characterSex") {
        checkedIndex = 1;
      }

      switch (value) {
        case "male":
          checked[checkedIndex] = [true, false, false];
          break;
        case "female":
          checked[checkedIndex] = [false, true, false];
          break;
        case "robot":
          checked[checkedIndex] = [false, false, true];
          break;
        default:
      }

      this.setState({
        [name]: e.target.value,
        checkedUserRadio: checked[0],
        checkedCharacterRadio: checked[1],
      });
    }
  };

  handleAddStyle = () => {
    document.querySelector(".floating-label").classList.add("filled");
  };

  handleRemoveStyle = () => {
    document.querySelector(".floating-label").classList.remove("filled");
  };

  render() {
    return (
      <section className="login">
        <header className="logo">
          <FontAwesomeIcon
            className="swinder-icon"
            icon="fire-alt"
            size={this.props.isMobile ? "3x" : "5x"}
            color="#F1C40F"
          />
          <img
            src={this.props.isMobile ? logo_sm : logo_md}
            alt="Swinder logo"
          />
        </header>
        <h1>Start your love journey by answering few questions</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="floating-label">
            <input
              type="text"
              id="name"
              name="username"
              value={this.state.username}
              required
              onFocus={this.handleAddStyle}
              onBlur={this.handleRemoveStyle}
              onChange={this.handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="user-gender">
            <p>Choose your gender</p>
            {this.btns.map((btn, i) => (
              <div className="radio-container" key={i}>
                <input
                  type="radio"
                  name="userSex"
                  id={"user-" + btn.icon}
                  value={btn.icon}
                  onChange={this.handleChange}
                  checked={this.state.checkedUserRadio[i]}
                />
                <label htmlFor={"user-" + btn.icon} className="gender">
                  <FontAwesomeIcon icon={btn.icon} size="2x" color="#1A1A1A" />
                  <span>{btn.spanText}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="character-gender">
            <p>You are interested in: </p>
            {this.btns.map((btn, i) => (
              <div className="radio-container" key={i}>
                <input
                  type="radio"
                  name="characterSex"
                  id={"character-" + btn.icon}
                  value={btn.icon}
                  onChange={this.handleChange}
                  checked={this.state.checkedCharacterRadio[i]}
                />
                <label htmlFor={"character-" + btn.icon} className="gender">
                  <FontAwesomeIcon icon={btn.icon} size="2x" color="#1A1A1A" />
                  <span>{btn.spanText}</span>
                </label>
              </div>
            ))}
          </div>
          <button>Submit</button>
          <Link to="/card" className="find-match hide">
            Find match
          </Link>
        </form>
      </section>
    );
  }
}

export default LoginPage;
