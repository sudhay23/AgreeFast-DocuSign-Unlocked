import React from "react";
import { Event } from "./types";
import { formatDate } from "@/lib/utils";
import { Calendar02Icon } from "hugeicons-react";
import { toast } from "react-toastify";

export const ElaborateEventModal = ({ event }: { event: Event | null }) => {
  const downloadICS = () => {
    if (!event) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.summary}
DTSTART;VALUE=DATE:${
      event.startDate.toISOString().replace(/[-:]/g, "").split("T")[0]
    }
DTEND;VALUE=DATE:${
      event.endDate.toISOString().replace(/[-:]/g, "").split("T")[0]
    }
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.summary}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <dialog id="elaborate_event_modal" className="modal bg-white bg-opacity-30">
      <div className="modal-box bg-white">
        <h1 className="font-medium text-black text-[18px]">{event?.summary}</h1>
        <p className="font-regular text-black text-[12px] mt-3 text-opacity-50">
          <span className="font-semibold">Start date:</span>{" "}
          {event && formatDate(event.startDate)}
        </p>
        <p className="font-regular text-black text-[12px] mt-1 text-opacity-50">
          <span className="font-semibold">End date:</span>{" "}
          {event && formatDate(event.endDate)}
        </p>
        <div className="w-full mt-5">
          <p className="text-[14px] text-black text-opacity-50">
            {event?.description}
          </p>
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
