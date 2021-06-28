import initialState from "./initialState";

const constantsReducer = (constants = initialState.constants, action) => {
  // iPhone 11 defaults
  const defaultWidth = 414;
  const defaultHeight = 896;
  const viewPortWidth =
    document.documentElement.clientWidth > 414
      ? 414
      : document.documentElement.clientWidth;
  const viewPortHeight =
    document.documentElement.clientHeight > 896
      ? 896
      : document.documentElement.clientHeight;
  const widthScale = viewPortWidth / defaultWidth;
  const heightScale = viewPortHeight / defaultHeight;
  return {
    viewPortHeight,
    viewPortWidth,
    widthScale,
    heightScale
  };
};

export default constantsReducer;
