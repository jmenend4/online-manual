import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const featuresCarouselReducer = (
  delta = initialState.featuresCarouselHMovementDelta,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_FEATURES_CAROUSEL_HMOVEMENT_DELTA: {
      return action.delta;
    }
    default: {
      return delta;
    }
  }
};

export default featuresCarouselReducer;
