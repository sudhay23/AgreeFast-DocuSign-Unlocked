import React from "react";
import { CircularProgress } from "./CircularProgress";

export const ObligatoryScoreChart = () => {
  return (
    <div className="border-violet border-2 border-opacity-15 flex items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <CircularProgress percentage={80} size={150} strokeWidth={9} />
        <p className="text-black text-opacity-50 text-[14px]">
          Compliance obligatory score
        </p>
      </div>
    </div>
  );
};
