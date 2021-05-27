import actionTypes from "./actionTypes";
import * as client from "../../api/client";

export const getTutorialsSuccess = (tutorials) => {
  return { type: actionTypes.GET_TUTORIALS, tutorials };
};

export const getTutorials = () => {
  return (dispatch) => {
    return client
      .getTutorials()
      .then((tutorials) => dispatch(getTutorialsSuccess(tutorials)));
  };
};
