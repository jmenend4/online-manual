import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./tutorial.css";

const TutorialIntro = ({ tutorial, vehicle, widthScale, onBackClick }) => {
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
    </>
  );
};

TutorialIntro.propTypes = {
  tutorial: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  widthScale: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default TutorialIntro;
