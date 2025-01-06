import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event } from "../components/KeyEventsTimeline/types";

export const parseICSContent = (icsContent: string): Event[] => {
  const lines = icsContent.split("\n").filter((line) => line.trim());

  const events: Event[] = [];
  let currentEvent: Partial<Event> = {};
  let inEvent = false;
  let inAlarm = false;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "BEGIN:VEVENT") {
      currentEvent = {};
      inEvent = true;
    } else if (trimmedLine === "END:VEVENT") {
      if (
        currentEvent.summary &&
        currentEvent.startDate &&
        currentEvent.endDate &&
        currentEvent.description
      ) {
        events.push(currentEvent as Event);
      }
      inEvent = false;
    } else if (trimmedLine === "BEGIN:VALARM") {
      inAlarm = true;
    } else if (trimmedLine === "END:VALARM") {
      inAlarm = false;
    } else if (inEvent && !inAlarm) {
      const [key, ...values] = trimmedLine.split(":");
      const value = values.join(":"); // Rejoin in case description contains colons

      switch (key) {
        case "SUMMARY":
          currentEvent.summary = value;
          break;
        case "DTSTART;VALUE=DATE":
          currentEvent.startDate = new Date(
            value.substring(0, 4) +
              "-" +
              value.substring(4, 6) +
              "-" +
              value.substring(6, 8)
          );
          break;
        case "DTEND;VALUE=DATE":
          currentEvent.endDate = new Date(
            value.substring(0, 4) +
              "-" +
              value.substring(4, 6) +
              "-" +
              value.substring(6, 8)
          );
          break;
        case "DESCRIPTION":
          currentEvent.description = value;
          break;
      }
    }
  });

  return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openModal = (modalId: string) => {
  if (document) {
    //@ts-ignore
    document.getElementById(modalId).showModal();
  }
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getTimeDifference(date1: Date, date2: Date): string {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears}y`;
  } else if (diffMonths > 0) {
    return `${diffMonths}m`;
  } else if (diffDays > 0) {
    return `${diffDays}d`;
  }
  return "0d";
}
