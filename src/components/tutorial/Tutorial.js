import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import PropTypes from "prop-types";
import TutorialIntro from "./TutorialIntro";

const Tutorial = ({
  tutorials,
  tutorial,
  vehicle,
  widthScale,
  getTutorials,
  getVehicle,
  history
}) => {
  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else if (tutorial === {}) {
      // todo
      //history.push("/notfound")
    }
  }, [tutorials.length, tutorial]);

  useEffect(() => {
    if (vehicle.id === undefined) {
      getVehicle();
    }
  }, [vehicle]);

  const onBackClick = () => {
    history.push("/");
  };

  return (
    <>
      <TutorialIntro
        tutorial={tutorial}
        vehicle={vehicle}
        widthScale={widthScale}
        onBackClick={onBackClick}
      />
    </>
  );
};

Tutorial.propTypes = {
  tutorials: PropTypes.array.isRequired,
  tutorial: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  widthScale: PropTypes.number.isRequired,
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
    vehicle: state.vehicle,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials,
  getVehicle: vehicleActions.getVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
