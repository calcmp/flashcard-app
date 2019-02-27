import React from "react";
import { NavigationActions } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity
} from "react-native";
import SubmitButton from "./SubmitButton.js";
import { connect } from "react-redux";
import ActionButton from "./ActionButton.js";
import InfoButton from "./InfoButton.js";
import { AnimatedRegion } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeCardTitle } from "../Utils/Api.js";
import { removeCard } from "../Actions";
import RemoveCard from "./RemoveCard.js";

class DeckView extends React.Component {
  state = {
    questionNum: 0,
    showQuestion: false,
    correct: 0,
    incorrect: 0
  };

  showAnswer = () => {
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });
  };

  submitAnswer = answer => {
    const questionNum = this.state.questionNum;
    const deck = this.props.navigation.state.params.entryId;
    const decks = this.props.decks;
    const correct = decks[deck].questions[
      questionNum
    ].correctAnswer.toLowerCase();

    if (answer.trim() === correct.trim()) {
      this.setState({ correct: this.state.correct + 1 });
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }

    this.setState({
      questionNum: this.state.questionNum + 1,
      showQuestion: false
    });
  };

  replayQuiz = () => {
    this.setState({
      questionNum: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0
    });
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;
    const number = this.state.questionNum + 1;
    const questionNum = this.state.questionNum;
    const correct = this.state.correct;
    const incorrect = this.state.incorrect;
    const currentQNum = this.props.navigation.state.params.questionNumId;

    if (questionNum === decks[deck].questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            You got {this.state.correct} out of {decks[deck].questions.length}
          </Text>

          <ActionButton
            styles={styles}
            text={"Replay"}
            onPress={this.replayQuiz}
          />
          <ActionButton
            styles={styles}
            text={"Add Card"}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { entryId: deck })
            }
          />
          <ActionButton styles={styles} text={"Back"} onPress={this.goBack} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Animated.View style={styles.swipe}>
          {!this.state.showQuestion ? (
            <Text style={styles.deckText}>
              {decks[deck].questions[questionNum].question}
            </Text>
          ) : (
            <Text style={styles.deckText}>
              {decks[deck].questions[questionNum].answer}
            </Text>
          )}

          {!this.state.showQuestion ? (
            <InfoButton
              styles={styles}
              text={"Show Answer"}
              onPress={this.showAnswer}
            />
          ) : (
            <InfoButton
              styles={styles}
              text={"Show Question"}
              onPress={this.showAnswer}
            />
          )}

          <ActionButton
            styles={styles}
            text={"Correct"}
            onPress={() => this.submitAnswer("true")}
          />
          <ActionButton
            styles={styles}
            text={"Wrong"}
            onPress={() => this.submitAnswer("false")}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.buttonSeparator}>
              <RemoveCard
                deckId={deck}
                currentQNumId={currentQNum}
                onPress={this.props.navigation.navigate("DeckScren", {})}
              />
            </View>
            <MaterialCommunityIcons
              style={styles.addBtn}
              name="plus-box"
              size={30}
              onPress={() =>
                this.props.navigation.navigate("AddCard", { entryId: deck })
              }
            />
          </View>
        </Animated.View>

        <View style={styles.cardNumContainer}>
          <Text style={styles.cardNumText}>
            {number} / {decks[deck].questions.length}
          </Text>
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
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center"
  },
  buttonSeparator: {
    flex: 1
  },
  swipe: {
    flex: 1,
    height: hp("20%"),
    backgroundColor: "#efefef",
    marginBottom: 60,
    width: wp("80%"),
    marginHorizontal: 20,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: hp("14%"),
    paddingBottom: 20,
    paddingHorizontal: 14
  },
  text: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c"
  },
  cardNumText: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    fontSize: 20,
    textAlign: "center"
  },
  cardNumContainer: {
    backgroundColor: "#efefef",
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    justifyContent: "center",
    marginBottom: 50
  },
  deckText: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    textAlign: "center",
    fontSize: 30
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
  },
  addBtn: {
    marginLeft: 10,
    marginBottom: 10,
    color: "#ff0000"
  }
});

export default connect(mapStateToProps)(DeckView);
