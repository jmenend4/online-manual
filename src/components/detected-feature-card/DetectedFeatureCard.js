import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSections } from "../../hooks/useSections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import "./detected-feature-card.css";

const DetectedFeatureCard = ({
  cls,
  setSelectedDetection,
  features,
  viewPortWidth,
  viewPortHeight
}) => {
  const sections = useSections(features[cls]);
  const [featureName, setFeatureName] = useState("");
  const [closed, setClosed] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const selectedAnother = useRef(null);

  useEffect(() => {
    if (cls === null) {
      setClosed(true);
    } else if (cls >= 0 && cls < features.length) {
      if (closed) {
        setClosed(false);
        setFeatureName(features[cls].name);
      } else {
        selectedAnother.current = features[cls].name;
        setClosed(true);
      }
    } else {
      setFeatureName("Componente no identificado");
    }
  }, [cls, features.length]);

  const close = (e) => {
    e.stopPropagation();
    setSelectedDetection(null);
    setClosed(true);
  };

  const transitionEnd = (e) => {
    e.stopPropagation();
    if (e.target.id === "detected-feature-card" && selectedAnother.current) {
      setFeatureName(selectedAnother.current);
      setClosed(false);
      selectedAnother.current = null;
    }
  };

  const expand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      id="detected-feature-card"
      className="detected-feature-card"
      style={{
        "--width": viewPortWidth,
        "--height": viewPortHeight - 80,
        "--bottom": closed
          ? -(viewPortHeight - 32)
          : expanded
          ? 0
          : -(viewPortHeight - 288)
      }}
      onTransitionEnd={(e) => {
        transitionEnd(e);
      }}
    >
      <div className="detected-feature-nav">
        <p className="detected-feature-title">{featureName}</p>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="detected-feature-close-icon"
          onClick={(e) => close(e)}
        />
        {expanded ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="detected-feature-expand-icon"
            onClick={(e) => expand(e)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronUp}
            className="detected-feature-expand-icon"
            onClick={(e) => expand(e)}
          />
        )}
      </div>
      <div
        style={{
          height: expanded ? viewPortHeight - 144 : "192px",
          width: "100%"
        }}
      >
        {sections}
      </div>
      {/* <div style={{ marginBottom: "88px" }}></div> */}
    </div>
  );
};

DetectedFeatureCard.propTypes = {
  cls: PropTypes.number,
  setSelectedDetection: PropTypes.func.isRequired,
  features: PropTypes.array.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    features: state.features,
    viewPortWidth: state.constants.viewPortWidth,
    viewPortHeight: state.constants.viewPortHeight,
    widthScale: state.constants.widthScale
  };
};

export default connect(mapStateToProps)(DetectedFeatureCard);
