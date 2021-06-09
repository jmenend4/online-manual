import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const featuresCarouselReducer = (
  delta = initialState.featuresCarouselDelta,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_FEATURES: {
      return action.delta;
    }
    default: {
      return delta;
    }
  }
};

export default featuresCarouselReducer;
