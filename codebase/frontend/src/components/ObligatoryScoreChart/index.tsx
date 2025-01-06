import React, { useEffect, useState } from "react";
import { CircularProgress } from "./CircularProgress";
import axios from "axios";
import { appConfig } from "@/config/config";

export const ObligatoryScoreChart = ({
  envelopeId,
}: {
  envelopeId: string;
}) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getObligationScore`
        );
        const data = response.data;
        setPercentage(Math.round(data.obligation_score));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="border-violet border-2 border-opacity-15 animate-in zoom-in fade-in duration-1000 flex items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center justify-center gap-5">
        {loading ? (
          <span className="loading loading-dots loading-md text-violet"></span>
        ) : (
          <>
            <CircularProgress
              percentage={percentage}
              size={150}
              strokeWidth={9}
            />
            <p className="text-black text-opacity-50 text-[14px]">
              Compliance obligatory score
            </p>
          </>
        )}
      </div>
    </div>
  );
};
