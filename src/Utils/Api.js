import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "flashcards: decks";

const initialData = {
  Geography: {
    title: "Sample Deck: Geography",
    questions: [
      {
        question: "Which is the largest desert on earth?",
        answer: "The Sahara"
      },
      {
        question: "What is the capital of England?",
        answer: "London"
      },
      {
        question: "What are all of the current continents of the Earth?",
        answer:
          "Antarctica \n North America \n South America \n Europe \n Africa \n Asia \n Australasia"
      },
      {
        question: "What is the longest river in the world?",
        answer: "Nile"
      },
      {
        question: "What are the three largest cities in Australia?",
        answer:
          "1: Sydney: 4.452million \n 2: Melbourne: 4.269million \n 3: Brisbane: 2.177million"
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

export function shuffleDeckTitle(deck) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[deck].questions.sort(() => Math.random() - 0.5);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
      return results;
    });
}
