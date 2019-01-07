import React, { Component } from 'react';
import '../styles/main.scss';
import FlashcardContainer from './FlashcardContainer';
import PlayerControl from './PlayerControl';
import NavBar from './NavBar';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      error: null,
      flashcards: [],
      incorrectFlashcards: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/flashCardData')
    .then(result => result.json())
    .then(
      (result) => {
        const allFlashcards = result.flashcardData
        const updatedFlashcards = allFlashcards.map(flashcard => {
          flashcard.correct = null;
          return flashcard;
        })
        this.setState({ flashcards: updatedFlashcards }, this.retrieveFromStorage)
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
      let filteredCards = this.retrieveFromStorage() || [];
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

  saveToStorage = (flashcard) => {
    let { incorrectFlashcards } = this.state;
    if (JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'))) {
      incorrectFlashcards = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
      incorrectFlashcards.push(flashcard.id);
      localStorage.setItem('incorrectFlashcardsStorage', JSON.stringify(incorrectFlashcards));
    } else {
      incorrectFlashcards.push(flashcard.id);
      localStorage.setItem('incorrectFlashcardsStorage', JSON.stringify(incorrectFlashcards))
    }
  }

  retrieveFromStorage = () => {
    let { flashcards } = this.state;
    let incorrectFlashcards;
    let incorrectFlashcardIDs = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    if (incorrectFlashcardIDs === null) {
      incorrectFlashcards = [];
    } else { 
      incorrectFlashcards = flashcards.filter(flashcard => {
        if (incorrectFlashcardIDs.includes(flashcard.id)) {
          return flashcard;
        }
      });
    }
    this.setState({ incorrectFlashcards })
    return incorrectFlashcards;
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
                updateCategory={this.updateCategory} />
              <FlashcardContainer
                category={category}
                filteredCards={this.filterCardsByCategory()}
                saveToStorage={this.saveToStorage} />
            </div>
          </div>
        ) : (
            <span role={"img"} aria-label="error">Oops, something went wrong. 💩 </span>
          )}
      </div>
    )
  }
}