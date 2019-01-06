import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
      // correct: null
    }
  }

  updateCorrect = (e) => {
    let { flashcard } = this.props;
    let answerClicked = e.target.innerText;
    if (flashcard.answer === answerClicked) {
      // popup card with you got it right! more info -> mdn link, syntax
      flashcard.correct = true;
      console.log('yay! you got it right!')
    }
  }

  render() {
    const { flashcard, filteredCards } = this.props;
    return (
      <div className="Flashcard">
        <p className="question-counter">
          Question {filteredCards.indexOf(flashcard) + 1}/{filteredCards.length}
        </p>
        <p>{flashcard.question}</p>
        <button
          onClick={this.updateCorrect}
          className="answer-one buttons"
          type="button">{flashcard.answer}</button>
        <button
          onClick={this.updateCorrect}          
          className="answer-two buttons"
          type="button">Answer Two</button>
        <button
          onClick={this.updateCorrect}          
          className="answer-three buttons"
          type="button">Answer Three</button>
      </div>
    );
  }
}