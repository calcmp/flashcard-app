import React from "react";
import { Text, View } from "react-native";
import RemoveDeck from "./RemoveDeck.js";

const DeckDetails = ({ styles, questionLength, deckId }) => {
  return (
    <View style={styles.descContainer}>
      <View style={styles.deckDetails}>
        <Text style={styles.cardText}>Cards: {questionLength}</Text>
      </View>
      <RemoveDeck deckId={deckId} />
    </View>
  );
};

export default DeckDetails;
