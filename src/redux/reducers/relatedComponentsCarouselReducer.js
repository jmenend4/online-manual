import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const relatedComponentsCarouselReducer = (
  state = initialState.relatedComponentsCarousel,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_RELATED_COMPONENTS: {
      return { ...state, delta: action.delta };
    }
    case actionTypes.STEP_RELATED_COMPONENTS: {
      return { ...state, currentIndex: action.index };
    }
    default: {
      return state;
    }
  }
};

export default relatedComponentsCarouselReducer;
