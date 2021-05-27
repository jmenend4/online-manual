import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as featuresCarouselActions from "../../redux/actions/featuresCarouselActions";
import "./feature-card.css";

const FeatureCard = ({
  featureIndex,
  index,
  title,
  stepCarousel,
  hMovementDelta,
  setHMovementDelta
}) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(5);
  const startX = useRef(0);
  const card = useRef(null);

  useEffect(() => {
    const _leftPosition = calcLeftPosition();
    setLeftPosition(_leftPosition);
    setBottomPosition(calcBottomPosition(_leftPosition));
  });

  const calcLeftPosition = () => {
    return 24 + index * 335 + hMovementDelta;
  };

  const calcBottomPosition = (_leftPosition) => {
    let _bottomPosition = 5;
    if (card.current.getBoundingClientRect().left > 24) {
      _bottomPosition = 5 - 212 * ((_leftPosition - 24) / 327);
    } else {
      _bottomPosition = 5 - 212 * ((24 - _leftPosition) / 327);
    }
    return _bottomPosition < -207 ? -207 : _bottomPosition;
  };

  const onCardMovementStart = (e) => {
    e.stopPropagation();
    startX.current = e.touches[0].pageX;
  };

  const onCardMove = (e) => {
    e.stopPropagation();
    setHMovementDelta(e.touches[0].pageX - startX.current);
  };

  const onMovementEnd = () => {
    const steps = -Math.round(hMovementDelta / 327);
    stepCarousel(featureIndex, steps);
    setHMovementDelta(0);
  };

  return (
    <div
      ref={card}
      className="component-mini-card"
      onTouchStart={(e) => onCardMovementStart(e)}
      onDragStart={(e) => onCardMovementStart(e)}
      onTouchMove={(e) => onCardMove(e)}
      onDragOver={(e) => onCardMove(e)}
      onTouchEnd={() => onMovementEnd()}
      onDragEnd={() => onMovementEnd()}
      style={{
        "--index": index,
        "--left-position": leftPosition + "px",
        "--bottom-position": bottomPosition + "px"
      }}
    >
      <div className="title">{title}</div>
    </div>
  );
};

FeatureCard.propTypes = {
  featureIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  stepCarousel: PropTypes.func.isRequired,
  hMovementDelta: PropTypes.number.isRequired,
  setHMovementDelta: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setHMovementDelta: featuresCarouselActions.setHmovementDelta
};

const mapStateToProps = (state) => {
  return { hMovementDelta: state.featuresCarouselHMovementDelta };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeatureCard);
