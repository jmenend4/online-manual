import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

// screen.orientation.lock();
// screen.lockOrientation("portrait");
// does not work on safari over ios. it prevents de page to load completely

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
