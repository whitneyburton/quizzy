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
      filterQuery: [],
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
  
  setCategory = (e) => {
    let buttonClicked = e.target.innerText;
    let allFlashcards = [...this.state.flashcards]
    let filterQuery;
    switch (buttonClicked) {
      case 'Mutator':
        filterQuery = allFlashcards.filter(flashcard => {
          return buttonClicked.toLowerCase() === flashcard.type;
        });
        break;
      case 'Accessor':
        filterQuery = allFlashcards.filter(flashcard => {
          return buttonClicked.toLowerCase() === flashcard.type;
        })
        break;
      case 'Iteration':
        filterQuery = allFlashcards.filter(flashcard => {
          return buttonClicked.toLowerCase() === flashcard.type;
        })
        break;
      case 'All Methods!':
        filterQuery = allFlashcards;
        break;
      default: ;
    }
    this.setState({
      filterQuery
    })
  }


  render() {
    let { error, filterQuery } = this.state;
    if (!error) {
      return (
        <div className="App">
          <NavBar setCategory={this.setCategory} />
          <div className="main-page">
            <PlayerControl
              filterQuery={filterQuery}/>
            <FlashcardContainer
              flashcards={filterQuery} />
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