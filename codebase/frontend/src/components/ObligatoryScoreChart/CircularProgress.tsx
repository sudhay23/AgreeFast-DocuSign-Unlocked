import React from "react";
import { useProgressAnimation } from "../../hooks/useProgressAnimation";
import { Alert01Icon } from "hugeicons-react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 200,
  strokeWidth = 15,
}) => {
  const { animatedPercentage } = useProgressAnimation(percentage);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  const getColor = (value: number) => {
    if (value < 70) return "#22c55e"; // green-500
    if (value < 80) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="relative inline-flex items-center justify-center animate-in zoom-in fade-in duration-1000">
      <svg
        className="transform -rotate-90 animate-scaleIn"
        width={size}
        height={size}
      >
        <circle
          className="opacity-20"
          strokeWidth={strokeWidth}
          stroke={getColor(animatedPercentage)}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={getColor(animatedPercentage)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition:
              "stroke-dashoffset 0.2s ease-in-out, stroke 0.3s ease-in-out",
          }}
        />
      </svg>
      <div
        className="absolute text-xl font-bold animate-fadeScale"
        style={{ color: getColor(animatedPercentage) }}
      >
        {Math.round(animatedPercentage)}%
      </div>
    </div>
  );
};
