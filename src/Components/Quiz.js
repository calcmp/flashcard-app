import React from "react";
import { NavigationActions } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import SubmitButton from "./SubmitButton.js";
import { connect } from "react-redux";
import ActionButton from "./ActionButton.js";
import InfoButton from "./InfoButton.js";

class Quiz extends React.Component {
  static navigationOptions = {
    title: "Quiz"
  };

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

    if (questionNum === decks[deck].questions.length) {
      return (
        <View style={styles.container}>
          <Text>
            You got {this.state.correct} out of {decks[deck].questions.length}
          </Text>

          <ActionButton
            styles={styles}
            text={"Replay"}
            onPress={this.replayQuiz}
          />

          <ActionButton styles={styles} text={"Back"} onPress={this.goBack} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>
          {number} / {decks[deck].questions.length}
        </Text>
        {!this.state.showQuestion ? (
          <Text>{decks[deck].questions[questionNum].question}</Text>
        ) : (
          <Text>{decks[deck].questions[questionNum].answer}</Text>
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

        <Text>
          {correct} / {decks[deck].questions.length}
        </Text>
        <Text>
          {incorrect} / {decks[deck].questions.length}
        </Text>
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
    alignItems: "center"
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

export default connect(mapStateToProps)(Quiz);
