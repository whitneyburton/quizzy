import React from 'react';
import Flashcard from './Flashcard'
import '../styles/main.scss';

export default function FlashcardContainer(props) {
  return (
    <div className="FlashcardContainer">
      <h2 className="all-flashcards-header">{props.category}</h2>
      {props.filteredCards.map(flashcard =>
        <Flashcard
          key={flashcard.id}
          flashcard={flashcard}
          filteredCards={props.filteredCards}
          saveToStorage={props.saveToStorage}
        />
      )}
    </div>
  );
}