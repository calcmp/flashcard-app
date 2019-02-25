import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SubmitButton = ({ onPress, styles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.submitBtn}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
