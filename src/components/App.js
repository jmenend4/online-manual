import React from "react";
import { Route, Switch } from "react-router-dom";
import Detector from "./detector/Detector";
import MainPage from "./main/MainPage";
import Tutorial from "./tutorial/Tutorial";

const App = () => {
  // return <FeaturesCarousel />;
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/tutorials/:id" component={Tutorial} />
      <Route path="/detector" component={Detector} />
      {/* todo <Route component={PageNotFound} /> */}
    </Switch>
  );
};

export default App;
