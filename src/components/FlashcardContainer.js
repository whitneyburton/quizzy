import React from 'react';
import Flashcard from './Flashcard'
import '../styles/main.scss';

export default function FlashcardContainer(props) {
  return (
    <div className="FlashcardContainer">
      <h2 className="all-flashcards-header">
        Flashcards for: <span></span> methods </h2>
        {props.flashcards.map(flashcard => 
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            flashcards={props.flashcards}
            updatePlayerControl={props.updatePlayerControl}
          />
        )}
    </div>
  );
}