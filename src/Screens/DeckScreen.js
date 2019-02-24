import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { getDecks } from "../Utils/Api.js";
import { receiveDecks } from "../Actions";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class DeckScreen extends React.Component {
  static navigationOptions = {
    title: "Decks"
  };

  componentDidMount() {
    getDecks().then(decks => this.props.receiveAllDecks(decks));
  }

  render() {
    const { decks } = this.props;
    console.log(this.props.decks);
    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <View key={deck}>
              <Button
                title="view deck"
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate("DeckView", { entryId: deck })
                }
              />
              <Text style={styles.text}>{title}</Text>
              <Text>{questions.length}</Text>
            </View>
          );
        })}
        <View>
          <Button
            title="add deck"
            style={styles.button}
            onPress={() => this.props.navigation.navigate("AddDeck", {})}
          />
        </View>
        <View>
          <Button
            title="remove deck"
            style={styles.button}
            onPress={() => this.props.navigation.navigate("RemoveDeck", {})}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: hp("30%"),
    width: wp("50%"),
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRightColor: "orange"
  },
  text: {
    fontSize: 30,
    fontFamily: "sans-serif-light",
    color: "#333333"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckScreen);
