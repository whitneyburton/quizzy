import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';
import { shallow, mount } from 'enzyme';


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('incorrectFlashcardsStorage', '[1, 2, 3]');
    wrapper = mount(
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

  it('should have the appropriate default state', () => {
    expect(wrapper.state()).toEqual({
      category: null,
      error: null,
      flashcards: [],
      incorrectFlashcards: []
    })
    expect(wrapper.state().flashcards).toEqual(expect.arrayContaining([]))
    expect(wrapper.state().incorrectFlashcards).toEqual(expect.arrayContaining([]))
  })

  it('should render the NavBar, PlayerControl, and FlashcardContainer components', () => {
    wrapper.setState({ error: false })
    expect(wrapper.find('.NavBar').length).toEqual(1)
    expect(wrapper.find('.PlayerControl').length).toEqual(1)
    expect(wrapper.find('.FlashcardContainer').length).toEqual(1)
  })

  it('should update local storage', () => {
    let incorrectFlashcards = [{ id: 1 }, { id: 2 }, { id: 3 }];
    wrapper.setState({ incorrectFlashcards });
    expect(wrapper.state().incorrectFlashcards.length).toEqual(3);
    let newIncorrectFlashcards = { id: 4 };
    wrapper.instance().saveToStorage(newIncorrectFlashcards);
    let itemsInStorage = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage')).length;
    expect(itemsInStorage).toEqual(4);
  });

  it('should retrieve the incorrect flashcards from storage and set them to state', () => {
    wrapper.setState({
      flashcards: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    let incorrectFlashcards = wrapper.instance().retrieveFromStorage();
    expect(incorrectFlashcards).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  })

  it('should remove correctly answered flashcards from storage', () => {
    let flashcard = { id: 2 }
    let itemsInStorage = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    expect(itemsInStorage).toEqual([1, 2, 3]);
    wrapper.instance().removeCorrectFromStorage(flashcard);
    itemsInStorage = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    expect(itemsInStorage).toEqual([1, 3]);
  })

  it('should remove the local storage key and reset state when deleteAllStorage is called', () => {
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


  it('should update category in state based on passed value', () => {
    expect(wrapper.state().category).toEqual(null);
    wrapper.instance().updateCategory('Accessor');
    expect(wrapper.state().category).toEqual('Accessor');
  });

  it('should filter flashcards based on the current category', () => {
    wrapper.setState({
      category: 'Accessor',
      flashcards: [
        { type: 'accessor' },
        { type: 'iteration' },
        { type: 'accessor' },
        { type: 'accessor' }
      ]
    });
    expect(wrapper.state().category).toEqual('Accessor');
    let filteredCards = wrapper.instance().filterCardsByCategory();
    expect(filteredCards).toEqual([
      { type: 'accessor' },
      { type: 'accessor' },
      { type: 'accessor' }
    ]);
  })
});
