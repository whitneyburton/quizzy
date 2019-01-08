import React from 'react';
import FlashcardContainer from '../Components/FlashcardContainer';
import { shallow } from 'enzyme';
import Flashcard from '../components/Flashcard';

describe('FlashcardContainer', () => {
  let wrapper;
  const category = 'All Methods!'
  const filteredCards = [{}, {}, {}]
  const saveToStorageMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <FlashcardContainer
        category={category}
        filteredCards={filteredCards}
        saveToStorage={saveToStorageMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})