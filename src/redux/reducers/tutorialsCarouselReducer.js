import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const tutorialsCarouselReducer = (
  delta = initialState.tutorialsCarouselDelta,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_TUTORIALS: {
      return action.delta;
    }
    default: {
      return delta;
    }
  }
};

export default tutorialsCarouselReducer;
