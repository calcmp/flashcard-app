import React from "react";
import { TouchableOpacity } from "react-native";

const TapAnswer = ({ onPress, styles }) => {
  return <TouchableOpacity onPress={onPress} style={styles.submitBtn} />;
};

export default TapAnswer;
