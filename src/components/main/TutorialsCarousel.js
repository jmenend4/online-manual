import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import TutorialCard from "./TutorialCard";
import "./main.css";

const TutorialsCarousel = ({ tutorials, getTutorials }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else setVisibleCardsByIndex(0);
  }, [tutorials.length]);

  const setVisibleCardsByIndex = (index) => {
    const _cards = tutorials.map((tutorial, _idx) => (
      <TutorialCard
        key={tutorial.key}
        tutorialIndex={_idx}
        carouselIndex={_idx - index}
        tutorial={tutorial}
        stepCarousel={stepCarousel}
      />
    ));
    setCards(_cards);
  };

  const stepCarousel = (tutorialIndex, steps) => {
    const index = calcIndexBySteps(tutorialIndex, steps);
    setVisibleCardsByIndex(index);
  };

  const calcIndexBySteps = (tutorialIndex, steps) => {
    const index = tutorialIndex + steps;
    if (index < 0) {
      return 0;
    }
    if (index >= tutorials.length) {
      return tutorials.length - 1;
    }
    return index;
  };

  return <>{cards}</>;
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
