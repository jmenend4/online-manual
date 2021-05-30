import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import TutorialCard from "./TutorialCard";
import "./main.css";
import CarouselPaginator from "../common/carousel/CarouselPaginator";

const TutorialsCarousel = ({ onCardClick, tutorials, getTutorials }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsLowerBorder, setCardsLowerBorder] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else setVisibleCardsByIndex(0);
  }, [tutorials.length]);

  useEffect(() => {
    const cards = document.getElementsByClassName("tutorial-card");
    if (cards.length > 0) {
      setCardsLowerBorder(cards[0].getBoundingClientRect().height);
      setCardWidth(cards[0].getBoundingClientRect().width);
    }
  });

  const setVisibleCardsByIndex = (index) => {
    const _cards = tutorials.map((tutorial, _idx) => (
      <TutorialCard
        key={tutorial.key}
        tutorialIndex={_idx}
        carouselIndex={_idx - index}
        tutorial={tutorial}
        stepCarousel={stepCarousel}
        onCardClick={onCardClick}
      />
    ));
    setCards(_cards);
  };

  const stepCarousel = (tutorialIndex, steps) => {
    const index = calcIndexBySteps(tutorialIndex, steps);
    setVisibleCardsByIndex(index);
    setCurrentIndex(index);
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

  return (
    <>
      {cards}{" "}
      <CarouselPaginator
        index={currentIndex}
        cardsContent={tutorials}
        top={cardsLowerBorder + 24}
        cardWidth={cardWidth}
      />{" "}
    </>
  );
};

TutorialsCarousel.propTypes = {
  onCardClick: PropTypes.func.isRequired,
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
