import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./carousel.css";

const CarouselPaginator = ({
  index,
  cards,
  cardWidth,
  cardHeight,
  marginTop = 24
}) => {
  const [dots, setDots] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const _dots = [];
    cards.forEach((card, i) => {
      let dot;
      if (i === index) {
        dot = (
          <div
            key={"_CAROUSEL_PAGINATOR_DOT_" + i}
            className="current-page"
          ></div>
        );
      } else {
        dot = (
          <div
            key={"_CAROUSEL_PAGINATOR_DOT_" + i}
            className="other-page"
          ></div>
        );
      }
      _dots.push(dot);
    });
    setDots(_dots);
    setWidth(cards.length * 16 + 8);
  }, [index, cards.length]);

  return (
    <div
      className="carousel-paginator"
      style={{
        width: width + "px",
        top: (cardHeight + marginTop).toString() + "px",
        "--left": ((cardWidth - width) / 2).toString() + "px"
      }}
    >
      {dots}
    </div>
  );
};

CarouselPaginator.propTypes = {
  cardType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  cardWidth: PropTypes.number.isRequired,
  cardHeight: PropTypes.number.isRequired,
  marginTop: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.cardType) {
    console.error("CarouselPaginator says: cardType must not be null");
    return { index: 0 };
  }
  switch (ownProps.cardType) {
    case "tutorial": {
      return { index: state.tutorialsCarousel.currentIndex };
    }
    default: {
      console.error("Unknown carousel card type: " + ownProps.cardType);
    }
  }
  return { index: 0 };
};

export default connect(mapStateToProps)(CarouselPaginator);
