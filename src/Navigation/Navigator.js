import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../Screens/HomeScreen.js";
import DeckScreen from "../Screens/DeckScreen.js";
import InfoScreen from "../Screens/InfoScreen.js";
import AddDeck from "../Components/AddDeck.js";
import DeckView from "../Screens/DeckView.js";

export default class Navigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Decks: DeckScreen,
    Info: InfoScreen,
    AddDeck: AddDeck,
    DeckView: DeckView
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
