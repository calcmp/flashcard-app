import React from "react";
import { Text, View } from "react-native";
import RemoveDeck from "./RemoveDeck.js";
import ShuffleDeck from "./ShuffleDeck.js";

const DeckDetails = ({ styles, questionLength, deckId }) => {
  return (
    <View style={styles.descContainer}>
      <ShuffleDeck deckId={deckId} />
      <View style={styles.deckDetails}>
        <Text style={styles.cardText}>Cards: {questionLength}</Text>
      </View>
      <RemoveDeck deckId={deckId} />
    </View>
  );
};

export default DeckDetails;
