import {
  ADD_DECK,
  REMOVE_DECK,
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  REMOVE_CARD,
  SHUFFLE_DECK
} from "../Actions/index.js";

function deck(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      const newDeck = {
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      };
      return {
        ...state,
        ...newDeck
      };
    case REMOVE_DECK:
      delete state[action.deck];
      return {
        ...state
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_CARD_TO_DECK:
      const { question, answer, deck } = action.card;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer }]
        }
      };
    case REMOVE_CARD:
      const questNum = action.card;
      state[action.deck].questions.splice(questNum, 1);
      return {
        ...state
      };
    case SHUFFLE_DECK:
      state[action.deck].questions.sort(() => Math.random() - 0.5);
      return {
        ...state
      };
    default:
      return state;
  }
}

export default deck;
