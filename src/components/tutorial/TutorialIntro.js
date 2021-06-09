import React, { useEffect } from "react";
import { useSections } from "../../hooks/useSections";
import { connect } from "react-redux";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./tutorial.css";
import NextStepButton from "../common/next-step/NextStepButton";
import { getVehicle } from "../../api/client";

const TutorialIntro = ({
  tutorial,
  vehicle,
  widthScale,
  onBackClick,
  onInitClick
}) => {
  const sections = useSections(tutorial.steps[0]);

  useEffect(() => {
    if (vehicle.description === undefined) {
      getVehicle();
    }
  }, [vehicle]);

  return (
    <>
      <div className="tutorial-title" style={{ "--width-scale": widthScale }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="chevron-back"
          onClick={() => onBackClick()}
        />
        <p className="tutorial-name">{tutorial.name}</p>
        <p className="subtitle">{vehicle.description}</p>
      </div>
      {sections}
      <div style={{ marginBottom: "88px" }}></div>
      <NextStepButton legend="INICIAR TUTORIAL" onNextClick={onInitClick} />
    </>
  );
};

TutorialIntro.propTypes = {
  tutorial: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  widthScale: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onInitClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicle,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  getVehicle: vehicleActions.getVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialIntro);
