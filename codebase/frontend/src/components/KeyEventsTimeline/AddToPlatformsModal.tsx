import React from "react";
import { Calendar02Icon } from "hugeicons-react";
import { toast } from "react-toastify";

export const AddToPlatformsModal = ({
  ics,
  envId,
}: {
  ics: string;
  envId: string;
}) => {
  const downloadICS = () => {
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agreefast-key-events.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <dialog
      id="add_events_to_platforms_modal"
      className="modal bg-white bg-opacity-30"
    >
      <div className="modal-box bg-white">
        <h1 className="font-medium text-black text-[18px]">
          Add events to your calendars
        </h1>
        <div className="flex flex-col items-start gap-2 my-4">
          <p className="text-[12px] text-black font-medium opacity-60">
            Envelope ID:
          </p>
          <button
            className="text-violet bg-violet bg-opacity-10 border-2 border-dashed border-violet rounded-md px-3 py-2 hover:opacity-50 transition-all hover:transition-all text-[12px]"
            onClick={() => {
              navigator.clipboard.writeText(envId);
              toast("Copied to clipboard!");
            }}
          >
            {envId}
          </button>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-start mt-5">
          <button
            onClick={() => {
              downloadICS();
            }}
            className="bg-violet text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
          >
            <Calendar02Icon size={15} className="text-white" strokeWidth={2} />
            <p className="text-white text-[12px]">Add to device calendar</p>
          </button>
          <button
            onClick={() => {
              toast("Trello power-up still under review.");
            }}
            className="bg-pink-600 text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
          >
            <p className="text-white text-[12px]">Add event to Trello board</p>
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button className="opacity-0">x</button>
      </form>
    </dialog>
  );
};
