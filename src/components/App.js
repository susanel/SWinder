import React, { Component } from "react";
// import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

class App extends Component {
  state = {
    characters: [],
    characterOnDisplay: "",
    imgPath: "",
    counter: 0,
    error: "",
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
        //   const character = {
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
        //     characters: [...prevState.characters, character],
        //   }));
        // });

        //Używamy wszystkich danych z API
        this.setState((prevState) => ({
          characters: [...prevState.characters, ...data.results],
          characterOnDisplay: data.results[this.state.counter],
        }));
      })
      .catch((error) => console.log(error));
  };

  handleCharacterChange = (userInput) => {
    let counter = this.state.counter;
    counter++;

    if (counter < this.state.characters.length) {
      //Add like/nope animation
      const img_div = document.querySelector(".char-img");
      if (userInput === "like") {
        console.log(img_div);
        img_div.classList.add("like");
      } else if (userInput === "nope") {
        console.log(img_div);
        img_div.classList.add("nope");
      }

      setTimeout(() => {
        // remove animation
        img_div.classList.remove("like");
        img_div.classList.remove("nope");

        this.getImgPath(counter);
        // console.log(this.state.imgPath);

        const characterOnDisplay = this.state.characters[counter];
        this.setState({
          counter,
          characterOnDisplay,
        });
      }, 1500);
      // console.log("kolejna postać", counter, this.state.characters[counter]);
    } else {
      // console.log("brak postaci", counter, this.state.characters[counter]);
      alert("Brak postaci do wyświetlenia");
    }
  };

  getImgPath = (counter) => {
    const imgPath = `/assets/images/characters/${++counter}.jpg`;

    this.setState({
      imgPath,
    });
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
        <Card
          character={this.state.characterOnDisplay}
          imgPath={this.state.imgPath}
        />
        <div className="btns">
          <button
            className="times"
            onClick={() => {
              this.handleCharacterChange("nope");
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: 40, height: 40, color: "#EA6B4F" }}
            />
          </button>
          <button
            className="heart"
            onClick={() => {
              this.handleCharacterChange("like");
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: 40, height: 40, color: "#76BF93" }}
            />
          </button>
        </div>
      </main>
    );
  }
}

export default App;
