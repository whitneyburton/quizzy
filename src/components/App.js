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
      isLoaded: false,
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
          this.setState({ isLoaded: true, flashcards: updatedFlashcards })
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
    if (this.state.category !== null && this.state.category !== 'All Methods!') {
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
    if (!error) {
      return (
        <div className="App">
          <NavBar
            filterCardsByCategory={this.filterCardsByCategory}
            updateCategory={this.updateCategory}/>
          <div className="main-page">
            <PlayerControl
              filteredCards={this.filterCardsByCategory()} />
            <FlashcardContainer
              category={category}
              filteredCards={this.filterCardsByCategory()} />
          </div>
        </div>
      )
    }
    if (error) {
      return <span role={"img"} aria-label="error">Oops, something went wrong. 💩 </span>
    } else {
      return (<div>LOADING</div>)
    }
  }
}