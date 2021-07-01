import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

const featuresReducer = (features = initialState.features, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_FEATURES: {
      const _features = [];
      for (let i = 0; i < action.features.length; i++) {
        _features.push(null);
      }
      action.features.forEach((feature) => {
        _features[feature.class] = {
          ...feature,
          key: "_FEATURE_" + feature.class
        };
      });
      return _features;
    }
    default: {
      return features;
    }
  }
};

export default featuresReducer;
