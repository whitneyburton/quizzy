import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    const { flashcard, flashcards } = this.props;
     return (
       <div className="Flashcard">
         <p className="question-counter">
           Question {flashcards.indexOf(flashcard)+1}/{flashcards.length}
         </p>         
         <p>{flashcard.question}</p>
         <button
            className="answer-one buttons"
           type="button">{flashcard.answer}</button>
          <button
            className="answer-two buttons"
           type="button">Answer Two</button>
          <button
            className="answer-three buttons"
            type="button">Answer Three</button>
      </div>
    );
  }
}