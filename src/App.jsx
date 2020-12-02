import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.scss';

class App extends Component {
  state = {
    quotes: [],
    quote: "",
    author: "",
    color: ""
  }

  componentDidMount() {
    this.getQuotes()
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getQuotes() {
    return fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(r => this.setState({ quotes: r.quotes }, this.generateQuote))
  }

  generateQuote() {
    let index = Math.floor(Math.random() * Math.floor(this.state.quotes.length));
    return this.setState(state => ({ author: state.quotes[index].author, quote: state.quotes[index].quote, color: this.getRandomColor() }))
  }

  tweet() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + this.state.quote + '" —' + this.state.author));
  }

  render() {
    return (
      <div className="wrapper smooth" style={{ backgroundColor: this.state.color }}>
        <Card style={{ color: this.state.color }}>
          <Card.Body>
            <blockquote className="blockquote mb-0 text-center">
              <p className="smooth"><FontAwesomeIcon icon={faQuoteLeft} size="lg" className="mr-3 d-inline" />{this.state.quote}</p>
              <footer className="blockquote-footer text-right smooth" style={{ color: this.state.color }}>{this.state.author || 'Unknown'}</footer>
            </blockquote>
            <div className="button-wrapper">
              <Button className="float-left mt-3 border-0 smooth" title="Tweet this quote!" onClick={() => this.tweet()} style={{ backgroundColor: this.state.color }}><FontAwesomeIcon icon={faTwitter} size="lg" /></Button>
              <Button className="float-right mt-3 border-0 smooth" onClick={() => this.generateQuote()} style={{ backgroundColor: this.state.color }}>New Quote</Button>
            </div>
          </Card.Body>
        </Card>
      </ div>
    );
  }
}

export default App;
