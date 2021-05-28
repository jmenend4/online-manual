import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TutorialsCarousel from "./TutorialsCarousel";
import "./main.css";

const TutorialsCard = ({ widthScale }) => {
  return (
    <div className="card" style={{ height: 344 * widthScale + "px" }}>
      <p className="tutorials-title">Tutoriales Relacionados</p>
      <TutorialsCarousel />
    </div>
  );
};

TutorialsCard.propTypes = {
  widthScale: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    widthScale: state.constants.widthScale
  };
};

export default connect(mapStateToProps)(TutorialsCard);
