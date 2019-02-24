import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { removeDeckTitle } from "../Utils/Api.js";
import { removeDeck } from "../Actions";
import { connect } from "react-redux";

class RemoveDeck extends React.Component {
  static navigationOptions = {
    title: "RemoveDeck"
  };

  state = {
    text: ""
  };

  submitName = () => {
    const { text } = this.state;

    removeDeckTitle(text);
    this.props.dispatch(removeDeck(text));
    this.props.navigation.navigate("DeckScreen", {});
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck title: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text: text })}
          value={this.state.text}
        />
        <Button onPress={this.submitName} title="submit" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: "orange",
    margin: 50,
    borderRadius: 8
  }
});

export default connect()(RemoveDeck);
