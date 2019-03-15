import React from "react";
import { View, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DeckScreen from "../Screens/DeckScreen.js";
import AddDeck from "../Screens/AddDeck.js";
import DeckView from "../Screens/DeckView.js";
import RemoveDeck from "../Components/RemoveDeck.js";
import AddCard from "../Screens/AddCard.js";
import RemoveCard from "../Components/RemoveCard.js";
import InfoScreen from "../Screens/InfoScreen.js";

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

const DeckNavigator = createStackNavigator(
  {
    DeckScreen: {
      screen: DeckScreen
    },
    DeckView: {
      screen: DeckView
    },
    AddCard: {
      screen: AddCard
    },
    RemoveDeck: {
      screen: RemoveDeck
    },
    RemoveCard: {
      screen: RemoveCard
    }
  },
  {
    defaultNavigationOptions: {
      title: "Flashcard Express",
      headerStyle: {
        backgroundColor: "hsl(210, 36%, 96%)"
      },
      headerTitle: (
        <Image
          style={{ height: 140, width: 260, marginLeft: 0 }}
          source={require("../../assets/logo3.png")}
        />
      ),
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: "sans-serif-medium",
        fontSize: 18,
        fontWeight: undefined,
        textAlign: "left",
        flex: 1
      }
    }
  }
);

const NewDeckNavigator = createStackNavigator(
  {
    AddDeck: {
      screen: AddDeck
    }
  },
  {
    defaultNavigationOptions: {
      title: "Flashcard Express",
      headerStyle: {
        backgroundColor: "hsl(210, 36%, 96%)"
      },
      headerTitle: (
        <Image
          style={{ height: 140, width: 260, marginLeft: 0 }}
          source={require("../../assets/logo3.png")}
        />
      ),
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: "sans-serif-medium",
        fontSize: 18,
        fontWeight: undefined,
        textAlign: "left",
        flex: 1
      }
    }
  }
);

const InfoNavigator = createStackNavigator(
  {
    InfoScreen: {
      screen: InfoScreen
    }
  },
  {
    defaultNavigationOptions: {
      title: "Flashcard Express",
      headerStyle: {
        backgroundColor: "hsl(210, 36%, 96%)"
      },
      headerTitle: (
        <Image
          style={{ height: 140, width: 260, marginLeft: 0 }}
          source={require("../../assets/logo3.png")}
        />
      ),
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: undefined,
        textAlign: "left",
        flex: 1
      }
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    InfoScreen: {
      screen: InfoNavigator,
      navigationOptions: {
        tabBarLabel: "Help",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color={tintColor}
          />
        )
      }
    },
    DeckScreen: {
      screen: DeckNavigator,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={24} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: NewDeckNavigator,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="plus-box" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "DeckScreen",
    order: ["InfoScreen", "DeckScreen", "AddDeck"],
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: "hsl(185, 81%, 29%)",
      inactiveTintColor: "hsl(210, 22%, 49%)",
      labelStyle: {
        fontSize: 10,
        fontFamily: "Roboto",
        marginBottom: 4,
        marginTop: -4
      }
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);
