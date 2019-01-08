import React from 'react';
import PlayerControl from '../Components/PlayerControl';
import { shallow } from 'enzyme';

describe('PlayerControl', () => {
  let wrapper;
  const filteredCards = [{}, {}, {}]
  const updateCategoryMock = jest.fn();
  const removeStorageMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <PlayerControl
        filteredCards={filteredCards}
        updateCategory={updateCategoryMock}
        removeStorage={removeStorageMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})