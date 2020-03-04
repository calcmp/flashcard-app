import React from "react";
import { StyleSheet, View, Animated, Dimensions, Text } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class InfoScreen extends React.Component {
  render() {
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
              <Text style={styles.deckText}>
                Flashcards allow you to study certain subjects.
              </Text>
              <Text style={styles.deckText}>
                Press "New Deck" to add your own deck. Inside your deck you can
                add your cards.
              </Text>
              <Text style={styles.deckText}>
                Enter a question and answer on the card and press submit to add
                it to your deck.
              </Text>
              <Text style={styles.deckText}>
                Test your knowledge by checking if you know the answer to the
                question on your card. If you were correct swipe right, if you
                were wrong, swipe left.
              </Text>
              <Text style={styles.deckText}>
                Check your results at the end of the deck.
              </Text>
              <View style={styles.cardNumContainer}>
                <Text style={styles.cardNumText}>1 / 1</Text>
              </View>
            </View>
          </Animated.View>
          <View style={{ height: 10 }} />
        </View>
      </View>
    );
  }
}

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
    borderColor: "hsl(185, 81%, 29%)",
    borderWidth: 1.5
  },
  deckText: {
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    textAlign: "center",
    fontSize: 20,
    marginTop: 26,
    marginBottom: -20,
    marginHorizontal: 30,
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
  }
});

export default InfoScreen;
