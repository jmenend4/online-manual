import { combineReducers } from "redux";
import featuresCarouselDelta from "./featuresCarouselReducer";
import tutorialsCarousel from "./tutorialsCarouselReducer";
import videosCarousel from "./videosCarouselReducer";
import relatedComponentsCarousel from "./relatedComponentsCarouselReducer";
import features from "./featuresReducer";
import vehicle from "./vehicleReducer";
import constants from "./constantsReducer";
import tutorials from "./tutorialsReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  featuresCarouselDelta,
  tutorialsCarousel,
  videosCarousel,
  relatedComponentsCarousel,
  features,
  vehicle,
  constants,
  tutorials,
  apiCallsInProgress
});

export default rootReducer;
