import { combineReducers } from "redux";
import featuresCarouselDelta from "./featuresCarouselReducer";
import tutorialsCarouselDelta from "./tutorialsCarouselReducer";
import features from "./featuresReducer";
import vehicle from "./vehicleReducer";
import constants from "./constantsReducer";
import tutorials from "./tutorialsReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  featuresCarouselDelta,
  tutorialsCarouselDelta,
  features,
  vehicle,
  constants,
  tutorials,
  apiCallsInProgress
});

export default rootReducer;
