import { useEffect, useState, useRef } from "react";

export const useCarouselCard = (
  cardIndex,
  cardWidth,
  currentIndex,
  delta,
  moveCarousel,
  stepCarousel,
  totalCards,
  leftMargin = 24,
  interCardMargin = 16
) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    setLeftPosition(calcLeftPosition());
  });

  const calcLeftPosition = () => {
    return (
      leftMargin +
      (cardIndex - currentIndex) * (cardWidth + interCardMargin) +
      delta
    );
  };

  const onMoveStart = (e) => {
    e.stopPropagation();
    startX.current = e.touches[0].pageX;
  };

  const onMove = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    moveCarousel(e.touches[0].pageX - startX.current);
  };

  const onMoveEnd = () => {
    const steps = -Math.round(delta / cardWidth);
    stepCarousel(cardIndex, steps, totalCards);
    moveCarousel(0);
  };

  return [leftPosition, onMoveStart, onMove, onMoveEnd];
};
