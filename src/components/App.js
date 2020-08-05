import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CardPage from "../pages/CardPage";
import MatchesPage from "../pages/MatchesPage";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";

const characterMessages = [
  "I have a big lightsaber and know how to use it...",
  "Have been looking for love in Alderaan places.",
  "Open-minded and wanting to explore",
];

class App extends Component {
  state = {
    characters: [],
    likedCharacters: [],
    filteredCharacters: [],
    nextCharacter: {},
    username: "",
    userSex: "",
    characterSex: "",
    isButtonDisabled: false,
    isLoadedAPI: false,
    isLoadedFilteredData: false,
    isMobile: false,
    counter: 1,
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
          const character = {
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
            characters: [...prevState.characters, character],
          }));
        });

        if (data.next) {
          //SWAPI delivers HTTP instead of HTTPS link that results with Mixed Content Error in browser, so I've replaced the link url
          console.log(data.next);

          let newAPI = data.next;
          newAPI = newAPI.replace("http", "https");
          this.getData(newAPI);
        } else {
          this.setState({
            isLoadedAPI: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  getFilteredData = (username, userSex, characterSex) => {
    const filteredCharacters = this.filterCharacters(characterSex);
    setTimeout(() => {
      this.setState({
        isLoadedFilteredData: true,
      });
    }, 8000);
    this.setState({
      username,
      userSex,
      characterSex,
      filteredCharacters,
    });
  };

  addNewMatch = () => {
    const likedCharacter = this.state.nextCharacter;
    this.setState((prevState) => ({
      likedCharacters: [...prevState.likedCharacters, likedCharacter],
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

  updateNextCharacter = (filteredCharacters) => {
    const number = Math.floor(Math.random() * filteredCharacters.length);

    const nextCharacter = filteredCharacters[number];
    filteredCharacters.splice(number, 1);

    this.setState({
      nextCharacter,
      filteredCharacters,
    });
  };

  filterCharacters = (characterSex) => {
    const characters = [...this.state.characters];
    let filteredCharacters;
    if (characterSex === "male" || characterSex === "female") {
      filteredCharacters = characters.filter(
        (user) => user.gender === characterSex
      );
    } else {
      filteredCharacters = characters.filter(
        (user) => user.gender !== "female" && user.gender !== "male"
      );
    }

    this.updateNextCharacter(filteredCharacters);
    return filteredCharacters;
  };

  handleNextCharacter = (isMatch) => {
    const img_div = document.querySelector(".image-container");
    const about_div = document.querySelector(".about");
    about_div.classList.remove("show");

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

      if (this.state.filteredCharacters.length !== 0) {
        this.updateNextCharacter(this.state.filteredCharacters);
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        alert("No more Swinder users matching your search at the moment!");
      }
    }, 900);
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
      nextCharacter,
      userSex,
      username,
      likedCharacters,
      isButtonDisabled,
      isLoadedAPI,
      isLoadedFilteredData,
      isMobile,
    } = this.state;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="app">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <LoginPage
                  {...props}
                  getFilteredData={this.getFilteredData}
                  username={username}
                  isMobile={isMobile}
                />
              )}
            />
            <Route
              path="/card"
              render={(props) => {
                if (isLoadedAPI && isLoadedFilteredData) {
                  return (
                    <CardPage
                      {...props}
                      nextCharacter={nextCharacter}
                      isMobile={isMobile}
                      isButtonDisabled={isButtonDisabled}
                      handleNextCharacter={this.handleNextCharacter}
                    />
                  );
                } else {
                  return <LoadingPage {...props} userSex={userSex} />;
                }
              }}
            />
            <Route
              path="/matches"
              render={(props) => (
                <MatchesPage
                  {...props}
                  likedCharacters={likedCharacters}
                  isMobile={isMobile}
                  username={username}
                  userSex={userSex}
                />
              )}
            />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
