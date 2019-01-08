import React from 'react';
import NavBar from '../Components/NavBar';
import { shallow } from 'enzyme';

describe('NavBar', () => {
  let wrapper;
  const filterCardsByCategoryMock = jest.fn();
  const updateCategoryMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NavBar
      filterCardsByCategory={filterCardsByCategoryMock}
      updateCategory={updateCategoryMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})