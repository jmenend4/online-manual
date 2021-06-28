import { useRef } from "react";

export const useMovingMean = (size = 12) => {
  const values = useRef([]);
  const mean = useRef(0);
  const nextIndex = useRef(0);

  for (let i = 0; i < size; i++) {
    values.current.push(0);
  }

  const pushValue = (value) => {
    values.current[nextIndex.current] = value;
    calcMean();
    calcNextIndex();
  };

  const calcMean = () => {
    const sum = values.current.reduce((acc, value) => acc + value);
    mean.current = sum / size;
  };

  const calcNextIndex = () => {
    nextIndex.current++;
    if (nextIndex.current === size) {
      nextIndex.current = 0;
    }
  };

  return [mean, pushValue];
};
