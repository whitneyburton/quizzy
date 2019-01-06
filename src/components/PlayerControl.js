import React, { Component } from 'react';
import '../styles/main.scss';

export default class PlayerControl extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    let { filteredCards } = this.props;
    return (
      <div className="PlayerControl">
        <h2>Your Stats:</h2>
        <p className="correct-answers stats">CORRECT: 
          <span>{filteredCards.filter(flashcard => flashcard.correct === true).length}
          </span></p>
        <p className="incorrect-answers stats">INCORRECT:
          <span>{filteredCards.filter(flashcard => flashcard.correct === false).length}</span></p>
        <p className="unanswered-answers stats">UNANSWERED:
          <span>{filteredCards.filter(flashcard => flashcard.correct === null).length}</span></p>
        <p className="accuracy stats">ACCURACY:
          <span>50</span>%</p>
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