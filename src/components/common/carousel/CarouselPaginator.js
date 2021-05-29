import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./carousel.css";

const CarouselPaginator = ({ index, cardsContent, top, cardWidth }) => {
  const [dots, setDots] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const _dots = [];
    cardsContent.forEach((card, i) => {
      let dot;
      if (i === index) {
        dot = (
          <div
            key={"_CAROUSEL_PAGINATOR_DOT_" + cardsContent[i].key + i}
            className="current-page"
          ></div>
        );
      } else {
        dot = (
          <div
            key={"_CAROUSEL_PAGINATOR_DOT_" + cardsContent[i].key + i}
            className="other-page"
          ></div>
        );
      }
      _dots.push(dot);
    });
    setDots(_dots);
    setWidth(cardsContent.length * 16 + 8);
  }, [index, cardsContent.length]);

  return (
    <div
      className="carousel-paginator"
      style={{
        width: width,
        "--top": top + "px",
        "--left": ((cardWidth - width) / 2).toString() + "px"
      }}
    >
      {dots}
    </div>
  );
};

CarouselPaginator.propTypes = {
  index: PropTypes.number.isRequired,
  cardsContent: PropTypes.array.isRequired,
  top: PropTypes.number.isRequired,
  cardWidth: PropTypes.number.isRequired
};

export default CarouselPaginator;
