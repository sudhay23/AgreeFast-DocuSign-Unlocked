import { Calendar02Icon } from "hugeicons-react";
import React, { useState } from "react";

export const KeyEventsTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  return (
    <div className="border-violet border-2 border-opacity-15 p-8 rounded-3xl flex-1">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[16px] font-medium text-black">Key events</h1>
        <button className="bg-violet text-white px-2 flex items-center gap-3 rounded-lg py-2 hover:opacity-80 hover:transition-all transition-all">
          <Calendar02Icon size={15} className="text-white" strokeWidth={2} />
          <p className="text-white text-[12px]">Add all events to calendar</p>
        </button>
      </div>
      <div></div>
    </div>
  );
};
