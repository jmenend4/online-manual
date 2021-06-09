import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./next-step.css";

const NextStepButton = ({ legend, onNextClick, widthScale }) => {
  return (
    <div
      className="next-step-container"
      style={{ "--width-scale": widthScale }}
      onClick={() => onNextClick()}
    >
      <div className="next-step-button">
        <p className="next-step-legend">{legend}</p>
      </div>
    </div>
  );
};

NextStepButton.propTypes = {
  legend: PropTypes.string.isRequired,
  onNextClick: PropTypes.func.isRequired,
  widthScale: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(NextStepButton);
