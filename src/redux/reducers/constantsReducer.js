import initialState from "./initialState";

const constantsReducer = (constants = initialState.constants, action) => {
  // iPhone 11 defaults
  const defaultWidth = 414;
  const defaultHeight = 896;
  const widthScale = document.documentElement.clientWidth / defaultWidth;
  const heightScale = document.documentElement.clientHeight / defaultHeight;
  return {
    widthScale,
    heightScale
  };
};

export default constantsReducer;
