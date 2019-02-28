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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
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
                  <Text style={styles.deckText}>{item.question}</Text>
                ) : (
                  <Text style={styles.deckText}>
                    <Text style={styles.deckText}>{item.answer}</Text>
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
                    this.props.navigation.navigate("AddCard", { entryId: deck })
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
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000
                }}
              >
                <Text style={styles.correct}>CORRECT</Text>
              </Animated.View>
              <Animated.View
                style={{
                  opacity: this.wrongOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000
                }}
              >
                <Text style={styles.wrong}>WRONG</Text>
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
                  <Text style={styles.deckText}>{item.question}</Text>
                ) : (
                  <Text style={styles.deckText}>
                    <Text style={styles.deckText}>{item.answer}</Text>
                  </Text>
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
        <View style={{ flex: 1, backgroundColor: "#efefef" }}>
          <View style={{ height: 10 }} />
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 460,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                  flex: 1
                }
              ]}
            >
              <View style={styles.container}>
                <Text style={styles.deckText}>
                  Correct: {this.state.correct} / {decks[deck].questions.length}
                  {"\n"}
                  Incorrect: {this.state.incorrect} /{" "}
                  {decks[deck].questions.length}
                </Text>

                <TouchableOpacity
                  style={styles.replay}
                  onPress={this.replayQuiz}
                >
                  <Text style={styles.deckText}>Replay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.back} onPress={this.goBack}>
                  <Text style={styles.deckText}>Back</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <View style={{ height: 10 }} />
          </View>
        </View>
      );
    }
    if (decks[deck].questions.length === 0) {
      return (
        <View style={{ flex: 1, backgroundColor: "#efefef" }}>
          <View style={{ height: 10 }} />
          <View style={{ flex: 1 }}>
            <Animated.View
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

            <View style={{ height: 10 }} />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#efefef" }}>
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
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 6
  },
  swipe: {
    flex: 1,
    height: hp("20%"),
    backgroundColor: "white",
    marginBottom: 60,
    width: wp("90%"),
    marginHorizontal: 10,
    borderRadius: 10
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
    height: 60,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
  deckText: {
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    marginHorizontal: 30
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
  replay: {
    padding: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    alignSelf: "flex-start"
  },
  back: {
    padding: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "absolute",
    bottom: 0,
    width: null,
    flex: 1,
    marginBottom: 14,
    alignSelf: "flex-end"
  },
  addBtn: {
    color: "#ff0000",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 100
  },
  correct: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  },
  wrong: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  }
});

export default connect(mapStateToProps)(DeckView);
