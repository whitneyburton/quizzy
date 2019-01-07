import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
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

  randomizeAnswers(allAnswers) {
    let correctAnswerIndex = allAnswers.indexOf(flashcard)
    allAnswers.splice(correctAnswerIndex, 1)
    allAnswers.sort(() => {
      return 0.5 - Math.random();
    })
    let finalArray = [...allAnswers.splice(0, 2), flashcard]
    finalArray.sort(() => {
      return 0.5 - Math.random();
    })

    return finalArray;
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