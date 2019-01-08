import React, { Component } from 'react';
import '../styles/main.scss';

export default class PlayerControl extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  passCategory = () => {
    if (JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'))) {
      let clickedCategory = 'Incorrect Only';
      this.props.updateCategory(clickedCategory);
    } else {
      let clickedCategory = 'No study cards yet - Keep guessing!'
      this.props.updateCategory(clickedCategory);      
    }
  }

  render() {
    let { incorrectFlashcards, deleteAllStorage } = this.props;
    return (
      <div className="PlayerControl">
        <h2 className="player-options">Player Options</h2>
        <button
          onClick={this.passCategory}          
          className="view-incorrect-button buttons"
          type="button">View Study List ({incorrectFlashcards.length})</button>
        <button
          onClick={deleteAllStorage}                    
          className="reset-button buttons"
          type="button">Reset Quizzy</button>
      </div>
    );
  }
}