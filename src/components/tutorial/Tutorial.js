import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import PropTypes from "prop-types";

const Tutorial = ({ tutorials, tutorial, getTutorials, history }) => {
  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    }
  }, [tutorials.length, tutorial]);
};

Tutorial.propTypes = {
  tutorials: PropTypes.array.isRequired,
  tutorial: PropTypes.object.isRequired,
  getTutorials: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    tutorial: state.tutorials.find(
      (tutorial) => tutorial.id == ownProps.match.params.id
    )
  };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
