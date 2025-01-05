import { icsContent } from "@/lib/sampleIcsContent";
import { openModal, parseICSContent } from "@/lib/utils";
import { Calendar02Icon, CursorMagicSelection02Icon } from "hugeicons-react";
import React, { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { Event } from "./types";
import { AddToPlatformsModal } from "./AddToPlatformsModal";
import { ElaborateEventModal } from "./ElaborateEventModal";

export const KeyEventsTimeline = () => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const events = parseICSContent(icsContent);

  return (
    <div className="border-violet border-2 border-opacity-15 p-8 rounded-3xl flex-1">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[16px] font-medium text-black">Key events</h1>
        <button
          onClick={() => {
            openModal("add_events_to_platforms_modal");
          }}
          className="bg-violet text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all"
        >
          <Calendar02Icon size={15} className="text-white" strokeWidth={2} />
          <p className="text-white text-[12px]">Add all events to calendar</p>
        </button>
      </div>
      <div className="relative max-w-[800px] overflow-x-auto">
        <div className="flex pt-7 animate-fadeIn">
          {events.map((event, idx) => (
            <TimelineEvent
              key={idx}
              event={event}
              onClick={() => {
                setActiveEvent(event);
                openModal("elaborate_event_modal");
              }}
              isLast={idx === events.length - 1}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <CursorMagicSelection02Icon
            strokeWidth={2}
            className="text-violet text-opacity-50"
            size={20}
          />
          <p className="text-violet text-opacity-50 text-[14px]">
            Click on each event to see more details
          </p>
        </div>
      </div>
      <AddToPlatformsModal />
      <ElaborateEventModal event={activeEvent} />
    </div>
  );
};
