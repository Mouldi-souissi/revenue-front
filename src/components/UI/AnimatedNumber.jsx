import React, { useState, useEffect } from "react";

const AnimatedNumber = ({ end = 1000, start = 0, duration = 2000 }) => {
  const [currentNumber, setCurrentNumber] = useState(start);
  const decimals = 0;
  const fps = 60;

  useEffect(() => {
    if (end == 0) {
      setCurrentNumber(end); // Directly set to end if no animation is needed
      return;
    }
    const range = end - start;
    const startTime = performance.now();
    const interval = 1000 / fps; // Time between frames

    let lastUpdate = 0;

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      if (time - lastUpdate >= interval) {
        const value = start + range * progress;
        setCurrentNumber(value);
        lastUpdate = time;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration, fps]);

  return <div>{Number(currentNumber).toFixed(decimals)}</div>;
};

export default AnimatedNumber;
