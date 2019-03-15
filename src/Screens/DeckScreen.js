import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Deck from "../Components/Deck.js";
import DeckDetails from "../Components/DeckDetails.js";
import { getDecks } from "../Utils/Api.js";
import { receiveDecks } from "../Actions/index.js";
import { AdMobBanner } from "expo";

class DeckScreen extends React.Component {
  componentDidMount() {
    getDecks().then(decks => this.props.receiveAllDecks(decks));
  }

  goDeckView = deck => {
    this.props.navigation.navigate("DeckView", { entryId: deck });
  };

  goRemoveView = deck => {
    this.props.navigation.navigate("RemoveDeck", { entryId: deck });
  };

  render() {
    const { decks } = this.props;
    console.log(this.props.decks);
    return (
      <ScrollView style={{ backgroundColor: "hsl(210, 36%, 96%)" }}>
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
                  deckId={deck}
                />
              </View>
            );
          })}
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-1548251077535465/6579386800" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
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
    paddingBottom: 10,
    backgroundColor: "hsl(210, 36%, 96%)"
  },
  button: {
    flex: 1,
    height: hp("20%"),
    backgroundColor: "hsl(212, 33%, 89%)",
    marginBottom: 10,
    justifyContent: "center",
    elevation: 1,
    marginHorizontal: 20,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "hsl(185, 81%, 29%)",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    fontWeight: "400",
    textAlign: "center"
  },
  cardText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "hsl(210, 36%, 65%)",
    fontWeight: "400",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 6
  },
  deckDetails: {
    flex: 1,
    paddingTop: 28
  },
  descContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 30
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckScreen);
