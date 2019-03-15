import React from "react";
import { StyleSheet, Alert } from "react-native";
import { removeDeckTitle } from "../Utils/Api.js";
import { removeDeck } from "../Actions/index.js";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class RemoveDeck extends React.Component {
  submitRemove = deck => {
    console.log("deck: ", deck);
    removeDeckTitle(deck);
    this.props.dispatch(removeDeck(deck));
  };

  goConfirmView = deck => {
    Alert.alert("Remove Deck", "Are you sure you want to remove this deck?", [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => this.submitRemove(deck)
      }
    ]);
  };

  render() {
    const deckId = this.props.deckId;

    return (
      <MaterialCommunityIcons
        style={styles.removeBtn}
        name="minus-box"
        size={26}
        onPress={() => this.goConfirmView(deckId)}
      />
    );
  }
}

const styles = StyleSheet.create({
  removeBtn: {
    color: "hsl(330, 72%, 65%)",
    marginTop: -4
  }
});

export default connect()(RemoveDeck);
