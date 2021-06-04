import actionTypes from "./actionTypes";

const moveFeaturesSuccess = (delta) => {
  return { type: actionTypes.MOVE_FEATURES, delta };
};

export function moveFeatures(delta) {
  return function (dispatch) {
    dispatch(moveFeaturesSuccess(delta));
  };
}

const moveTutorialsSuccess = (delta) => {
  return { type: actionTypes.MOVE_TUTORIALS, delta };
};

export const moveTutorials = (delta) => {
  return (dispatch) => {
    dispatch(moveTutorialsSuccess(delta));
  };
};

const stepTutorialsCarouselSuccess = (index) => {
  return { type: actionTypes.STEP_TUTORIALS, index };
};

export const stepTutorialsCarousel = (cardIndex, steps, totalCards) => {
  return (dispatch) => {
    const index = calcIndexBySteps(cardIndex, steps, totalCards);
    dispatch(stepTutorialsCarouselSuccess(index));
  };
};

const moveVideosSuccess = (delta) => {
  return { type: actionTypes.MOVE_VIDEOS, delta };
};

export const moveVideos = (delta) => {
  return (dispatch) => {
    dispatch(moveVideosSuccess(delta));
  };
};

const stepVideosCarouselSuccess = (index) => {
  return { type: actionTypes.STEP_VIDEOS, index };
};

export const stepVideosCarousel = (cardIndex, steps, totalCards) => {
  return (dispatch) => {
    const index = calcIndexBySteps(cardIndex, steps, totalCards);
    dispatch(stepVideosCarouselSuccess(index));
  };
};

const calcIndexBySteps = (cardIndex, steps, totalCards) => {
  const index = cardIndex + steps;
  if (index < 0) {
    return 0;
  }
  if (index >= totalCards) {
    return totalCards - 1;
  }
  return index;
};
