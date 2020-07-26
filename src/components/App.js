// TO DO
// 1. znależź sposób, aby homeworld sie poprawnie wyswietlalo
// 2. Zablokowac klikanie w kolejna postać gdy juz raz sie kliknelo
// 3. Wyswietlenie matcha
// 4. Wyświetlenie wszystkich matchy

import React, { Component } from "react";
// import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";
import Matches from "./Matches";

const Buttons = ({ handleCharacterChange, isButtonDisabled }) => {
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
            handleCharacterChange(btn.matchText);
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
    userOnDisplay: "",
    imgPath: "",
    counter: 0,
    error: "",
    usersEnd: false,
    isButtonDisabled: false,
  };

  getData = () => {
    const API = `https://swapi.dev/api/people/`;

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
        // data.results.map((person) => {
        //   const user = {
        //     name: person.name,
        //     height: person.height,
        //     mass: person.mass,
        //     hair_color: person.hair_color,
        //     eye_color: person.eye_color,
        //     gender: person.gender,
        //     homeworld: person.homeworld,
        //     species: person.species,
        //   };

        //   return this.setState((prevState) => ({
        //     users: [...prevState.users, user],
        //   }));
        // });

        //Używamy wszystkich danych z API
        this.setState((prevState) => ({
          users: [...prevState.users, ...data.results],
          userOnDisplay: data.results[this.state.counter],
        }));
      })
      .catch((error) => console.log(error));
  };

  addLikedUser = (likedUser, imgPath) => {
    const user = { likedUser: likedUser, imgPath: imgPath };
    return this.setState((prevState) => ({
      likedUsers: [...prevState.likedUsers, user],
    }));
  };

  getImgPath = (counter) => {
    // const imgPath = `/assets/images/characters/${++counter}.jpg`;
    const imgPath = `/assets/images/characters/${++counter}.jpg`;

    this.setState({
      imgPath,
    });
  };

  handleCharacterChange = (userInput) => {
    let counter = this.state.counter;
    const prevUser = this.state.users[counter];
    counter++;
    console.log("klik!");

    if (counter < this.state.users.length && !this.state.isButtonDisabled) {
      this.setState({
        isButtonDisabled: true,
      });

      //Add like/nope animation
      const img_div = document.querySelector(".char-img");
      if (userInput === "like") {
        img_div.classList.add("like");
        this.addLikedUser(prevUser, this.state.imgPath);
      } else if (userInput === "nope") {
        img_div.classList.add("nope");
      }

      setTimeout(() => {
        // remove animation
        img_div.classList.remove("like");
        img_div.classList.remove("nope");

        this.getImgPath(counter);

        const userOnDisplay = this.state.users[counter];
        this.setState({
          counter,
          userOnDisplay,
          isButtonDisabled: false,
        });
      }, 800);
      // console.log("kolejna postać", counter, this.state.users[counter]);
    } else {
      // console.log("brak postaci", counter, this.state.users[counter]);
      alert("Brak postaci do wyświetlenia");
      this.setState({
        usersEnd: true,
      });
    }
  };

  componentWillMount() {
    this.getImgPath(0);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <main className="app">
        <div className="logo">
          <img src="/assets/images/logo/logo.png" alt="Star Wars logo" />
        </div>
        {this.state.usersEnd ? (
          <Matches likedUsers={this.state.likedUsers} />
        ) : (
          <>
            <Card
              user={this.state.userOnDisplay}
              imgPath={this.state.imgPath}
            />
            <Buttons
              handleCharacterChange={this.handleCharacterChange}
              isButtonDisabled={this.state.isButtonDisabled}
            />
          </>
        )}
      </main>
    );
  }
}

export default App;
