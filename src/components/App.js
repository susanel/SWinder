// TO DO
// 1. znależź sposób, aby homeworld sie poprawnie wyswietlalo
// 2. Zablokowac klikanie w kolejna postać gdy juz raz sie kliknelo //done
// 3. Wyswietlenie matcha
// 4. Wyświetlenie wszystkich matchy //done
// 5. Obrazki powinno si trzymac w /src - jes to dobra praktyka, znalezc na to sposob bo na razie nei wiem jaka podac sciezke
// 6. Pokazywanie 10 matchy, nastepne na kolejnej stronie

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
    error: "",
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
          throw Error("Strona nie została odnaleziona");
        } else if (!response.ok && response.status === 500) {
          console.log("Wewnętrzny błąd serwera");
        }
        throw Error("Nie udało się");
      })
      .then((data) => {
        // Używamy części danych z API
        data.results.map((person) => {
          const user = {
            name: person.name,
            height: person.height,
            mass: person.mass,
            hair_color: person.hair_color,
            eye_color: person.eye_color,
            gender: person.gender,
            // homeworld,
            // species: person.species,
          };

          if (this.state.users.length === 1) {
            //Te dane che wyswietlic tylko raz gdy juz wszystkie postacie zostana wrzucone do tablicy
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
          this.getData(data.next);
        } else {
          console.log("No more data to get --- ", data.next);
          setTimeout(() => {
            this.setState({
              isLoaded: true,
            });
          }, 0); //6000
        }
      })
      .catch((error) => console.log(error));
  };

  addNewMatch = () => {
    const { users, counter, nextUserLogInfo } = this.state;
    // console.log("dodaje nowa postac");
    const user = {
      likedUser: users[counter],
      imgPath: nextUserLogInfo.imgPath,
    };

    return this.setState((prevState) => ({
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
    // const newUser
    const nextUserLogInfo = {
      imgPath: this.getImgPath(counter),
      message: this.getMessage(),
      numberKm: Math.floor(Math.random() * 21),
      numberMin: Math.floor(Math.random() * 60),
    };
    return nextUserLogInfo;
  };

  handleNextUser = (isMatch) => {
    const { users } = this.state;

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

      if (counter < users.length) {
        //przygotowuje dane do wyswietlenia kolejnego user'a
        const nextUserLogInfo = this.generateNextUser(counter);

        this.setState({
          counter,
          nextUser: users[counter],
          nextUserLogInfo,
          isButtonDisabled: false,
        });
      } else {
        // console.log("brak postaci", counter, this.state.users[counter]);
        alert("Brak postaci do wyświetlenia");
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
      // users,
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
              <>
                <CardSection
                  nextUser={nextUser}
                  nextUserLogInfo={nextUserLogInfo}
                />
                <ControlSection
                  handleNextUser={this.handleNextUser}
                  handleShowMatches={this.handleShowMatches}
                  isButtonDisabled={isButtonDisabled}
                />
              </>
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
