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
  const touchStartTime = useRef(null);

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
    touchStartTime.current = new Date();
    startX.current = e.touches[0].pageX;
  };

  const onMove = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    moveCarousel(e.touches[0].pageX - startX.current);
  };

  const onMoveEnd = () => {
    const currentTime = new Date();
    const flick =
      currentTime - touchStartTime.current < 500 ? -Math.sign(delta) : 0;
    touchStartTime.current = null;
    const steps = flick - Math.round(delta / cardWidth);
    stepCarousel(cardIndex, steps, totalCards);
    moveCarousel(0);
  };

  return [leftPosition, onMoveStart, onMove, onMoveEnd];
};
