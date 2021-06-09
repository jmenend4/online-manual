import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tutorialsActions from "../../redux/actions/tutorialsActions";
import PropTypes from "prop-types";
import TutorialCard from "../common/carousel/tutorial-card/TutorialCard";
import CarouselPaginator from "../common/carousel/CarouselPaginator";
import "./main.css";

const TutorialsCard = ({ tutorials, widthScale, getTutorials, history }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (tutorials.length === 0) {
      getTutorials();
    } else {
      const _cards = tutorials.map((tutorial, i) => (
        <TutorialCard
          key={tutorial.key}
          cardIndex={i}
          tutorials={tutorials}
          onCardClick={enterTutorial}
        />
      ));
      setCards(_cards);
    }
  }, [tutorials.length]);

  const enterTutorial = (tutorialId) => {
    history.push("/tutorials/" + tutorialId);
  };

  return (
    <div className="card" style={{ height: 344 * widthScale + "px" }}>
      <p className="tutorials-title">Tutoriales Relacionados</p>
      {cards}
      <CarouselPaginator
        cardType="tutorial"
        cards={cards}
        cardWidth={342}
        cardHeight={184}
      />
    </div>
  );
};

TutorialsCard.propTypes = {
  tutorials: PropTypes.array.isRequired,
  widthScale: PropTypes.number.isRequired,
  getTutorials: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    tutorials: state.tutorials,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  getTutorials: tutorialsActions.getTutorials
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialsCard);
