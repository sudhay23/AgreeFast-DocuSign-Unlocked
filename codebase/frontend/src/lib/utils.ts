import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event } from "../components/KeyEventsTimeline/types";

export function parseICSContent(icsContent: string): Event[] {
  const events: Event[] = [];
  const lines = icsContent.split("\n");
  let currentEvent: Partial<Event> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "BEGIN:VEVENT") {
      currentEvent = {};
    } else if (line === "END:VEVENT" && currentEvent) {
      events.push(currentEvent as Event);
      currentEvent = null;
    } else if (currentEvent) {
      const [key, ...values] = line.split(":");
      const value = values.join(":");

      switch (key) {
        case "SUMMARY":
          currentEvent.summary = value;
          break;
        case "DTSTART;VALUE=DATE":
          currentEvent.startDate = new Date(
            value.slice(0, 4) + "-" + value.slice(4, 6) + "-" + value.slice(6)
          );
          break;
        case "DTEND;VALUE=DATE":
          currentEvent.endDate = new Date(
            value.slice(0, 4) + "-" + value.slice(4, 6) + "-" + value.slice(6)
          );
          break;
        case "DESCRIPTION":
          currentEvent.description = value;
          break;
      }
    }
  }

  return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}
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
