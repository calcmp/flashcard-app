import React from "react";
import { StyleSheet, Alert } from "react-native";
import { shuffleDeckTitle } from "../Utils/Api.js";
import { shuffleDeck } from "../Actions/index.js";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class ShuffleDeck extends React.Component {
  submitShuffle = deck => {
    console.log("deck: ", deck);
    shuffleDeckTitle(deck);
    this.props.dispatch(shuffleDeck(deck));
  };

  goConfirmView = deck => {
    Alert.alert("Shuffle Deck", "Are you sure you want to shuffle this deck?", [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => this.submitShuffle(deck)
      }
    ]);
  };

  render() {
    const deckId = this.props.deckId;

    return (
      <MaterialCommunityIcons
        style={styles.removeBtn}
        name="shuffle"
        size={30}
        onPress={() => this.goConfirmView(deckId)}
      />
    );
  }
}

const styles = StyleSheet.create({
  removeBtn: {
    color: "#ff0000"
  }
});

export default connect()(ShuffleDeck);
