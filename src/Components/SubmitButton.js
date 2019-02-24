import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SubmitButton = ({ onPress, btnStyle, textStyle }) => {
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Text style={textStyle}>Submit</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
