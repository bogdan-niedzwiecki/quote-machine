import React, { Component } from "react";
import "./Ball.scss";

class Ball extends Component {
  render() {
    return (
      <div
        className="ball"
        style={{
          transform: `translate(calc(50vw - ${this.props.cord.x}vw), calc(50vh - ${this.props.cord.y}vh)) scale(${this.props.size})`,
          boxShadow: `${this.props.size * 6}px ${this.props.size * 6}px ${this.props.size * 5}px -${this.props.size * 3
            }px rgba(0, 0, 0, 0.2)`,
        }}
      ></div>
    );
  }
}

export default Ball;
