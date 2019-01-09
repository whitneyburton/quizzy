import React from 'react';
import NavBar from '../Components/NavBar';
import { shallow } from 'enzyme';

describe('NavBar', () => {
  let wrapper;
  const updateCategoryMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NavBar updateCategory={updateCategoryMock} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return an array of categories', () => {
    let returnedArray = wrapper.instance().returnCategories();
    expect(returnedArray).toEqual(['Mutator', 'Accessor', 'Iteration', 'All!']);
  });

  it('should pass the clicked category', () => {
    wrapper.instance().passCategory({ target: { innerText: 'Mutator' } });
    expect(updateCategoryMock).toBeCalled();
  });
});