import React, { Component } from 'react';
import '../styles/main.scss';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      categories: ['Mutator', 'Accessor', 'Iteration', 'All Methods!']
    }
  }

  passCategory = (e) => {
    let clickedCategory = e.target.innerText;
    this.props.updateCategory(clickedCategory);
  }

  render() {
    let { categories } = this.state;
    return (
      <div className="NavBar">
        <h1 className="quizzy-title">QUIZZY!</h1>
        <div className="filter-category-buttons">
          <p className="choose-category">Choose an array prototype category:</p>
          {categories.map(category => {
            return (
              <button
                onClick={this.passCategory}
                className="buttons filters"
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