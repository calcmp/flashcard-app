import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeCardTitle } from "../Utils/Api.js";
import { removeCard } from "../Actions";

class RemoveCard extends React.Component {
  submitRemove = (deck, questNum) => {
    removeCardTitle(deck, questNum);
    this.props.dispatch(removeCard(deck, questNum));
  };

  render() {
    const deck = this.props.deckId;
    const currentQNum = this.props.currentQNum;

    return (
      <MaterialCommunityIcons
        style={styles.removeBtn}
        name="minus-box"
        size={30}
        onPress={() => this.submitRemove(deck, currentQNum)}
      />
    );
  }
}

const mapStateToProps = decks => {
  return {
    decks
  };
};

const styles = StyleSheet.create({
  removeBtn: {
    color: "#ff0000"
  }
});

export default connect(mapStateToProps)(RemoveCard);
