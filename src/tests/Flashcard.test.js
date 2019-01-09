import React from 'react';
import Flashcard from '../Components/Flashcard';
import { shallow } from 'enzyme';

describe('Flashcard', () => {
  let wrapper;
  const id = 1;
  const flashcard =
  {
    answer: '.copyWithin()',
    id: 4
  };
  const filteredCards = [
    { answer: '.reduce()', id: 1 },
    { answer: '.map()', id: 2 },
    { answer: '.filter()', id: 3 },
  ];
  const saveToStorageMock = jest.fn();
  const removeCorrectFromStorageMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Flashcard
        key={id}
        flashcard={flashcard}
        filteredCards={filteredCards}
        saveToStorage={saveToStorageMock}
        removeCorrectFromStorage={removeCorrectFromStorageMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the appropriate default state', () => {
    expect(wrapper.state()).toEqual({ correct: null });
  });

  it('should validate the users answer when an answer button is clicked', () => {
    expect(wrapper.state()).toEqual({ correct: null });
    wrapper.instance().validateAnswer({ target: { innerText: '.copyWithin()' } });
    expect(wrapper.state()).toEqual({ correct: true });
    expect(removeCorrectFromStorageMock).toBeCalled();

    wrapper.instance().validateAnswer({ target: { innerText: '.map()' } });
    expect(wrapper.state()).toEqual({ correct: false });
    expect(saveToStorageMock).toBeCalled();
  });

  it('should randomize the possible answers for the flashcard', () => {
    let finalArray = wrapper.instance().randomizeAnswers().length;
    expect(finalArray).toEqual(3);
    expect(wrapper.instance().randomizeAnswers()).toContain('.copyWithin()');
  });
});