import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const tutorialsCarouselReducer = (
  state = initialState.tutorialsCarousel,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_TUTORIALS: {
      return { ...state, delta: action.delta };
    }
    case actionTypes.STEP_TUTORIALS: {
      return { ...state, currentIndex: action.index };
    }
    default: {
      return state;
    }
  }
};

export default tutorialsCarouselReducer;
