import { useState, useEffect } from "react";

export const useProgressAnimation = (targetPercentage: number) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const normalizedTarget = Math.min(100, Math.max(0, targetPercentage));
    const duration = 800; // Animation duration in ms
    const steps = 60; // Number of steps in the animation
    const stepDuration = duration / steps;
    const increment = (normalizedTarget - animatedPercentage) / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setAnimatedPercentage(normalizedTarget);
        clearInterval(interval);
      } else {
        setAnimatedPercentage((prev) => prev + increment);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [targetPercentage]);

  return { animatedPercentage };
};
