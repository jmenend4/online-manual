import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TutorialsCarousel from "./TutorialsCarousel";
import "./main.css";

const TutorialsCard = ({ widthScale, history }) => {
  const enterTutorial = (tutorialId) => {
    history.push("/tutorials/" + tutorialId);
  };

  return (
    <div className="card" style={{ height: 344 * widthScale + "px" }}>
      <p className="tutorials-title">Tutoriales Relacionados</p>
      <TutorialsCarousel onCardClick={enterTutorial} />
    </div>
  );
};

TutorialsCard.propTypes = {
  widthScale: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    widthScale: state.constants.widthScale
  };
};

export default connect(mapStateToProps)(TutorialsCard);
