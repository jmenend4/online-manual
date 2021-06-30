import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as featuresActions from "../../redux/actions/featuresActions";
import "./detected-feature-card.css";

const DetectedFeatureCard = ({
  features,
  viewPortWidth,
  viewPortHeight,
  widthScale,
  initializeFeatures
}) => {
  useEffect(() => {
    if (features.length === 0) {
      initializeFeatures();
    }
  }, [features.length]);

  return (
    <div
      className="detected-feature-card"
      style={{ "--width": viewPortWidth, "--height": viewPortHeight - 32 }}
    >
      <div className="detected-feature-nav">
        <p className="detected-feature-title">HolaHola</p>
      </div>
    </div>
  );
};

DetectedFeatureCard.propTypes = {
  features: PropTypes.array.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  initializeFeatures: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    features: state.features,
    viewPortWidth: state.constants.viewPortWidth,
    viewPortHeight: state.constants.viewPortHeight,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  initializeFeatures: featuresActions.initializeFeatures
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetectedFeatureCard);
