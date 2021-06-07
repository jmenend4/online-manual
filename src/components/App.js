import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./main/MainPage";
import Tutorial from "./tutorial/Tutorial";

const App = () => {
  // return <FeaturesCarousel />;
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/tutorials/:id" component={Tutorial} />
      {/* todo <Route component={PageNotFound} /> */}
    </Switch>
  );
};

export default App;
