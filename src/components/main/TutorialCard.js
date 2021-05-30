import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as carouselActions from "../../redux/actions/carouselActions";

const TutorialCard = ({
  carouselIndex,
  tutorialIndex,
  tutorial,
  stepCarousel,
  onCardClick,
  delta,
  widthScale,
  moveTutorials
}) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const startX = useRef(0);

  useEffect(() => {
    const _leftPosition = calcLeftPosition();
    setLeftPosition(_leftPosition);
  });

  const calcLeftPosition = () => {
    return 24 + carouselIndex * (342 * widthScale + 16) + delta;
  };

  const onCardMovementStart = (e) => {
    e.stopPropagation();
    startX.current = e.touches[0].pageX;
  };

  const onCardMove = (e) => {
    e.stopPropagation();
    moveTutorials(e.touches[0].pageX - startX.current);
  };

  const onMovementEnd = () => {
    const steps = -Math.round(delta / 327);
    stepCarousel(tutorialIndex, steps);
    moveTutorials(0);
  };

  const onClick = (e) => {
    e.stopPropagation();
    onCardClick(tutorial.id);
  };

  return (
    <div
      className="tutorial-card"
      onTouchStart={(e) => onCardMovementStart(e)}
      onTouchMove={(e) => onCardMove(e)}
      onTouchEnd={(e) => onMovementEnd(e)}
      onClick={(e) => onClick(e)}
      style={{
        backgroundImage: `url(../../assets/${tutorial.picture})`,
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        "--index": carouselIndex,
        "--left-position": leftPosition + "px",
        "--width-scale": widthScale
      }}
    >
      <svg
        className="tutorial-card-mask"
        xmlns="http://www.w3.org/2000/svg"
        height={138 * widthScale}
        width={342 * widthScale}
      >
        <linearGradient
          id="tutorialCardMaskGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="0.5"
        >
          <stop offset="0" stopColor="#007aff" />
          <stop offset="1" stopColor="#5ac8fa" />
        </linearGradient>
        <polygon
          points={`0,0 ${342 * widthScale},${46 * widthScale} ${
            342 * widthScale
          },${138 * widthScale} 0, ${138 * widthScale}`}
          fill="url('#tutorialCardMaskGradient')"
        />
      </svg>
      <p className="tutorial-name">{tutorial.name}</p>
      <p className="tutorial-description">{tutorial.description}</p>
    </div>
  );
};

TutorialCard.propTypes = {
  carouselIndex: PropTypes.number.isRequired,
  tutorialIndex: PropTypes.number.isRequired,
  tutorial: PropTypes.object.isRequired,
  stepCarousel: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  moveTutorials: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    delta: state.tutorialsCarouselDelta,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  moveTutorials: carouselActions.moveTutorials
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialCard);
