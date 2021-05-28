import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as carouselActions from "../../redux/actions/carouselActions";
import "./feature-card.css";

const FeatureCard = ({
  featureIndex,
  index,
  title,
  stepCarousel,
  delta,
  moveFeatures
}) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(5);
  const startX = useRef(0);

  useEffect(() => {
    const _leftPosition = calcLeftPosition();
    setLeftPosition(_leftPosition);
    setBottomPosition(calcBottomPosition(_leftPosition));
  });

  const calcLeftPosition = () => {
    return 24 + index * 335 + delta;
  };

  const calcBottomPosition = (_leftPosition) => {
    let _bottomPosition = 5;
    if (_leftPosition > 24) {
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
    moveFeatures(e.touches[0].pageX - startX.current);
  };

  const onMovementEnd = () => {
    const steps = -Math.round(delta / 327);
    stepCarousel(featureIndex, steps);
    moveFeatures(0);
  };

  return (
    <div
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
  delta: PropTypes.number.isRequired,
  moveFeatures: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  moveFeatures: carouselActions.moveFeatures
};

const mapStateToProps = (state) => {
  return { delta: state.featuresCarouselDelta };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeatureCard);
