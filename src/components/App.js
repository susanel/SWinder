// TO DO
// 1. znależź sposób, aby homeworld sie poprawnie wyswietlalo
// 2. Zablokowac klikanie w kolejna postać gdy juz raz sie kliknelo //done
// 3. Wyswietlenie matcha
// 4. Wyświetlenie wszystkich matchy //done
// 5. Obrazki powinno si trzymac w /src - jes to dobra praktyka, znalezc na to sposob bo na razie nei wiem jaka podac sciezke (+ background w  SaSS pobiera plik z /src, a <img> z Reacta pobiera z /public)
// 6. Pokazywanie 10 matchy, nastepne na kolejnej stronie
// 7. Ewentualnie wyświetlac jeszcze gatunek
// 8. Wyświetlać randomowo wiek użytkownika

import React, { Component } from "react";

import CardSection from "./CardSection";
import ControlSection from "./ControlSection";
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
    nextUserLogInfo: {},
    counter: 0,
    showMatches: false,
    isButtonDisabled: false,
    isLoaded: false,
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
          };

          if (this.state.users.length === 1) {
            //gets data once "users" array got filled
            const nextUser = this.state.users[0];
            const nextUserLogInfo = this.generateNextUser(0);
            this.setState({
              nextUser,
              nextUserLogInfo,
            });
          }

          return this.setState((prevState) => ({
            users: [...prevState.users, user],
          }));
        });

        if (data.next) {
          //SWAPI delivers HTTP instead of HTTPS link that results with Mixed Content Error in browser, so I've replaced the link url
          let newAPI = data.next;
          newAPI = newAPI.replace("http", "https");
          this.getData(newAPI);
          console.log(data.next);
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
    const { users, counter, nextUserLogInfo } = this.state;
    const user = {
      likedUser: users[counter],
      imgPath: nextUserLogInfo.imgPath,
    };
    this.setState((prevState) => ({
      likedUsers: [...prevState.likedUsers, user],
    }));
  };

  getImgPath = (counter) => {
    const imgPath = `/assets/images/characters/${++counter}.jpg`;
    return imgPath;
  };

  getMessage = () => {
    const number = Math.floor(Math.random() * characterMessages.length);
    const message = characterMessages[number];
    return message;
  };

  generateNextUser = (counter) => {
    const nextUserLogInfo = {
      imgPath: this.getImgPath(counter),
      message: this.getMessage(),
      numberKm: Math.floor(Math.random() * 21),
      numberMin: Math.floor(Math.random() * 60),
    };
    return nextUserLogInfo;
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

      let counter = this.state.counter;
      counter++;

      if (counter < this.state.users.length) {
        const nextUserLogInfo = this.generateNextUser(counter);

        this.setState({
          counter,
          nextUser: this.state.users[counter],
          nextUserLogInfo,
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

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      showMatches,
      nextUser,
      nextUserLogInfo,
      isButtonDisabled,
      likedUsers,
      isLoaded,
    } = this.state;

    return (
      <>
        {isLoaded ? (
          <main className="app">
            {showMatches ? (
              <MatchesPage
                likedUsers={likedUsers}
                handleShowMatches={this.handleShowMatches}
              />
            ) : (
              <div className="card-wrap">
                <CardSection
                  nextUser={nextUser}
                  nextUserLogInfo={nextUserLogInfo}
                />
                <ControlSection
                  handleNextUser={this.handleNextUser}
                  handleShowMatches={this.handleShowMatches}
                  isButtonDisabled={isButtonDisabled}
                />
              </div>
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
