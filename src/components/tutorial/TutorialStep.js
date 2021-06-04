import React, { useEffect, useRef, useState } from "react";
import { useSections } from "../../hooks/useSections";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./tutorial.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Stepper from "../common/stepper/Stepper";
import NextStepButton from "../common/next-step/NextStepButton";
import Accordeon from "../common/accordeon/Accordeon";
import Shield from "../common/icons/Shield";

const TutorialStep = ({
  tutorial,
  thisStep,
  totalSteps,
  isLastStep,
  onNextClick,
  onBackClick,
  widthScale
}) => {
  const sections = useSections(tutorial.steps[thisStep]);
  const [stepperVisibleInCard, setStepperVisibleInCard] = useState(true);
  const [stepNameVisibleInCard, setStepNameVisibleInCard] = useState(true);
  const stepperObserver = useRef(null);
  const [stepperObserverReady, setStepperObserverReady] = useState(false);
  const stepNameObserver = useRef(null);
  const stepper = useRef(null);
  const stepName = useRef(null);

  useEffect(() => {
    createObservers();
    return () => {
      console.log("disconnecting");
      stepperObserver.current.disconnect();
      stepNameObserver.current.disconnect();
    };
  }, []);

  const createObservers = () => {
    const stepperObserverOptions = {
      rootMargin: "-80px 0px 0px 0px",
      threshold: 0.6
    };
    stepperObserver.current = new IntersectionObserver(
      observeStepper,
      stepperObserverOptions
    );
    setStepperObserverReady(!stepperObserverReady);

    const stepNameObserverOptions = {
      rootMargin: "-128px 0px 0px 0px",
      threshold: 0.6
    };
    stepNameObserver.current = new IntersectionObserver(
      observeStepName,
      stepNameObserverOptions
    );
    stepNameObserver.current.observe(stepName.current);
  };

  const observeStepper = (entries, _observer) => {
    setStepperVisibleInCard(entries[0].isIntersecting);
  };

  const observeStepName = (entries, _observer) => {
    setStepNameVisibleInCard(entries[0].isIntersecting);
  };

  return (
    <>
      <div
        className="tutorial-step-card"
        style={{
          "--width-scale": widthScale,
          marginTop: "104px",
          position: "relative"
        }}
      >
        <Stepper
          stepperRef={stepper}
          currentStep={thisStep}
          totalSteps={totalSteps}
          observer={stepperObserver.current}
        />
        <p className="step-indicator">{"Paso " + thisStep}</p>
        <img
          className="step-image"
          src={`../../assets/${tutorial.steps[thisStep].image}`}
        />
        <p ref={stepName} className="step-name">
          {tutorial.steps[thisStep].name}
        </p>
        <p className="step-description">
          {tutorial.steps[thisStep].description}
        </p>
      </div>
      {sections}
      <div style={{ marginBottom: "88px" }}></div>
      <div
        className="tutorial-step-header"
        style={{
          "--width-scale": widthScale
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="chevron-back"
          onClick={() => onBackClick()}
        />
        <p className="tutorial-step-title">{tutorial.name}</p>
      </div>
      {(!stepperVisibleInCard || !stepperVisibleInCard) && (
        <div
          className="tutorial-step-subheader"
          style={{
            "--width-scale": widthScale
          }}
        >
          {!stepperVisibleInCard && (
            <Stepper
              currentStep={thisStep}
              totalSteps={totalSteps}
              type="in-header"
            />
          )}
          {!stepNameVisibleInCard && (
            <p className="step-name">{tutorial.steps[thisStep].name}</p>
          )}
        </div>
      )}
      <NextStepButton
        legend={
          isLastStep ? "FINALIZAR TUTORIAL" : "CONTINUAR AL SIGUIENTE PASO"
        }
        onNextClick={onNextClick}
      />
    </>
  );
};

TutorialStep.propTypes = {
  tutorial: PropTypes.object.isRequired,
  thisStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  widthScale: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(TutorialStep);
