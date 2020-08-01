import React, { Component } from "react";

import CardPage from "./CardPage";
import MatchesPage from "./MatchesPage";
import LoadingPage from "./LoadingPage";

const characterMessages = [
  "I have a big lightsaber and know how to use it...",
  "Have been looking for love in Alderaan places.",
  "Open-minded and wanting to explore",
];

class App extends Component {
  state = {
    users: [],
    likedUsers: [],
    nextUser: {},
    counter: 1,
    showMatches: false,
    isButtonDisabled: false,
    isLoaded: false,
    isMobile: false,
  };

  getData = (API = `https://swapi.dev/api/people/`) => {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (!response.ok && response.status === 404) {
          throw Error("The page has not been found");
        } else if (!response.ok && response.status === 500) {
          throw Error("Internal server error");
        }
        throw Error("Unknon Error");
      })
      .then((data) => {
        data.results.map((person) => {
          const user = {
            name: person.name,
            height: person.height,
            birth_year: person.birth_year,
            mass: person.mass,
            hair_color: person.hair_color,
            eye_color: person.eye_color,
            gender: person.gender,
            imgPath: this.getImgPath(),
            message: this.getMessage(),
            numberKm: Math.floor(Math.random() * 21),
            numberMin: Math.floor(Math.random() * 60),
          };

          return this.setState((prevState) => ({
            users: [...prevState.users, user],
          }));
        });

        if (!data.previous) {
          //gets data once "users" array got filled with first fetch()
          this.updateNextUser();
        }

        if (data.next) {
          //SWAPI delivers HTTP instead of HTTPS link that results with Mixed Content Error in browser, so I've replaced the link url
          let newAPI = data.next;
          newAPI = newAPI.replace("http", "https");
          this.getData(newAPI);
        } else {
          setTimeout(() => {
            this.setState({
              isLoaded: true,
            });
          }, 6000);
        }
      })
      .catch((error) => console.log(error));
  };

  addNewMatch = () => {
    const likedUser = this.state.nextUser;
    this.setState((prevState) => ({
      likedUsers: [...prevState.likedUsers, likedUser],
    }));
  };

  getImgPath = () => {
    let counter = this.state.counter;
    const imgPath = `/assets/images/characters/${counter}.jpg`;
    counter++;

    this.setState({
      counter,
    });
    return imgPath;
  };

  getMessage = () => {
    const number = Math.floor(Math.random() * characterMessages.length);
    const message = characterMessages[number];
    return message;
  };

  updateNextUser = () => {
    const number = Math.floor(Math.random() * this.state.users.length);
    let users = [...this.state.users];
    const nextUser = users[number];
    users.splice(number, 1);

    this.setState({
      nextUser,
      users,
    });
  };

  handleNextUser = (isMatch) => {
    const img_div = document.querySelector(".image-container");

    if (isMatch === "like") {
      img_div.classList.add("like");
      this.addNewMatch();
    } else if (isMatch === "nope") {
      img_div.classList.add("nope");
    }

    this.setState({
      isButtonDisabled: true,
    });

    setTimeout(() => {
      img_div.classList.remove("like");
      img_div.classList.remove("nope");

      if (this.state.users.length !== 0) {
        this.updateNextUser();
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        alert("No more Swinder users at the moment!");
      }
    }, 800);
  };

  handleShowMatches = () => {
    this.setState({
      showMatches: !this.state.showMatches,
    });
  };

  handleWindowResize = () => {
    if (window.innerWidth < 768 && !this.state.isMobile) {
      this.setState({
        isMobile: true,
      });
    } else if (window.innerWidth >= 768 && this.state.isMobile) {
      this.setState({
        isMobile: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  render() {
    const {
      showMatches,
      nextUser,
      isButtonDisabled,
      likedUsers,
      isLoaded,
      isMobile,
    } = this.state;

    return (
      <>
        {isLoaded ? (
          <main className="app">
            {showMatches ? (
              <MatchesPage
                likedUsers={likedUsers}
                handleShowMatches={this.handleShowMatches}
                isMobile={isMobile}
              />
            ) : (
              <CardPage
                nextUser={nextUser}
                isMobile={isMobile}
                isButtonDisabled={isButtonDisabled}
                handleNextUser={this.handleNextUser}
                handleShowMatches={this.handleShowMatches}
              />
            )}
          </main>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }
}

export default App;
