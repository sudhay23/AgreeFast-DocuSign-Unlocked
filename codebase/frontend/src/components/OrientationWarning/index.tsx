"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const OrientationWarning = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Check on mount
    checkOrientation();

    // Check on resize
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center text-white p-4">
      <div className="text-center space-y-4">
        <RotateCcw className="w-16 h-16 mx-auto animate-spin" />
        <h2 className="text-2xl font-bold">Please Rotate Your Device</h2>
        <p className="text-gray-300">
          This experience is best viewed in landscape mode
        </p>
      </div>
    </div>
  );
};
