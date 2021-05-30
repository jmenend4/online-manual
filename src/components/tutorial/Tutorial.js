import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import PropTypes from "prop-types";

const Tutorial = ({ tutorials, tutorial, getTutorials, history }) => {
  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else if (tutorial === {}) {
      // todo
      //history.push("/notfound")
    }
  }, [tutorials.length, tutorial]);
};

Tutorial.propTypes = {
  tutorials: PropTypes.array.isRequired,
  tutorial: PropTypes.object.isRequired,
  getTutorials: PropTypes.func.isRequired,
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
      id && state.tutorials > 0 ? selectTutorial(state.tutorials, id) : {}
  };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
