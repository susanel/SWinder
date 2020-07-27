// TO DO
// 1. znależź sposób, aby homeworld sie poprawnie wyswietlalo
// 2. Zablokowac klikanie w kolejna postać gdy juz raz sie kliknelo
// 3. Wyswietlenie matcha
// 4. Wyświetlenie wszystkich matchy
// 5. Obrazki powinno si trzymac w /src - jes to dobra praktyka, znalezc na to sposob bo na razie nei wiem jaka podac sciezke

import React, { Component } from "react";
// import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";
import Matches from "./Matches";
import LoadingComponent from "./LoadingComponent";

const characterMessages = [
  "I have a big lightsaber and know how to use it...",
  "Have been looking for love in Alderaan places.",
  "Open-minded and wanting to explore",
];

const Buttons = ({ handleNextUser, isButtonDisabled }) => {
  const btns = [
    {
      className: "times",
      matchText: "nope",
      icon: faTimes,
      style: { width: 40, height: 40, color: "#EA6B4F" },
    },
    {
      classname: "heart",
      matchText: "like",
      icon: faHeart,
      style: { width: 40, height: 40, color: "#76BF93" },
    },
  ];

  return (
    <div className="btns">
      {btns.map((btn, index) => (
        <button
          key={index}
          className={btn.className}
          disabled={isButtonDisabled}
          onClick={() => {
            handleNextUser(btn.matchText);
          }}
        >
          <FontAwesomeIcon icon={btn.icon} style={btn.style} />
        </button>
      ))}
    </div>
  );
};

class App extends Component {
  state = {
    users: [],
    likedUsers: [],
    nextUser: {},
    nextUserLogInfo: {},
    counter: 0,
    error: "",
    usersEnd: false,
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
          this.setState({
            isLoaded: true,
          });
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

    const img_div = document.querySelector(".char-img");

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
        this.setState({
          usersEnd: true,
        });
      }
    }, 800);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      // users,
      usersEnd,
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
            <div className="logo">
              <img src="/assets/images/logo/logo.png" alt="Star Wars logo" />
            </div>
            {usersEnd ? (
              <Matches likedUsers={likedUsers} />
            ) : (
              <>
                <Card nextUser={nextUser} nextUserLogInfo={nextUserLogInfo} />
                <Buttons
                  handleNextUser={this.handleNextUser}
                  isButtonDisabled={isButtonDisabled}
                />
              </>
            )}
          </main>
        ) : (
          <LoadingComponent />
        )}
      </>
    );
  }
}

export default App;
