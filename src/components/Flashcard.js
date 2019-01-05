import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    // let { flashcards } = this.state.props;
     return (
       <div className="Flashcard">
        <p className="question-counter">Question 1/15</p>         
         <p>Question Here</p>
         <button
            className="answer-one buttons"
           type="button">Answer One</button>
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