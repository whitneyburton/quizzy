import React, { Component } from 'react';
import '../styles/main.scss';

export default class PlayerControl extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  render() {
    let { correct, incorrect } = this.props;
    return (
      <div className="PlayerControl">
        <h2>Your Stats:</h2>
        <p className="correct-answers stats">CORRECT: <span>{correct}</span></p>
        <p className="incorrect-answers stats">INCORRECT: <span>{incorrect}</span></p>
        <p className="accuracy stats">ACCURACY: <span>50</span>%</p>
        <button
          className="view-incorrect-button buttons"
          type="button">View Incorrect Cards</button>
        <button
          className="reset-button buttons"
          type="button">Reset Quizzy</button>
      </div>
    );
  }
}