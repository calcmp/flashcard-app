import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { getData, getDecks } from "../Utils/Api.js";
import { receiveDecks } from "../Actions/index.js";
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
    const { navigate } = this.props.navigation;
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <View key={deck}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("DeckView", { entryId: deck })}
              >
                <Text style={styles.text}>{title}</Text>
                <Text>{questions.length}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

/*const mapStateToProps = decks => {
  return decks;
};

const mapDispatchToProps = dispatch => {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks))
  };
};*/

function mapStateToProps(decks) {
  return decks;
}

function mapDispatchToProps(dispatch) {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks))
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
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
