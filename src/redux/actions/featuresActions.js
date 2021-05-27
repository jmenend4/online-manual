import actionTypes from "./actionTypes";
import * as client from "../../api/client";

const initializeFeaturesSuccess = (features) => {
  return { type: actionTypes.INITIALIZE_FEATURES, features };
};

export const initializeFeatures = () => {
  return (dispatch) => {
    return client.getAllFeatures().then((features) => {
      dispatch(initializeFeaturesSuccess(features));
    });
  };
};
