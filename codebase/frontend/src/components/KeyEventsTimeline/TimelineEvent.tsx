import React from "react";
import { Check, Clock, Calendar, ArrowRight } from "lucide-react";
import { Event } from "./types";
import { formatDate, getTimeDifference } from "../../lib/utils";
import { Tooltip } from "react-tooltip";

interface TimelineEventProps {
  event: Event;
  onClick: () => void;
  isLast?: boolean;
}

export function TimelineEvent({ event, onClick, isLast }: TimelineEventProps) {
  const isPast = event.startDate < new Date();

  return (
    <div className="relative flex-shrink-0 w-[280px] animate-slideIn">
      {/* Timeline connector line */}
      <div className="absolute left-0 right-0 top-[10px] h-0.5 bg-gray-200" />

      {/* Timeline node with dot */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            isPast
              ? "bg-green-100 ring-2 ring-green-500"
              : "bg-orange-100 ring-2 ring-orange-500"
          }`}
        >
          {isPast ? (
            <Check className="w-3 h-3 text-green-600" />
          ) : (
            <Clock className="w-3 h-3 text-orange-600" />
          )}
        </div>

        {/* Event card */}
        <div
          onClick={onClick}
          className={`mt-4 w-[260px] p-4 shadow-sm cursor-pointer 
            transition-all duration-300 hover:shadow-md hover:transform hover:scale-102
            bg-white border-t-2 ${
              isPast ? "border-green-500" : "border-orange-500"
            }`}
          data-tooltip-id="event-details-tooltip"
          data-tooltip-content={event.description}
        >
          <h3 className="font-medium text-sm mb-3 line-clamp-2 text-black">
            {event.summary}
          </h3>
          <div className="text-xs space-y-2">
            {/* Start date */}
            <div className="flex items-center text-gray-600">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDate(event.startDate)}</span>
            </div>

            {/* End date */}
            <div className="flex items-center text-gray-500">
              <ArrowRight className="w-3 h-3 mr-1" />
              <span>{formatDate(event.endDate)}</span>
              <span className="ml-1 text-gray-400">
                &#40;{getTimeDifference(event.startDate, event.endDate)}&#41;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
