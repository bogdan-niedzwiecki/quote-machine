import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.scss';

class App extends Component {
  state = {
    text: "",
    author: "",
    color: ""
  }

  componentDidMount() {
    this.getQuote()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.text !== nextState.text;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getQuote() {
    return fetch("https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en")
      .then(response => response.json())
      .then(r => this.setState({ text: r.quoteText, author: r.quoteAuthor, color: this.getRandomColor() }))
      .catch(error => console.error(error))
  }

  tweet() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + this.state.text + '" —' + this.state.author));
  }

  render() {
    return (
      <div className="wrapper smooth" style={{ backgroundColor: this.state.color }}>
        <Card style={{ width: 600, color: this.state.color }}>
          <Card.Body>
            <blockquote className="blockquote mb-0 text-center">
              <p className="smooth"><FontAwesomeIcon icon={faQuoteLeft} size="lg" className="mr-3 d-inline" />{this.state.text}</p>
              <footer className="blockquote-footer text-right smooth" style={{ color: this.state.color }}>{this.state.author || 'Anonymous'}</footer>
            </blockquote>
            <Button className="float-left mt-3 border-0 smooth" onClick={() => this.tweet()} style={{ backgroundColor: this.state.color }}><FontAwesomeIcon icon={faTwitter} size="lg" /></Button>
            <Button className="float-right mt-3 border-0 smooth" onClick={() => this.getQuote()} style={{ backgroundColor: this.state.color }}>Generate Quote</Button>
          </Card.Body>
        </Card>
      </ div>
    );
  }

}

export default App;
