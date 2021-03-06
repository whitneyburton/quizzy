import React, { Component } from 'react';
import '../styles/main.scss';

export default class NavBar extends Component {
  returnCategories = () => {
    let categories = ['Mutator', 'Accessor', 'Iteration', 'All!']
    return categories;
  }

  passCategory = (e) => {
    let clickedCategory = e.target.innerText;
    this.props.updateCategory(clickedCategory);
  }

  render() {
    let categories = this.returnCategories();
    return (
      <div className="NavBar">
        <h1 className="quizzy-title">QUIZZY!</h1>
        <div className="filter-section">
          <p className="choose-category">Choose an array prototype category:</p>
            {categories.map(category => {
              return (
                <button
                  key={category}
                  onClick={this.passCategory}
                  className="buttons filter-button"
                  type="button">{category}
                </button>
              )
            })
            }
        </div>
      </div>
    );
  }
}