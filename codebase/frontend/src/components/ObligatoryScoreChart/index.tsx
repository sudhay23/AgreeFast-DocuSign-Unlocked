import React, { useEffect, useState } from "react";
import { CircularProgress } from "./CircularProgress";
import axios from "axios";
import { appConfig } from "@/config/config";
import { Tooltip } from "react-tooltip";

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
        setPercentage(Math.round(data.compliance_obligatory_score));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="border-violet border-2 border-opacity-25 animate-in zoom-in fade-in duration-1000 flex items-center justify-center rounded-3xl relative">
      <>
        <button
          className="p-2 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-black bg-opacity-10 text-black text-opacity-40 absolute top-3 right-3 text-[12px]"
          data-tooltip-id="score-tooltip"
          data-tooltip-content="A higher score indicates better compliance with the agreement terms, reducing the risk of the agreement being voided."
        >
          i
        </button>
        <Tooltip
          id="score-tooltip"
          style={{
            backgroundColor: "whitesmoke",
            color: "black",
            fontSize: "12px",
            maxWidth: "300px",
            zIndex: 100,
          }}
          place={"bottom"}
        />
      </>
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
