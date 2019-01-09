import React from 'react';
import PlayerControl from '../Components/PlayerControl';
import { shallow } from 'enzyme';

describe('PlayerControl', () => {
  let wrapper;
  const incorrectFlashcards = [{}, {}, {}]
  const filteredCards = [{}, {}, {}]
  const updateCategoryMock = jest.fn();
  const deleteAllStorageMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <PlayerControl
        incorrectFlashcards={incorrectFlashcards}
        filteredCards={filteredCards}
        updateCategory={updateCategoryMock}
        deleteAllStorage={deleteAllStorageMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass the clicked category', () => {
    wrapper.instance().passCategory();
    expect(updateCategoryMock).toBeCalled();
  });

  it('should call this.passCategory when View Study List is clicked', () => {
    const studyListButton = wrapper.find('.view-incorrect-button');
    studyListButton.simulate('click');
    wrapper.instance().passCategory();
    expect(updateCategoryMock).toBeCalled();
   })
})