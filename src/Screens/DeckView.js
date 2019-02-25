import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ActionButton from "../Components/ActionButton.js";

class DeckView extends React.Component {
  static navigationOptions = {
    title: "DeckView"
  };

  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;
    console.log(deck);
    return (
      <View style={styles.container}>
        <Text>{decks[deck].title}</Text>
        <Text>{decks[deck].questions.length}</Text>
        <ActionButton
          styles={styles}
          text={"Add Card"}
          onPress={() =>
            this.props.navigation.navigate("AddCard", { entryId: deck })
          }
        />
        <ActionButton
          styles={styles}
          text={"Start Quiz"}
          onPress={() =>
            this.props.navigation.navigate("Quiz", { entryId: deck })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  androidBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 170
  },
  submitBtnText: {
    color: "blue",
    fontSize: 22,
    textAlign: "center"
  }
});

export default connect(mapStateToProps)(DeckView);
