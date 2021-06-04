import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const videosCarouselReducer = (state = initialState.videosCarousel, action) => {
  switch (action.type) {
    case actionTypes.MOVE_VIDEOS: {
      return { ...state, delta: action.delta };
    }
    case actionTypes.STEP_VIDEOS: {
      return { ...state, currentIndex: action.index };
    }
    default: {
      return state;
    }
  }
};

export default videosCarouselReducer;
