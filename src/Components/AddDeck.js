import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { saveDeckTitle } from "../Utils/Api.js";
import { addDeck } from "../Actions/index.js";

export default class AddDeck extends React.Component {
  state = {
    text: ""
  };
  static navigationOptions = {
    title: "AddDeck"
  };

  submitName = () => {
    const { text } = this.state;

    saveDeckTitle(text);
    this.props.dispatch(addDeck(text));
    this.props.navigation.navigate("DeckView", {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck title:</Text>
        <TextInput
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
