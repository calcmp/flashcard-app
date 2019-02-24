import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ActionButton = ({ onPress, styles, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.androidBtn]}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
