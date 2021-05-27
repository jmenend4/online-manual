import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import "./main.css";

const TutorialsCarousel = ({ tutorials, getTutorials }) => {
  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    }
  }, [tutorials.length]);
};

TutorialsCarousel.propTypes = {
  tutorials: PropTypes.array.isRequired,
  getTutorials: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { tutorials: state.tutorials };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialsCarousel);
