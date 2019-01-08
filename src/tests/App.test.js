import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';
import { shallow, mount } from 'enzyme';


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('incorrectFlashcardsStorage', '[1, 2, 3]');
    wrapper = shallow(
      <App />
    )
  })

  afterEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('initially should have the appropriate default state', () => {
    expect(wrapper.state()).toEqual({
      category: null,
      error: null,
      flashcards: [],
      incorrectFlashcards: []
    })
    expect(wrapper.state().flashcards).toEqual(expect.arrayContaining([]))
    expect(wrapper.state().incorrectFlashcards).toEqual(expect.arrayContaining([]))
  })

  it('should remove localStorage key and reset state when deleteAllStorage is called', () => {
    wrapper.setState({
      incorrectFlashcards: [{ id: 1 }, { id: 2 }, { id: 3 }],
      category: 'Accessor'
    })
    expect(localStorage.hasOwnProperty('incorrectFlashcardsStorage')).toEqual(true);
    wrapper.instance().deleteAllStorage();
    expect(localStorage.hasOwnProperty('incorrectFlashcardsStorage')).toEqual(false);
    expect(wrapper.state().incorrectFlashcards).toEqual(expect.arrayContaining([]))
    expect(wrapper.state().category).toEqual('Welcome to Quizzy! Choose a category above.')
  });

  it('should be able to add incorrect flashcards to state', () => {
    let incorrectFlashcards = [{ id: 1 }, { id: 2 }, { id: 3 }];
    wrapper.setState({ incorrectFlashcards });
    expect(wrapper.state().incorrectFlashcards.length).toEqual(3);
    let newIncorrectFlashcards = { id: 4 };
    wrapper.instance().saveToStorage(newIncorrectFlashcards);
    let itemsInStorage = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage')).length;
    expect(itemsInStorage).toEqual(4);
    // expect(wrapper.state().incorrectFlashcards).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  })

  it('should update category in state based on passed value', () => {
    expect(wrapper.state().category).toEqual(null);
    wrapper.instance().updateCategory('Accessor');
    expect(wrapper.state().category).toEqual('Accessor');
  })

  

  // it('should render the NavBar, PlayerControl, and FlashcardContainer components', () => {
  //   wrapper.setState({ error: false })
  //   expect(wrapper.find('Navbar').length).toEqual(1)
  //   expect(wrapper.find('PlayerControl').length).toEqual(1)
  //   expect(wrapper.find('FlashcardContainer').length).toEqual(1)
  // })
});
