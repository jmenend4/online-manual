import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import PropTypes from "prop-types";
import TutorialIntro from "./TutorialIntro";
import TutorialStep from "./TutorialStep";

const Tutorial = ({
  tutorials,
  tutorial,
  vehicle,
  getTutorials,
  getVehicle,
  history
}) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const step = useRef(0);

  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else if (tutorial.id != undefined) {
      buildSteps();
    } else {
      // todo
      //history.push("/notfound")
    }
  }, [tutorials.length, tutorial.id]);

  useEffect(() => {
    if (vehicle.id === undefined) {
      getVehicle();
    }
  }, [vehicle]);

  const buildSteps = () => {
    const _steps = [];
    tutorial.steps.forEach((step, i) => {
      if (step.type === "intro") {
        _steps.push(
          <TutorialIntro
            key={"__TUTORIAL_STEP_" + i}
            tutorial={tutorial}
            vehicle={vehicle}
            onBackClick={onBackClick}
            onInitClick={onFowardClick}
          />
        );
      } else {
        _steps.push(
          <TutorialStep
            key={"__TUTORIAL_STEP_" + i}
            tutorial={tutorial}
            thisStep={i}
            totalSteps={tutorial.steps.length - 1}
            isLastStep={tutorial.steps.length === i + 1}
            onNextClick={onFowardClick}
            onBackClick={onBackClick}
          />
        );
      }
    });
    setSteps(_steps);
  };

  const onBackClick = () => {
    if (step.current === 0) {
      history.push("/");
    }
    setCurrentStep(--step.current);
  };

  const onFowardClick = () => {
    if (step.current === tutorial.steps.length - 1) {
      history.push("/");
    }
    setCurrentStep(++step.current);
  };

  return <>{steps.length > 0 && steps[currentStep]}</>;
};

Tutorial.propTypes = {
  tutorials: PropTypes.array.isRequired,
  tutorial: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  getTutorials: PropTypes.func.isRequired,
  getVehicle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const selectTutorial = (tutorials, id) => {
  return tutorials.find((tutorial) => tutorial.id == id) || {};
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    tutorials: state.tutorials,
    tutorial:
      id && state.tutorials.length > 0
        ? selectTutorial(state.tutorials, id)
        : {},
    vehicle: state.vehicle
  };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials,
  getVehicle: vehicleActions.getVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
