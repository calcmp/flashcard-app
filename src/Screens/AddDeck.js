import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { saveDeckTitle } from "../Utils/Api.js";
import { addDeck } from "../Actions/index.js";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import SubmitButton from "../Components/SubmitButton.js";
import { AdMobBanner } from "expo";

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
      this.props.navigation.navigate("DeckScreen", { entryId: text });
      this.props.navigation.navigate("DeckScreen", { entryId: text });
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
            placeholderTextColor="hsl(184, 91%, 17%)"
            onChangeText={text => this.setState({ text: text })}
            value={this.state.text}
          />
        </View>
        <SubmitButton styles={styles} onPress={this.submitName} />

        <AdMobBanner
          style={{ position: "absolute", bottom: 0 }}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-1548251077535465/6579386800" // Test ID, Replace with your-admob-unit-id
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
    backgroundColor: "hsl(210, 36%, 96%)"
  },
  button: {
    height: hp("20%"),
    backgroundColor: "hsl(212, 33%, 89%)",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 1,
    marginHorizontal: 20,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "hsl(185, 81%, 29%)",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "hsl(184, 91%, 17%)",
    textAlign: "center"
  },
  submitBtnText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "hsl(212, 33%, 89%)",
    textAlign: "center"
  },
  submitBtn: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: "hsl(185, 81%, 29%)",
    overflow: "hidden",
    marginTop: 20,
    marginHorizontal: 80
  }
});

export default connect()(AddDeck);
