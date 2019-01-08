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
      flashcard.correct = true;
      e.target.closest('.Flashcard').classList.remove('incorrect-answer')
      e.target.closest('.Flashcard').classList.add('correct-answer')
    } else {
      flashcard.correct = false;
      e.target.closest('.Flashcard').classList.remove('correct-answer')
      e.target.closest('.Flashcard').classList.add('incorrect-answer')
      saveToStorage(flashcard);
    }
  }

  randomizeAnswers() {
    let { flashcard } = this.props;
    let allAnswers = this.props.filteredCards
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
    let currentAnswersArray = this.randomizeAnswers()
    if (flashcard.correct === null) {
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
          <a
            href={flashcard.mdn_link}
            className="mdn-link"
            target="_blank"
            rel="noopener noreferrer">Learn More</a>
        </div>
      )
    } else if (flashcard.correct === false) {
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
          <p>Not quite! Try again. Use the link below for more information.</p>
          <a
            href={flashcard.mdn_link}
            className="mdn-link"
            target="_blank"
            rel="noopener noreferrer">Learn More</a>
        </div>
      )
    } else {
      return (
        <div className="Flashcard">
          <p className="question-counter">
            Question {filteredCards.indexOf(flashcard) + 1}/{filteredCards.length}
          </p>
          <p className="flashcard-question">{flashcard.question}</p>
          <div className="buttons-container">
            {currentAnswersArray.map((answer, index) => {
              return <button
                disabled
                key={index}
                onClick={this.validateAnswer}
                className="buttons flashcard-buttons"
                type="button">{answer}</button>
            })}
          </div>
          <p>That's right! Nice work, quizzy pro.</p>
          <a
            href={flashcard.mdn_link}
            className="mdn-link"
            target="_blank"
            rel="noopener noreferrer">Learn More</a>
        </div>
      )
    }
  }
}