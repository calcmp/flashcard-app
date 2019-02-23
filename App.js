import React from "react";
import Navigator from "./src/Navigation/Navigator.js";
import { Provider } from "react-redux";
import reducer from "./src/Reducers/index.js";
import { createStore } from "redux";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Navigator />
      </Provider>
    );
  }
}
