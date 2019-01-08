import React from 'react';
import Flashcard from '../Components/Flashcard';
import { shallow } from 'enzyme';

describe('Flashcard', () => {
  let wrapper;
  const id = 1;
  const flashcard = {};
  const filteredCards = [{}, {}, {}]
  const saveToStorageMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Flashcard
        key={id}
        flashcard={flashcard}
        filteredCards={filteredCards}
        saveToStorage={saveToStorageMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})