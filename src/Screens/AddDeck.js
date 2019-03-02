import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { saveDeckTitle } from "../Utils/Api.js";
import { addDeck } from "../Actions/index.js";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import SubmitButton from "../Components/SubmitButton.js";
import { AdMobBanner } from "expo";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class AddDeck extends React.Component {
  state = {
    text: ""
  };

  submitName = () => {
    const { text } = this.state;

    if (this.state.text) {
      saveDeckTitle(text);
      this.props.dispatch(addDeck(text));
      this.props.navigation.navigate("DeckScreen", { entryId: text });
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TextInput
            style={styles.titleText}
            multiline={true}
            maxLength={60}
            placeholder="Tap here to enter deck name"
            placeholderTextColor="#3c3c3c"
            onChangeText={text => this.setState({ text: text })}
            value={this.state.text}
          />
        </View>
        <SubmitButton styles={styles} onPress={this.submitName} />

        <AdMobBanner
          style={{ position: "absolute", bottom: 0 }}
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-7050295070567611/6019121783" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  button: {
    height: hp("20%"),
    backgroundColor: "#efefef",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#adadad",
    borderBottomWidth: 1,
    elevation: 0.5,
    marginHorizontal: 20,
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    fontFamily: "sans-serif-light",
    color: "#3c3c3c",
    textAlign: "center"
  },
  submitBtnText: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    color: "green",
    textAlign: "center"
  },
  submitBtn: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#efefef",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 20,
    marginHorizontal: 80,
    borderColor: "green"
  }
});

export default connect()(AddDeck);
