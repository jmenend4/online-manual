import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useCarouselCard } from "../../../../hooks/carouselHooks";
import * as carouselActions from "../../../../redux/actions/carouselActions";
import "./tutorial-card.css";

const TutorialCard = ({
  cardIndex,
  tutorials,
  currentIndex,
  stepCarousel,
  onCardClick,
  delta,
  widthScale,
  moveCarousel
}) => {
  const [leftPosition, onMoveStart, onMove, onMoveEnd] = useCarouselCard(
    cardIndex,
    342 * widthScale,
    currentIndex,
    delta,
    moveCarousel,
    stepCarousel,
    tutorials.length
  );

  // const card = useRef(null);

  // useEffect(() => {
  //   card.current.addEventListener("touchmove", onMove, { passive: false });
  //   return () => card.current.removeEventListener("touchmove", onMove);
  // }, [onMove]);

  const onClick = (e) => {
    e.stopPropagation();
    onCardClick(tutorials[cardIndex].id);
  };

  return (
    <div
      // ref={card}
      className="tutorial-card"
      onTouchStart={(e) => onMoveStart(e)}
      onTouchMove={(e) => onMove(e)}
      onTouchEnd={(e) => onMoveEnd(e)}
      onClick={(e) => onClick(e)}
      style={{
        backgroundImage: `url(${tutorials[cardIndex].picture})`,
        backgroundSize: "cover",
        "--left-position": leftPosition + "px",
        "--width-scale": widthScale
      }}
    >
      <svg
        className="tutorial-card-mask"
        xmlns="http://www.w3.org/2000/svg"
        height={142 * widthScale}
        width={346 * widthScale}
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
          points={`0,0 ${346 * widthScale},${48 * widthScale} ${
            346 * widthScale
          },${142 * widthScale} 0, ${142 * widthScale}`}
          fill="url('#tutorialCardMaskGradient')"
        />
      </svg>
      <p className="tutorial-name">{tutorials[cardIndex].name}</p>
      <p className="tutorial-description">{tutorials[cardIndex].description}</p>
    </div>
  );
};

TutorialCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  tutorials: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  stepCarousel: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  moveCarousel: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    delta: state.tutorialsCarousel.delta,
    currentIndex: state.tutorialsCarousel.currentIndex,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  moveCarousel: carouselActions.moveTutorials,
  stepCarousel: carouselActions.stepTutorialsCarousel
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialCard);
