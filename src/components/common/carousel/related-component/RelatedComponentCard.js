import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  moveRelatedComponents,
  stepRelatedComponentsCarousel
} from "../../../../redux/actions/carouselActions";
import { getVehicle } from "../../../../redux/actions/vehicleActions";
import { useCarouselCard } from "../../../../hooks/carouselHooks";
import "./related-component-card.css";

const RelatedComponentCard = ({
  cardIndex,
  components,
  currentIndex,
  stepCarousel,
  delta,
  widthScale,
  moveCarousel,
  vehicle
}) => {
  const [leftPosition, onMoveStart, onMove, onMoveEnd] = useCarouselCard(
    cardIndex,
    352 * widthScale,
    currentIndex,
    delta,
    moveCarousel,
    stepCarousel,
    components.length
  );

  const iconContainer = useRef(null);

  useEffect(() => {
    if (!vehicle.id) {
      getVehicle();
    }
  }, [vehicle]);

  useEffect(() => {
    const _icon = new Image();
    _icon.src = components[cardIndex].icon;
    _icon.onload = () => {
      const _width = (96 * _icon.width) / _icon.height;
      _icon.style.width = Math.floor(_width) + "px";
      _icon.style.height = "96px";
      iconContainer.current.appendChild(_icon);
    };
  }, []);

  return (
    <div
      className="related-component-card"
      onTouchStart={(e) => onMoveStart(e)}
      onTouchMove={(e) => onMove(e)}
      onTouchEnd={(e) => onMoveEnd(e)}
      style={{
        "--left-position": leftPosition + "px",
        "--width-scale": widthScale
      }}
    >
      <div ref={iconContainer} className="icon-area"></div>
      <div className="info-area">
        <p className="component-name">{components[cardIndex].name}</p>
        <p className="system-name">{components[cardIndex].system}</p>
        <p className="vehicle-description">{vehicle.description}</p>
      </div>
      <div className="show-area">
        <p className="show-me-with-ar">MOSTRÁMELO CON AR</p>
      </div>
    </div>
  );
};

RelatedComponentCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  stepCarousel: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  moveCarousel: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    delta: state.relatedComponentsCarousel.delta,
    currentIndex: state.relatedComponentsCarousel.currentIndex,
    vehicle: state.vehicle,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  moveCarousel: moveRelatedComponents,
  stepCarousel: stepRelatedComponentsCarousel,
  getVehicle: getVehicle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatedComponentCard);
