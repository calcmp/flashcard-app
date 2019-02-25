import React from "react";
import { Text, TouchableOpacity } from "react-native";

const InfoButton = ({ onPress, styles, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.submitBtn}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InfoButton;
