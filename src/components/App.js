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

  componentDidMount = () => {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/flashCardData')
      .then(result => result.json())
      .then(
        (result) => {
          const flashcards = result.flashcardData
          this.setState({
            flashcards,
            category: 'Welcome to Quizzy! Choose a category above.'
          },
            this.retrieveFromStorage)
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
      let filteredCards = this.state.incorrectFlashcards;
      return filteredCards;
    } else if (this.state.category === 'No study cards yet - Keep guessing!') {
      let filteredCards = this.state.flashcards;
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
    let { flashcards } = this.state;
    let [...incorrectFlashcards] = this.state.incorrectFlashcards;
    let incorrectFlashcardIDS = [];
    if (JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'))) {
      incorrectFlashcardIDS = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    }
    incorrectFlashcardIDS.push(flashcard.id);
    localStorage.setItem('incorrectFlashcardsStorage', JSON.stringify(incorrectFlashcardIDS));
    incorrectFlashcards = flashcards.filter(flashcard => {
      if (incorrectFlashcardIDS.includes(flashcard.id)) {
        return flashcard;
      }
    });
    this.setState({ incorrectFlashcards })
  }

  retrieveFromStorage = () => {
    let { flashcards } = this.state;
    let incorrectFlashcards;
    let incorrectFlashcardIDs = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    console.log(incorrectFlashcardIDs)
    if (incorrectFlashcardIDs === null) {
      incorrectFlashcards = flashcards;
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

  removeStorage = () => {
    localStorage.removeItem('incorrectFlashcardsStorage')
    // window.reload();
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
                removeStorage={this.removeStorage} />
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