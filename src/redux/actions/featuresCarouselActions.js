import actionTypes from "./actionTypes";

export function setHmovementDeltaSuccess(delta) {
  return { type: actionTypes.SET_FEATURES_CAROUSEL_HMOVEMENT_DELTA, delta };
}

export function setHmovementDelta(delta) {
  return function (dispatch) {
    dispatch(setHmovementDeltaSuccess(delta));
  };
}
