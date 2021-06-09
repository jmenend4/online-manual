import actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const vehicleReducer = (vehicle = initialState.vehicle, action) => {
  switch (action.type) {
    case actionTypes.GET_VEHICLE: {
      return action.vehicle;
    }
    default: {
      return vehicle;
    }
  }
};

export default vehicleReducer;
