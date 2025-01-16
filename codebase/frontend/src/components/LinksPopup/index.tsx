"use client";

import { MultiplicationSignIcon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const LinksPopup = ({ setShowPopup }: { setShowPopup: any }) => {
  return (
    <div
      className={`z-20 p-10 links-popup flex flex-col items-start scroll-smooth rounded-2xl overflow-auto gap-5 absolute bottom-0 md:right-auto bg-white w-[420px] h-[420px]`}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-left text-black w-full font-medium text-[22px]">
          Try agreefast now
        </h1>
        <button
          className="hover:scale-105 transition-all"
          onClick={() => setShowPopup(false)}
        >
          <MultiplicationSignIcon className="text-black text-opacity-50" />
        </button>
      </div>
      <div className="flex items-center justify-between flex-1 w-full">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/demo-1.jpeg"}
              alt="Demo agreement 1"
              width={100}
              height={20}
            />
            <p className="text-black text-opacity-75">Experience 1</p>
          </div>
          <div
            onClick={() =>
              window.open(
                "https://agreefast.knowyours.com/room/838a5c2b-212f-490f-bacd-f4badec99c24?p=1",
                "_blank",
              )
            }
            className="flex items-center gap-1 hover:scale-105 transition-all cursor-pointer"
          >
            <p className="text-violet text-[14px]">Gather insights</p>
            <ArrowRight className="text-violet" size={15} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/demo-2.png"}
              alt="Demo agreement 1"
              width={100}
              height={20}
            />
            <p className="text-black text-opacity-75">Experience 2</p>
          </div>
          <div
            onClick={() =>
              window.open(
                "https://agreefast.knowyours.com/room/fa012239-f2ec-428e-8e86-e0b4e05a6e0f?p=2",
                "_blank",
              )
            }
            className="flex items-center gap-1 hover:scale-105 transition-all cursor-pointer"
          >
            <p className="text-violet text-[14px]">Gather insights</p>
            <ArrowRight className="text-violet" size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};
