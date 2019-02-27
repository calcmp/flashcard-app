import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeckDetails = ({ styles, questionLength }) => {
  return (
    <View style={styles.descContainer}>
      <View style={styles.deckDetails}>
        <Text style={styles.cardText}>Cards: {questionLength}</Text>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={20}
          color="#3c3c3c"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DeckDetails;
