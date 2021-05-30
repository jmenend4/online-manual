import actionTypes from "./actionTypes";
import * as client from "../../api/client";
import { beginApiCall } from "./apiStatusActions";

export const getVehicleSuccess = (vehicle) => {
  return { type: actionTypes.GET_VEHICLE, vehicle };
};

export const getVehicle = () => {
  //pendind add userId to make the fetch
  return (dispatch) => {
    dispatch(beginApiCall());
    return client
      .getVehicle()
      .then((vehicle) => dispatch(getVehicleSuccess(vehicle)));
  };
};
