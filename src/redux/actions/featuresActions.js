import actionTypes from "./actionTypes";
import * as client from "../../api/client";
import { beginApiCall } from "./apiStatusActions";

const initializeFeaturesSuccess = (features) => {
  return { type: actionTypes.INITIALIZE_FEATURES, features };
};

export const initializeFeatures = () => {
  return (dispatch) => {
    dispatch(beginApiCall());
    return client.getAllFeatures().then((features) => {
      dispatch(initializeFeaturesSuccess(features));
    });
  };
};
