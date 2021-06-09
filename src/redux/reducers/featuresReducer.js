import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const featuresReducer = (features = initialState.features, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_FEATURES: {
      const _features = action.features.map((feature, idx) => {
        return { ...feature, key: "_FEATURE_" + idx };
      });
      return _features;
    }
    default: {
      return features;
    }
  }
};

export default featuresReducer;
