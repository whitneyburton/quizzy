import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  // it('should render the NavBar, PlayerControl, and FlashcardContainer components', () => {
  //   wrapper.setState({ error: false })
  //   expect(wrapper.find('Navbar').length).toEqual(1)
  //   expect(wrapper.find('PlayerControl').length).toEqual(1)
  //   expect(wrapper.find('FlashcardContainer').length).toEqual(1)
  // })
});
