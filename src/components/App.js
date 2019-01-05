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
      flashcards: []
    }
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/flashCardData')
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({ isLoaded: true, flashcards: result})
        }
      )
      .catch((error) => this.setState({ error: true }))
  }

  render() {
    let { error, flashcards } = this.state;
    if (!error) {
      return (
        <div className="App">
          <NavBar />
          <div className="main-page">
            <PlayerControl />
            <FlashcardContainer flashcards={flashcards} />
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