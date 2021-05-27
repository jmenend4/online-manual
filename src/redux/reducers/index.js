import { combineReducers } from "redux";
import featuresCarouselHMovementDelta from "./featuresCarouselReducer";
import features from "./featuresReducer";
import vehicle from "./vehicleReducer";
import constants from "./constantsReducer";

const rootReducer = combineReducers({
  featuresCarouselHMovementDelta,
  features,
  vehicle,
  constants
});

export default rootReducer;
