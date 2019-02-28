import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "flashcards: decks";

const initialData = {
  Geography: {
    title: "Sample Deck: Geography",
    questions: [
      {
        question: "Is South Africa a country?",
        answer: "No, it's a continent."
      },
      {
        question: "What is the worlds highest mountain?",
        answer: "Mount Everest"
      },
      {
        question: "What is the longest river in the world?",
        answer: "Nile"
      }
    ]
  }
};

export const getData = () => {
  return initialData;
};

export function getDecks(deck) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    if (results === null) {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    } else {
      return JSON.parse(results);
    }
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title, questions: [] }
    })
  );
}

export function removeDeckTitle(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      delete results[title];
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
      return results;
    });
}

export function addCardToDeck(name, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[name].questions.push(card);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
      return results;
    });
}

export function removeCardTitle(card, questNum) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[card].questions.splice(questNum, 1);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
      return results;
    });
}
