import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "flashcards: decks";

const initialData = {
  Geography: {
    title: "Geography",
    questions: [
      {
        question: "Is South Africa a country?",
        answer: "No, it's a continent.",
        correctAnswer: "false"
      },
      {
        question: "Which US State is next to Cali?",
        answer: "NY",
        correctAnswer: "false"
      }
    ]
  },
  JS: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure",
        answer: "Combination of a function and the lexical environment",
        correctAnswer: "true"
      },
      {
        question: "What is a variable",
        answer: "Stores info",
        correctAnswer: "true"
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
  return AsyncStorage.removeItem(title);
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