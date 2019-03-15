import React from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeCardTitle } from "../Utils/Api.js";
import { removeCard } from "../Actions/index.js";

class RemoveCard extends React.Component {
  submitRemove = (deck, questNum) => {
    removeCardTitle(deck, questNum);
    this.props.dispatch(removeCard(deck, questNum));
  };

  goConfirmView = (deck, questNum) => {
    Alert.alert("Remove Card", "Are you sure you want to remove this Card?", [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => this.submitRemove(deck, questNum)
      }
    ]);
  };

  render() {
    const deck = this.props.deckId;
    const currentQNum = this.props.currentQNum;

    return (
      <MaterialCommunityIcons
        style={styles.removeBtn}
        name="minus-box"
        size={30}
        onPress={() => this.goConfirmView(deck, currentQNum)}
      />
    );
  }
}

const styles = StyleSheet.create({
  removeBtn: {
    color: "hsl(330, 72%, 65%)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20
  }
});

export default connect()(RemoveCard);
