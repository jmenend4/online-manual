import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const tutorialsReducer = (state = initialState.tutorials, action) => {
  switch (action.type) {
    case actionTypes.GET_TUTORIALS: {
      return action.tutorials;
    }
    default: {
      return state;
    }
  }
};

export default tutorialsReducer;
