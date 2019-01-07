import React, { Component } from 'react';
import '../styles/main.scss';

export default class PlayerControl extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  passCategory = () => {
    let clickedCategory = 'Incorrect Only';
    this.props.updateCategory(clickedCategory);
  }

  render() {
    let { filteredCards } = this.props;
    return (
      <div className="PlayerControl">
        <h2>Your Stats:</h2>
        <p className="correct-answers stats">CORRECT:
          <span> {filteredCards.filter(flashcard => flashcard.correct === true).length}
          </span></p>
        <p className="incorrect-answers stats">INCORRECT:
          <span> {filteredCards.filter(flashcard => flashcard.correct === false).length}</span></p>
        <p className="unanswered-answers stats">UNANSWERED:
          <span> {filteredCards.filter(flashcard => flashcard.correct === null).length}</span></p>
        <p className="accuracy stats">ACCURACY:
          <span> {((filteredCards.filter(flashcard => flashcard.correct === false).length) / filteredCards.length) * 100}</span>%</p>
        <button
          onClick={this.passCategory}          
          className="view-incorrect-button buttons"
          type="button">View Study List</button>
        <button
          className="reset-button buttons"
          type="button">Reset Quizzy</button>
      </div>
    );
  }
}