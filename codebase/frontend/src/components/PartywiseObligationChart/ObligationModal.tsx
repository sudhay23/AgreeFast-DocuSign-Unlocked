import React from "react";
import { ProcessedData } from "./types";
import { AlertCircleIcon } from "hugeicons-react";

export const ObligationModal = ({
  activeObligationParty,
}: {
  activeObligationParty: ProcessedData | null;
}) => {
  return (
    <dialog id="obligations_modal" className="modal bg-white bg-opacity-30">
      <div className="modal-box bg-white">
        <h1 className="font-medium text-black text-[18px]">
          {activeObligationParty?.count} obligation
          {activeObligationParty?.count !== 1 ? "s" : ""} found
        </h1>
        <p className="font-regular text-black text-[14px] mt-3 text-opacity-40">
          Party: {activeObligationParty?.role}
        </p>
        <div className="w-full mt-5 flex flex-col gap-3 max-h-[250px] overflow-y-auto">
          {activeObligationParty?.obligations.map((ob, idx) => (
            <div
              className="w-full bg-violet bg-opacity-10 rounded-lg px-4 py-3 flex flex-col items-start gap-4"
              key={idx}
            >
              <AlertCircleIcon
                className="text-violet"
                size={20}
                strokeWidth={2}
              />
              <p className="text-[14px] text-black text-opacity-50">{ob}</p>
            </div>
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="opacity-0">x</button>
      </form>
    </dialog>
  );
};
