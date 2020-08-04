import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CardPage from "./CardPage";
import MatchesPage from "./MatchesPage";
import LoadingPage from "./LoadingPage";
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";

//user - a person looking for love in Swinder App
//character - SW character

const characterMessages = [
  "I have a big lightsaber and know how to use it...",
  "Have been looking for love in Alderaan places.",
  "Open-minded and wanting to explore",
];

class App extends Component {
  state = {
    users: [],
    likedUsers: [],
    filteredCharacters: [],
    nextUser: {},
    counter: 1,
    username: "",
    userSex: "",
    characterSex: "",
    isButtonDisabled: false,
    isLoadedAPI: false,
    isLoadedFilteredData: false,
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

        if (data.next) {
          //SWAPI delivers HTTP instead of HTTPS link that results with Mixed Content Error in browser, so I've replaced the link url
          console.log(data.next);

          let newAPI = data.next;
          newAPI = newAPI.replace("http", "https");
          this.getData(newAPI);
        } else {
          // setTimeout(() => {
          this.setState({
            isLoadedAPI: true,
          });
          // }, 6000);
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

  updateNextUser = (filteredCharacters) => {
    const number = Math.floor(Math.random() * filteredCharacters.length);
    // console.log(number);

    const nextUser = filteredCharacters[number];
    filteredCharacters.splice(number, 1);
    // console.log(nextUser);

    this.setState({
      nextUser,
      filteredCharacters,
    });
  };

  filterCharacters = (characterSex) => {
    // filteredCharacters
    // console.log(characterSex);
    const users = [...this.state.users];
    let filteredCharacters;
    // console.log(users);
    if (characterSex === "male" || characterSex === "female") {
      filteredCharacters = users.filter((user) => user.gender === characterSex);
      // console.log("inside", filteredCharacters);
    } else {
      filteredCharacters = users.filter(
        (user) => user.gender !== "female" && user.gender !== "male"
      );
      // console.log("inside", filteredCharacters);
    }

    this.updateNextUser(filteredCharacters);
    return filteredCharacters;
    // this.setState({
    //   filteredCharacters,
    // });
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

      if (this.state.filteredCharacters.length !== 0) {
        this.updateNextUser(this.state.filteredCharacters);
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        alert("No more Swinder users matching your search at the moment!");
      }
    }, 800);
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
      nextUser,
      userSex,
      username,
      likedUsers,
      isButtonDisabled,
      isLoadedAPI,
      isLoadedFilteredData,
      isMobile,
    } = this.state;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <main className="app">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <LoginPage
                  {...props}
                  isMobile={isMobile}
                  getFilteredData={this.getFilteredData}
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
                      nextUser={nextUser}
                      isMobile={isMobile}
                      isButtonDisabled={isButtonDisabled}
                      handleNextUser={this.handleNextUser}
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
                  likedUsers={likedUsers}
                  isMobile={isMobile}
                  username={username}
                  userSex={userSex}
                />
              )}
            />
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
