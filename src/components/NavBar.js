import React, { Component } from 'react';
import '../styles/main.scss';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    let { setCategory } = this.props;
    return (
      <div className="NavBar">
        <h1 className="quizzy-title">QUIZZY!</h1>
        <div className="filter-category-buttons">
          <p className="choose-category">Choose an array prototype category:</p>
          <button
            onClick={setCategory}
            className="mutator-button buttons"
            type="button">Mutator</button>
          <button
            onClick={setCategory}            
            className="accessor-button buttons"
            type="button">Accessor</button>
          <button
            onClick={setCategory}
            className="iteration-button buttons"
            type="button">Iteration</button>
          <button
            onClick={setCategory}
            className="all-methods-button buttons"
            type="button">All Methods!</button>
        </div>

      </div>
    );
  }
}