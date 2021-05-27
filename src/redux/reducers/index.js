import { combineReducers } from "redux";
import featuresCarouselHMovementDelta from "./featuresCarouselReducer";
import features from "./featuresReducer";
import vehicle from "./vehicleReducer";
import constants from "./constantsReducer";
import tutorials from "./tutorialsReducer";

const rootReducer = combineReducers({
  featuresCarouselHMovementDelta,
  features,
  vehicle,
  constants,
  tutorials
});

export default rootReducer;
