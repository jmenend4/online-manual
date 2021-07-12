import React from "react";
import { Route, Switch } from "react-router-dom";
import Detector from "./detector/Detector";
import DemoDetector from "./detector/DemoDetector";
import MainPage from "./main/MainPage";
import Tutorial from "./tutorial/Tutorial";
import "./app.css";

class App extends React.Component {
  state = { errorMessage: null };

  componentDidCatch(error, info) {
    this.setState({ errorMessage: error.message });
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/tutorials/:id" component={Tutorial} />
          <Route path="/detector" component={Detector} />
          <Route path="/demo" component={DemoDetector} />
          {/* todo <Route component={PageNotFound} /> */}
        </Switch>
        {this.state.errorMessage && (
          <p
            style={{ position: "absolute", top: "0", left: "0", color: "red" }}
          >
            {this.state.errorMessage}
          </p>
        )}
        <div className="landscape-warning">
          Por favor colocar el celular en posición vertical
        </div>
      </>
    );
  }
}

export default App;

// const App = () => {
//   // return <FeaturesCarousel />;
//   return (
//     <Switch>
//       <Route exact path="/" component={MainPage} />
//       <Route path="/tutorials/:id" component={Tutorial} />
//       <Route path="/detector" component={Detector} />
//       {/* todo <Route component={PageNotFound} /> */}
//     </Switch>
//   );
// };

// export default App;
