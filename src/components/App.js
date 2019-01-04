import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import QuestionCard from './QuestionCard';
import '../styles/main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="App">
        <p className="a">App</p>
        <AnswerCard />
        <QuestionCard />
      </div>
    );
  }
}