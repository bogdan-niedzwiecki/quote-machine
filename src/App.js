import React, { Component } from "react";
import Ball from "./components/Ball";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./App.scss";

class App extends Component {
  state = {
    quotes: [],
    quote: "",
    author: "",
    color: "",
    balls: [],
    isCardHidden: true,
  };

  componentDidMount() {
    this.getQuotes();
    this.createBalls();
  }

  createBalls() {
    const ballsCount = Math.floor(Math.random() * 4 + 3);
    let arr = [];

    for (let i = 0; i < ballsCount; i++) {
      const id = i;
      const x = Math.floor(Math.random() * 51 + 25);
      const y = Math.floor(Math.random() * 51 + 25);
      const size = Math.floor(Math.random() * 3 + 1);

      arr.push({ id, x, y, size });
    }

    this.setState((state) => ({
      ...state,
      balls: arr,
    }));
  }

  getRandomColor() {
    const letters = "3456789";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 7)];
    }
    return color;
  }

  getQuotes() {
    return fetch('/.netlify/functions/quotes')
      .then((response) => response.json())
      .then((r) => this.setState({ quotes: r.quotes }, this.generateQuote));
  }

  generateQuote = (click) => {
    this.generateCord();

    let index = Math.floor(
      Math.random() * Math.floor(this.state.quotes.length)
    );

    setTimeout(
      () => {
        this.setState((state) => ({
          ...state,
          author: state.quotes[index].author,
          quote: state.quotes[index].quote,
          color: this.getRandomColor(),
          isCardHidden: false,
        }));
      },
      click ? 500 : 0
    );
  };

  fadeCard = () => {
    this.setState((state) => ({
      ...state,
      isCardHidden: true,
    }));
  };

  tweet = () => {
    window.open(
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent('"' + this.state.quote + '" —' + this.state.author)
    );
  };

  generateCord = () => {
    let arr = this.state.balls.map((ball) => {
      const x = Math.floor(Math.random() * 51 + 25);
      const y = Math.floor(Math.random() * 51 + 25);
      const size = Math.floor(Math.random() * 3 + 1);

      return { id: ball.id, x, y, size };
    });

    this.setState((state) => ({
      ...state,
      balls: arr,
    }));
  };

  render() {
    let card = `card${this.state.isCardHidden ? " card-fade" : ""}`;
    return (
      <div className="wrapper" style={{ backgroundColor: this.state.color }}>
        {this.state.balls.map((ball) => (
          <Ball
            key={ball.id}
            cord={{ x: ball.x, y: ball.y }}
            size={ball.size}
          ></Ball>
        ))}
        <div className={card} aria-hidden={this.state.isCardHidden}>
          <blockquote className="blockquote">
            <p>
              <FontAwesomeIcon icon={faQuoteLeft} size="lg" className="icon" />
              {this.state.quote}
            </p>
            <footer className="blockquote-footer">
              {this.state.author || "Unknown"}
            </footer>
          </blockquote>
          <div className="button-wrapper">
            <button className="button" onClick={this.tweet}>
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </button>
            <button
              className="button"
              onClick={() => {
                this.generateQuote(true);
                this.fadeCard();
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
