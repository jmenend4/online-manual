import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./stepper.css";

const Stepper = ({
  currentStep,
  totalSteps,
  type = "in-card",
  observer = null
}) => {
  const [dots, setDots] = useState([]);
  const stepper = useRef(null);

  useEffect(() => {
    buildSteps();
  }, []);

  useEffect(() => {
    if (observer) {
      observer.observe(stepper.current);
    }
  }, [observer]);

  const buildSteps = () => {
    const _dots = [];
    for (let i = 1; i <= totalSteps; i++) {
      _dots.push(
        <div
          key={"_STEPPER_DOR_" + i}
          className={
            type + (i === currentStep ? "-stepper-dot" : "-stepper-dash")
          }
        ></div>
      );
    }
    setDots(_dots);
  };

  return (
    <div
      ref={stepper}
      className="stepper"
      style={{
        "--steper-width":
          (type === "in-card"
            ? totalSteps * 36 - 20
            : totalSteps * 32 - 24
          ).toString() + "px"
      }}
    >
      {dots}
    </div>
  );
};

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  type: PropTypes.string,
  observer: PropTypes.object
};

export default Stepper;
