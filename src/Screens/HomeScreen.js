import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "FlashCard Title"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Decks", {})}
        >
          <Text style={styles.text}>Decks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Info", {})}
        >
          <Text style={styles.text}>Info</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    height: hp("90%"),
    width: wp("50%"),
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: "orange",
    borderRightColor: "orange"
  },
  text: {
    fontSize: 30,
    fontFamily: "sans-serif-light",
    color: "#333333"
  },
  seperator: {
    borderLeftWidth: 2,
    borderLeftColor: "orange"
  }
});
