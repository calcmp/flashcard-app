import React from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../Screens/HomeScreen.js";
import DeckScreen from "../Screens/DeckScreen.js";
import InfoScreen from "../Screens/InfoScreen.js";
import AddDeck from "../Components/AddDeck.js";
import DeckView from "../Screens/DeckView.js";
import RemoveDeck from "../Components/RemoveDeck.js";
import AddCard from "../Components/AddCard.js";
import Quiz from "../Components/Quiz.js";

import { Provider } from "react-redux";
import reducer from "../Reducers";
import { createStore } from "redux";

export default class Navigator extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Decks: DeckScreen,
    Info: InfoScreen,
    AddDeck: AddDeck,
    RemoveDeck: RemoveDeck,
    DeckView: DeckView,
    AddCard: AddCard,
    Quiz: Quiz
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange",
        elevation: 0
      }
    }
  }
);

const AppContainer = createAppContainer(AppStackNavigator);
