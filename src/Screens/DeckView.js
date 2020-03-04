import React from "react";
import { NavigationActions } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import RemoveCard from "../Components/RemoveCard.js";
import InfoButton from "../Components/InfoButton.js";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DeckView extends React.Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      questionNum: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0,
      currentIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.correctOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.wrongOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          this.submitAnswer("true");
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          this.submitAnswer("false");
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {
              x: 0,
              y: 0
            },
            friction: 4
          }).start();
        }
      }
    });
  }

  showAnswer = () => {
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });
  };

  submitAnswer = answer => {
    if (answer.trim() === "true") {
      this.setState({ correct: this.state.correct + 1 });
    } else if (answer.trim() === "false") {
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
      incorrect: 0,
      currentIndex: 0
    });
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  renderCard = () => {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;
    const questions = decks[deck].questions;
    const currentQNum = this.props.navigation.state.params.questionNumId;
    const number = this.state.questionNum + 1;

    return questions
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i === this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={i}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 160,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                  flex: 1
                }
              ]}
            >
              <View style={styles.container}>
                {!this.state.showQuestion ? (
                  <Text style={styles.deckTextQuestion}>{item.question}</Text>
                ) : (
                  <Text numberOfLines={13} style={styles.deckTextAnswer}>
                    {item.answer}
                  </Text>
                )}
                {!this.state.showQuestion ? (
                  <InfoButton
                    text={"Show Answer  "}
                    styles={styles}
                    onPress={this.showAnswer}
                  />
                ) : (
                  <InfoButton
                    text={"Show Question "}
                    styles={styles}
                    onPress={this.showAnswer}
                  />
                )}
                <RemoveCard
                  deckId={deck}
                  currentQNumId={currentQNum}
                  onPress={this.props.navigation.navigate("DeckScren", {})}
                />
                <MaterialCommunityIcons
                  style={styles.addBtn}
                  name="plus-box"
                  size={30}
                  onPress={() =>
                    this.props.navigation.navigate("AddCard", {
                      entryId: deck
                    })
                  }
                />
                <View style={styles.cardNumContainer}>
                  <Text style={styles.cardNumText}>
                    {number} / {decks[deck].questions.length}
                  </Text>
                </View>
              </View>
              <Animated.View
                style={{
                  opacity: this.correctOpacity,
                  transform: [{ rotate: "10deg" }],
                  position: "absolute",
                  alignSelf: "center",
                  top: 160,
                  zIndex: 1000,
                  elevation: 1
                }}
              >
                <MaterialCommunityIcons
                  style={styles.correct}
                  name="check"
                  size={100}
                />
              </Animated.View>

              <Animated.View
                style={{
                  opacity: this.wrongOpacity,
                  transform: [{ rotate: "-10deg" }],
                  position: "absolute",
                  alignSelf: "center",
                  top: 160,
                  zIndex: 1000,
                  elevation: 1
                }}
              >
                <Text style={styles.wrong}> X </Text>
              </Animated.View>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: SCREEN_HEIGHT - 160,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute"
                }
              ]}
            >
              <View style={styles.container}>
                {!this.state.showQuestion ? (
                  <Text style={styles.deckTextQuestion}>{item.question}</Text>
                ) : (
                  <Text style={styles.deckTextAnswer}>{item.answer}</Text>
                )}

                {!this.state.showQuestion ? (
                  <InfoButton
                    styles={styles}
                    text={"Show Answer  "}
                    onPress={this.showAnswer}
                  />
                ) : (
                  <InfoButton
                    styles={styles}
                    text={"Show Question "}
                    onPress={this.showAnswer}
                  />
                )}

                <RemoveCard
                  deckId={deck}
                  currentQNumId={currentQNum}
                  onPress={this.props.navigation.navigate("DeckScren", {})}
                />
                <MaterialCommunityIcons
                  style={styles.addBtn}
                  name="plus-box"
                  size={30}
                  onPress={() =>
                    this.props.navigation.navigate("AddCard", { entryId: deck })
                  }
                />
                <View style={styles.cardNumContainer}>
                  <Text style={styles.cardNumText}>
                    {number} / {decks[deck].questions.length}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;
    const questionNum = this.state.questionNum;
    const currentQNum = this.props.navigation.state.params.questionNumId;
    const number = this.state.questionNum;

    if (
      questionNum === decks[deck].questions.length &&
      decks[deck].questions.length >= 1
    ) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ height: 10 }} />
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                height: SCREEN_HEIGHT - 260,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
                flex: 1
              }}
            >
              <View style={styles.container}>
                <Text style={styles.correctText}>
                  Correct: {this.state.correct}/{decks[deck].questions.length}
                </Text>
                <Text style={styles.deckText} />
                <Text style={styles.incorrectText}>
                  Incorrect: {this.state.incorrect}/
                  {decks[deck].questions.length}
                </Text>

                <TouchableOpacity
                  style={styles.replay}
                  onPress={this.replayQuiz}
                >
                  <Text style={styles.replayText}>Replay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.back} onPress={this.goBack}>
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.cardNumContainer} />
              </View>
            </Animated.View>

            <View style={{ height: 10 }} />
          </View>
        </View>
      );
    }
    if (decks[deck].questions.length === 0) {
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
                <Text style={styles.deckTextAnswer}>
                  Tap the{" "}
                  <MaterialCommunityIcons
                    style={styles.addBtn}
                    name="plus-box"
                    size={30}
                    onPress={() =>
                      this.props.navigation.navigate("AddCard", {
                        entryId: deck
                      })
                    }
                  />{" "}
                  icon to add your first card!
                </Text>
                <MaterialCommunityIcons
                  style={styles.removeBtn}
                  name="minus-box"
                  size={30}
                />
                <MaterialCommunityIcons
                  style={styles.addBtn}
                  name="plus-box"
                  size={30}
                  onPress={() =>
                    this.props.navigation.navigate("AddCard", { entryId: deck })
                  }
                />
                <View style={styles.cardNumContainer}>
                  <Text style={styles.cardNumText}>
                    {number} / {decks[deck].questions.length}
                  </Text>
                </View>
              </View>
            </Animated.View>
            <View style={{ height: 10 }} />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 10 }} />
        <View style={{ flex: 1 }}>
          {this.renderCard()}
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "hsl(185, 81%, 29%)"
  },
  deckText: {
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    textAlign: "center",
    fontSize: 20,
    marginTop: 26,
    marginBottom: -20,
    marginHorizontal: 30
  },
  deckTextQuestion: {
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    textAlign: "center",
    justifyContent: "center",
    marginTop: -100,
    fontSize: 28,
    fontWeight: "400",
    marginHorizontal: 30
  },
  deckTextAnswer: {
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    textAlign: "center",
    paddingTop: 50,
    marginTop: -100,
    marginHorizontal: 30,
    fontSize: 28,
    fontWeight: "400"
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
  submitBtnText: {
    fontFamily: "Roboto",
    color: "hsl(210, 22%, 49%)",
    fontSize: 18,
    textAlign: "center"
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
  replay: {
    padding: 2,
    backgroundColor: "hsl(185, 81%, 29%)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    borderRadius: 4,
    marginLeft: 242,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: "flex-start"
  },
  replayText: {
    fontFamily: "Roboto",
    color: "hsl(212, 33%, 89%)",
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
  backText: {
    fontFamily: "Roboto",
    color: "hsl(211, 39%, 23%)",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 0,
    marginHorizontal: 30
  },
  addBtn: {
    color: "hsl(330, 72%, 65%)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 100
  },
  correct: {
    borderWidth: 1,
    borderColor: "hsl(42, 78%, 60%)",
    color: "hsl(42, 78%, 60%)",
    padding: 10,
    borderRadius: 6
  },
  wrong: {
    borderWidth: 1,
    borderColor: "hsl(360, 67%, 44%)",
    color: "hsl(360, 67%, 44%)",
    fontSize: 70,
    fontWeight: "800",
    padding: 20,
    borderRadius: 6
  },
  correctText: {
    backgroundColor: "hsl(185, 81%, 19%)",
    color: "hsl(212, 33%, 89%)",
    fontSize: 34,
    padding: 10,
    borderRadius: 6,
    fontFamily: "Roboto",
    marginTop: -60
  },
  incorrectText: {
    backgroundColor: "hsl(185, 81%, 29%)",
    color: "hsl(212, 33%, 89%)",
    fontSize: 30,
    padding: 10,
    borderRadius: 6,
    fontFamily: "Roboto"
  },
  removeBtn: {
    color: "hsl(330, 87%, 85%)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20
  }
});

export default connect(mapStateToProps)(DeckView);
