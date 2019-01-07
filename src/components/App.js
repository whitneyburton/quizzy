import React, { Component } from 'react';
import '../styles/main.scss';
import FlashcardContainer from './FlashcardContainer';
import PlayerControl from './PlayerControl';
import NavBar from './NavBar';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      flashcards: [],
      category: null
    }
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/flashCardData')
      .then(result => result.json())
      .then(
        (result) => {
          const allFlashcards = result.flashcardData
          const updatedFlashcards = allFlashcards.map(flashcard => {
            flashcard.correct = null;
            return flashcard;
          })
          this.setState({ flashcards: updatedFlashcards })
        }
      )
      .catch((error) => this.setState({ error: true }))
  }

  updateCategory = (clickedCategory) => {
    this.setState({
      category: clickedCategory
    })
  }

  filterCardsByCategory = () => {
    if (this.state.category === 'Incorrect Only') {
      let filteredCards = this.state.flashcards.filter(flashcard => {
        return flashcard.correct === false;
      })
      return filteredCards;
    } else if (this.state.category !== null && this.state.category !== 'All Methods!') {
      let filteredCards = this.state.flashcards.filter(flashcard => {
        return this.state.category.toLowerCase() === flashcard.type;
      });
      return filteredCards;
    } else {
      let filteredCards = this.state.flashcards;
      return filteredCards;
    }
  }

  render() {
    let { error, category } = this.state;
    return (
      <div className="App">
        {!error ? (
          <div>
            <NavBar
              filterCardsByCategory={this.filterCardsByCategory}
              updateCategory={this.updateCategory} />
            <div className="main-page">
              <PlayerControl
                filteredCards={this.filterCardsByCategory()}
                updateCategory={this.updateCategory}
              />
              <FlashcardContainer
                category={category}
                filteredCards={this.filterCardsByCategory()} />
            </div>
          </div>
        ) : (
            <span role={"img"} aria-label="error">Oops, something went wrong. 💩 </span>
          )}
      </div>
    )
  }
}