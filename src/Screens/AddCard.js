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
      <View style={{ flex: 1 }}>
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
                placeholderTextColor="hsl(209, 34%, 30%)"
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
              />

              <TextInput
                style={[
                  {
                    fontFamily: "Roboto",
                    color: "hsl(209, 34%, 30%)",
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
                placeholderTextColor="hsl(209, 34%, 30%)"
                onChangeText={this.onChangeTextAnswer.bind(this)}
                value={this.state.answer}
              />
              <TouchableOpacity
                style={styles.confirm}
                onPress={() => this.submitCard(deckName)}
              >
                <Text style={styles.confirmBtnText}>Confirm{"      "}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.back} onPress={this.goBack}>
                <Text style={styles.backBtnText}>Back</Text>
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
    borderRadius: 10,
    backgroundColor: "hsl(212, 33%, 89%)",
    marginHorizontal: 6,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "hsl(185, 81%, 29%)"
  },
  deckText: {
    fontFamily: "Roboto",
    color: "hsl(209, 34%, 30%)",
    textAlign: "center",
    fontSize: 20,
    marginTop: 26,
    marginBottom: -20,
    marginHorizontal: 30,
    fontWeight: "400"
  },
  backBtnText: {
    fontFamily: "Roboto",
    color: "hsl(211, 39%, 23%)",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 0,
    marginHorizontal: 30
  },
  back: {
    padding: 6,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "hsl(212, 33%, 89%)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    alignSelf: "flex-start",
    marginLeft: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "hsl(209, 23%, 60%)"
  },
  confirmBtnText: {
    fontFamily: "Roboto",
    color: "hsl(212, 33%, 89%)",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 0,
    marginLeft: 22,
    marginRight: -8
  },
  confirm: {
    padding: 2,
    backgroundColor: "hsl(185, 81%, 29%)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    borderRadius: 4,
    marginLeft: 246,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: "flex-start"
  },
  cardNumText: {
    fontFamily: "Roboto",
    color: "hsl(210, 36%, 65%)",
    fontSize: 20,
    textAlign: "center"
  },
  cardNumContainer: {
    backgroundColor: "hsl(210, 36%, 96%)",
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "hsl(185, 81%, 29%)"
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
