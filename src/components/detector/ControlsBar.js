import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import "./detector.css";

const ControlsBar = ({
  videoHeight,
  detectionPaused,
  setDetectionPaused,
  viewPortHeight,
  viewPortWidth
}) => {
  const calculatedHeight = viewPortHeight - (videoHeight + 88);
  const height = calculatedHeight < 64 ? 64 : calculatedHeight;

  const pauseResumeDetection = (e) => {
    e.stopPropagation();
    setDetectionPaused(!detectionPaused);
  };

  return (
    <div
      className="controls-bar"
      style={{ "--height": height, "--width": viewPortWidth }}
    >
      {detectionPaused ? (
        <FontAwesomeIcon
          icon={faPlay}
          style={{
            color: "rgb(0, 122, 255)",
            cursor: "pointer",
            height: "32px",
            width: "32px"
          }}
          onClick={(e) => pauseResumeDetection(e)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faStop}
          style={{
            color: "rgb(0, 122, 255)",
            cursor: "pointer",
            height: "32px",
            width: "32px"
          }}
          onClick={(e) => pauseResumeDetection(e)}
        />
      )}
    </div>
  );
};

ControlsBar.propTypes = {
  videoHeight: PropTypes.number.isRequired,
  detectionPaused: PropTypes.bool.isRequired,
  setDetectionPaused: PropTypes.func.isRequired,
  viewPortHeight: PropTypes.number.isRequired,
  viewPortWidth: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    viewPortHeight: state.constants.viewPortHeight,
    viewPortWidth: state.constants.viewPortWidth
  };
};

export default connect(mapStateToProps)(ControlsBar);
