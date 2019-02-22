import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getData } from "../Utils/Api.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class DeckScreen extends React.Component {
  static navigationOptions = {
    title: "Decks"
  };
  render() {
    const { navigate } = this.props.navigation;
    const decks = getData();
    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <View key={deck}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("DeckView", { entryId: deck })}
              >
                <Text style={styles.text}>{title}</Text>

                <Text>{questions.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("AddDeck", {})}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    height: hp("30%"),
    width: wp("50%"),
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRightColor: "orange"
  },
  text: {
    fontSize: 30,
    fontFamily: "sans-serif-light",
    color: "#333333"
  }
});
