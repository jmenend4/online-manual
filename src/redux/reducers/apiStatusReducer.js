import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const actionTypeIsSuccess = (type) => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

export const apiStatusReducer = (
  state = initialState.apiCallsInProgress,
  action
) => {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeIsSuccess(action.type)) {
    return state - 1;
  }

  return state;
};

export default apiStatusReducer;
