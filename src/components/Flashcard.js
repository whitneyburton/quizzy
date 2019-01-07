import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  validateAnswer = (e) => {
    let { flashcard, saveToStorage } = this.props;
      let answerClicked = e.target.innerText;
    if (flashcard.answer === answerClicked) {
        // popup card with you got it right! more info -> mdn link, syntax
        flashcard.correct = true;
        console.log('yay')
      } else {
        flashcard.correct = false;
        saveToStorage(flashcard);
        console.log('nope')
      }
  }

  randomizeAnswers() {
    let { flashcard } = this.props;
    let allAnswers = this.props.filteredCards
      .map(flashcard => flashcard.answer)
      .sort(() => 0.5 - Math.random())
    let correctAnswerIndex = allAnswers.indexOf(flashcard)
    allAnswers.splice(correctAnswerIndex, 1)
    let finalArray = [...allAnswers
      .splice(0, 2), flashcard.answer]
      .sort(() => 0.5 - Math.random())
    return finalArray;
  }

  render() {
    const { flashcard, filteredCards } = this.props;
    let currentAnswersArray = this.randomizeAnswers()
    return (
      <div className="Flashcard">
        <p className="question-counter">
          Question {filteredCards.indexOf(flashcard) + 1}/{filteredCards.length}
        </p>
        <p className="flashcard-question">{flashcard.question}</p>
        <div className="buttons-container">
          {currentAnswersArray.map((answer, index) => {
            return <button
              key={index}
              onClick={this.validateAnswer}
              className="buttons flashcard-buttons"
              type="button">{answer}</button>
          })}
        </div>
      </div>
    );
  }
}