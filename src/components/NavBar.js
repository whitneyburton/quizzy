import React, { Component } from 'react';
import '../styles/main.scss';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  passCategory = (e) => {
    let clickedCategory = e.target.innerText;
    this.props.updateCategory(clickedCategory);
  }

  render() {
    return (
      <div className="NavBar">
        <h1 className="quizzy-title">QUIZZY!</h1>
        <div className="filter-category-buttons">
          <p className="choose-category">Choose an array prototype category:</p>
          <button
            onClick={this.passCategory}
            className="mutator-button buttons"
            type="button">Mutator</button>
          <button
            onClick={this.passCategory}            
            className="accessor-button buttons"
            type="button">Accessor</button>
          <button
            onClick={this.passCategory}
            className="iteration-button buttons"
            type="button">Iteration</button>
          <button
            onClick={this.passCategory}
            className="all-methods-button buttons"
            type="button">All Methods!</button>
        </div>
      </div>
    );
  }
}