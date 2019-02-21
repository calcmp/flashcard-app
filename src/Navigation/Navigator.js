import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../Screens/HomeScreen.js";

export default class Navigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange"
      }
    }
  }
);

const AppContainer = createAppContainer(AppStackNavigator);
