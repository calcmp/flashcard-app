import {
  ADD_DECK,
  REMOVE_DECK,
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  REMOVE_CARD
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
      const { question, answer, deck, correctAnswer } = action.card;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            { question, answer, correctAnswer }
          ]
        }
      };
    case REMOVE_CARD:
      const questNum = action.card;
      state[action.deck].questions.splice(questNum, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}

export default deck;
