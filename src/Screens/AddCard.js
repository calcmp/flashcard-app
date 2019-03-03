import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import { addCardToDeck } from "../Utils/Api.js";
import { connect } from "react-redux";
import { addCard } from "../Actions/index.js";
import { NavigationActions } from "react-navigation";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
    fontSizeAnswer: 20
  };

  onChangeTextAnswer = answer => {
    this.setState({ fontSizeAnswer: answer.length > 276 ? 16 : 20 });
    this.setState({ answer });
  };

  submitCard = deck => {
    const { question, answer } = this.state;

    if (question && answer) {
      this.props.dispatch(addCard({ question, answer, deck }));
      addCardToDeck(deck, { question, answer });
      this.setState({ question: "", answer: "" });
      this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    }
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const deckName = this.props.navigation.state.params.entryId;
    const decks = this.props.decks;

    return (
      <View style={{ flex: 1, backgroundColor: "#efefef" }}>
        <View style={{ height: 10 }} />
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              height: SCREEN_HEIGHT - 160,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute",
              flex: 1
            }}
          >
            <View style={styles.container}>
              <TextInput
                style={styles.deckText}
                multiline={true}
                maxLength={100}
                placeholder="Tap here to enter the question"
                placeholderTextColor="#3c3c3c"
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
              />

              <TextInput
                style={[
                  {
                    fontFamily: "sans-serif-light",
                    color: "#3c3c3c",
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: 30,
                    marginHorizontal: 30
                  },
                  { fontSize: this.state.fontSizeAnswer }
                ]}
                multiline={true}
                maxLength={600}
                placeholder="Tap here to enter the answer"
                placeholderTextColor="#3c3c3c"
                onChangeText={this.onChangeTextAnswer.bind(this)}
                value={this.state.answer}
              />
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.submitCard(deckName)}
              >
                <Text style={styles.submitBtnText}>Confirm{"      "}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.back} onPress={this.goBack}>
                <Text style={styles.submitBtnText}>Back</Text>
              </TouchableOpacity>
              <View style={styles.cardNumContainer}>
                <Text style={styles.cardNumText}>
                  {decks[deckName].questions.length + 1} /{" "}
                  {decks[deckName].questions.length + 1}
                </Text>
              </View>
            </View>
          </Animated.View>
          <View style={{ height: 10 }} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = decks => {
  return {
    decks
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 6,
    borderWidth: 1.5,
    borderColor: "#3cd3ff",
    alignItems: "center"
  },
  deckText: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    textAlign: "center",
    fontSize: 22,
    marginTop: 30,
    marginHorizontal: 30
  },
  back: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    alignSelf: "flex-start",
    marginLeft: 30
  },
  cardNumText: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    fontSize: 20,
    textAlign: "center"
  },
  cardNumContainer: {
    backgroundColor: "#efefef",
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "#3cd3ff"
  },
  submitBtnText: {
    color: "#3c3c3c",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "sans-serif-light"
  },
  submitBtn: {
    padding: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    alignSelf: "flex-end"
  },
  title: {
    fontSize: 30,
    color: "#333"
  },
  input: {
    width: 250,
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: "#757575",
    margin: 20,
    borderRadius: 7
  }
});

export default connect(mapStateToProps)(AddCard);
