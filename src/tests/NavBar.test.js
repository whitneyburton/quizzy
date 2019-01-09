import React from 'react';
import NavBar from '../Components/NavBar';
import { shallow } from 'enzyme';

describe('NavBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NavBar
      filterCardsByCategory={filterCardsByCategoryMock}
      updateCategory={updateCategoryMock}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the appropriate default state', () => {
    expect(wrapper.state()).toEqual({
      categories: ['Mutator', 'Accessor', 'Iteration', 'All!']
    })
  });



})