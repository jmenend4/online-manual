import actionTypes from "./actionTypes";

export const moveFeaturesSuccess = (delta) => {
  return { type: actionTypes.MOVE_FEATURES, delta };
};

export const moveTutorialsSuccess = (delta) => {
  return { type: actionTypes.MOVE_TUTORIALS, delta };
};

export function moveFeatures(delta) {
  return function (dispatch) {
    dispatch(moveFeaturesSuccess(delta));
  };
}

export const moveTutorials = (delta) => {
  return (dispatch) => {
    dispatch(moveTutorialsSuccess(delta));
  };
};
