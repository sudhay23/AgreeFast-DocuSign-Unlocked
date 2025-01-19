import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const TrelloAlertModal = () => {
  return (
    <dialog id="trello_alert_modal" className="modal bg-white bg-opacity-30">
      <div className="modal-box min-w-none min-h-none bg-white">
        <h1 className="font-medium text-black text-[18px]">
          You can still try it!
        </h1>
        <p className="text-[14px] text-black font-medium opacity-60 my-3">
          Our Trello power-up has not been listed officially past the review at
          the time of this hackathon. Please fill out the form below and we will
          get back to you with a hands-on demo for you to try this featuer on.
        </p>
        <Link
          href="https://tally.so/r/wbK176"
          className="text-blue-500 hover:opacity-80 transition-all hover:transition-all text-[14px] flex items-center gap-1"
          target="_blank"
        >
          Go to the form
          <ArrowRight size={15} />
        </Link>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="opacity-0">x</button>
      </form>
    </dialog>
  );
};
