import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Deck = ({ styles, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Deck;
