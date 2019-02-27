import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { getDecks } from "../Utils/Api.js";
import { receiveDecks } from "../Actions";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Deck from "../Components/Deck.js";
import DeckDetails from "../Components/DeckDetails.js";
import Divider from "../Components/Divider.js";

class DeckScreen extends React.Component {
  componentDidMount() {
    getDecks().then(decks => this.props.receiveAllDecks(decks));
  }

  goDeckView = deck => {
    this.props.navigation.navigate("DeckView", { entryId: deck });
  };

  render() {
    const { decks } = this.props;
    console.log(this.props.decks);
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.keys(decks).map(deck => {
            const { title, questions } = decks[deck];
            return (
              <View key={deck}>
                <Deck
                  styles={styles}
                  title={title}
                  onPress={() => {
                    this.goDeckView(deck);
                  }}
                />
                <DeckDetails
                  styles={styles}
                  questionLength={questions.length}
                />
                <Divider styles={styles} />
              </View>
            );
          })}
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
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10
  },
  button: {
    flex: 1,
    height: hp("20%"),
    backgroundColor: "#efefef",
    marginBottom: 10,
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10
  },
  titleText: {
    fontSize: 18,
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    textAlign: "center"
  },
  cardText: {
    fontSize: 12,
    fontFamily: "sans-serif-light",
    color: "#3c3c3c"
  },
  deckDetails: {
    flex: 1
  },
  descContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 30
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
    marginBottom: 20
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckScreen);
