import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openModal = (modalId: string) => {
  if (document) {
    //@ts-ignore
    document.getElementById(modalId).showModal();
  }
};
