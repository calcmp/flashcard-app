import React from "react";
import { StyleSheet, View, Animated, Dimensions, Text } from "react-native";
import { AdMobBanner } from "expo";

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

          <AdMobBanner
            style={{ position: "absolute", bottom: 0 }}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-1548251077535465/6579386800" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            onDidFailToReceiveAdWithError={this.bannerError}
          />
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
    fontSize: 20,
    marginTop: 26,
    marginBottom: -20,
    marginHorizontal: 30
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
  }
});

export default InfoScreen;
