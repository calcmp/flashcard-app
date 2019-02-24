import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { saveDeckTitle } from "../Utils/Api.js";
import { addDeck } from "../Actions";
import { connect } from "react-redux";
import SubmitButton from "./SubmitButton";

class AddDeck extends React.Component {
  static navigationOptions = {
    title: "AddDeck"
  };

  state = {
    text: ""
  };

  submitName = () => {
    const { text } = this.state;

    saveDeckTitle(text);
    this.props.dispatch(addDeck(text));
    this.props.navigation.navigate("DeckView", { entryId: text });
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
        <SubmitButton
          btnStyle={styles.submitBtn}
          textStyle={styles.submitBtnText}
          onPress={this.submitName}
        />
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
  },
  submitBtnText: {
    color: "white",
    fontSize: 22,
    textAlign: "center"
  },
  submitBtn: {
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 7,
    overflow: "hidden"
  }
});

export default connect()(AddDeck);