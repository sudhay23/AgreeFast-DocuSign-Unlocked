import React from "react";
import { Event } from "./types";
import { Calendar02Icon } from "hugeicons-react";

export const AddToPlatformsModal = () => {
  return (
    <dialog
      id="add_events_to_platforms_modal"
      className="modal bg-white bg-opacity-30"
    >
      <div className="modal-box bg-white">
        <h1 className="font-medium text-black text-[18px]">
          Add events to your calendars
        </h1>
        <div className="flex flex-wrap gap-3 items-center justify-start mt-5">
          <button
            onClick={() => {
              console.log("Adding");
            }}
            className="bg-violet text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
          >
            <Calendar02Icon size={15} className="text-white" strokeWidth={2} />
            <p className="text-white text-[12px]">Add to device calendar</p>
          </button>
          <button
            onClick={() => {
              console.log("Adding");
            }}
            className="bg-blue-600 text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
          >
            <p className="text-white text-[12px]">Add event to Jira calendar</p>
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button className="opacity-0">x</button>
      </form>
    </dialog>
  );
};
