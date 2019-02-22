import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: "Info"
  };
  render() {
    return (
      <View>
        <Text>Welcome!</Text>
      </View>
    );
  }
}
