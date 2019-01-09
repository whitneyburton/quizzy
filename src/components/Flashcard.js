import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
      correct: null
    }
  }

  validateAnswer = (e) => {
    let { flashcard, saveToStorage, removeCorrectFromStorage } = this.props;
    let answerClicked = e.target.innerText;
    if (flashcard.answer === answerClicked) {
      this.setState({ correct: true });
      removeCorrectFromStorage(flashcard);
    } else {
      this.setState({ correct: false });
      saveToStorage(flashcard);
    }
  }

  randomizeAnswers() {
    let { flashcard, flashcards } = this.props;
    let allAnswers = flashcards
      .map(flashcard => flashcard.answer)
      .sort(() => 0.5 - Math.random())
    let correctAnswerIndex = allAnswers.indexOf(flashcard.answer)
    allAnswers.splice(correctAnswerIndex, 1)
    let finalArray = [...allAnswers
      .splice(0, 2), flashcard.answer]
      .sort(() => 0.5 - Math.random())
    return finalArray;
  }

  render() {
    const { flashcard, filteredCards } = this.props;
    const { correct } = this.state;
    let currentAnswersArray = this.randomizeAnswers();
    let flashcardClass = 'Flashcard';
    let correctFeedback;
    let incorrectFeedback;
    if (correct === true) {
      flashcardClass = 'Flashcard correct-answer'
      correctFeedback = 'show'
      incorrectFeedback = 'hide'
    } else if (correct === false) {
      flashcardClass = 'Flashcard incorrect-answer'
      incorrectFeedback = 'show'
      correctFeedback = 'hide'
    } else {
      incorrectFeedback = 'hide'
      correctFeedback = 'hide'
    }

    return (
      <div className={flashcardClass}>
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
        <p className={correctFeedback}>That's right! Nice work, Quizzy pro.</p>
        <p className={incorrectFeedback}>Not quite. Keep guessing!</p>
        <div className="learn-more">
          <a
            href={flashcard.mdn_link}
            className="mdn-link"
            target="_blank"
            rel="noopener noreferrer">Learn More</a>
        </div>
      </div>
    )
  }
}