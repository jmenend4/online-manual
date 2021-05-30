import actionTypes from "./actionTypes";
import * as client from "../../api/client";
import { beginApiCall } from "./apiStatusActions";

export const getTutorialsSuccess = (tutorials) => {
  return { type: actionTypes.GET_TUTORIALS, tutorials };
};

export const getTutorials = () => {
  return (dispatch) => {
    dispatch(beginApiCall());
    return client
      .getTutorials()
      .then((tutorials) => dispatch(getTutorialsSuccess(tutorials)));
  };
};
