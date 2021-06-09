import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const tutorialsReducer = (state = initialState.tutorials, action) => {
  switch (action.type) {
    case actionTypes.GET_TUTORIALS: {
      const _tutorials = action.tutorials.map((tutorial, idx) => {
        return { key: "_TUTORIAL_" + idx, ...tutorial };
      });
      return _tutorials;
    }
    default: {
      return state;
    }
  }
};

export default tutorialsReducer;
