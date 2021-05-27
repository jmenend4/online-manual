import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FeatureCard from "./FeatureCard";
import * as featuresActions from "../../redux/actions/featuresActions";

const FeaturesCarousel = ({ featureId = 1, features, initializeFeatures }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    if (features.length === 0) {
      initializeFeatures();
    }
    if (visibleCards.length === 0) {
      setVisibleFeatures(featureId);
    }
  }, [features.length, visibleCards.length]);

  const setVisibleFeatures = (featureId) => {
    if (features.length === 0) {
      return [];
    }
    let index = features.findIndex((feature) => (feature.id = featureId));
    if (index === -1) {
      console.error(
        "Features with id " +
          featureId +
          "not found. Setting centered feature to index 0"
      );
      index = 0;
    }
    setVisibleFeaturesByIndex(index);
  };

  const setVisibleFeaturesByIndex = (index) => {
    const sorroundingFeatures = [];
    for (let i = -2; i < 3; i++) {
      let _idx = index + i;
      _idx =
        _idx < 0
          ? features.length + i
          : _idx >= features.length
          ? _idx - features.length
          : _idx;
      sorroundingFeatures.push(
        <FeatureCard
          key={features[_idx].key}
          featureIndex={_idx}
          index={i}
          title={features[_idx].name}
          stepCarousel={stepCarousel}
        />
      );
    }
    setVisibleCards(sorroundingFeatures);
  };

  const stepCarousel = (featureIndex, steps) => {
    const index = getFeatureIndexByStep(featureIndex, steps);
    setVisibleFeaturesByIndex(index);
  };

  const getFeatureIndexByStep = (featureIndex, steps) => {
    const index = featureIndex + steps;
    if (index >= features.length) {
      return index - features.length;
    }
    if (index < 0) {
      return index + features.length;
    }
    return index;
  };

  return <>{visibleCards}</>;
};

FeaturesCarousel.propTypes = {
  featureId: PropTypes.number,
  features: PropTypes.array.isRequired,
  initializeFeatures: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    features: state.features
  };
};

const mapDispatchToProps = {
  initializeFeatures: featuresActions.initializeFeatures
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesCarousel);
