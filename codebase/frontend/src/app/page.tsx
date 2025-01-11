"use client";
import { LinksPopup } from "@/components/LinksPopup";
import DotPattern from "@/components/ui/dot-pattern";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { TextAnimate } from "@/components/ui/text-animate";
import WordRotate from "@/components/ui/word-rotate";
import { appConfig } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <main className="w-full mt-20">
      <DotPattern className="z-10 opacity-50" />{" "}
      <div className="flex flex-col items-center gap-2">
        <Link href={appConfig.extensionLink} target="_blank" className="my-5">
          <Image
            src={"/webstore-badge.png"}
            alt="extension badge"
            width={150}
            height={120}
          />
        </Link>
        <div className="bg-purple bg-opacity-20 flex items-center gap-2 px-5 py-2 rounded-[100px]">
          <Image
            src={"/docusign.png"}
            alt="Docusign Logo"
            width={15}
            height={25}
          />

          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-purple text-[12px]"
          >
            Boost your Docusign workflow
          </TextAnimate>
        </div>
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-center font-semibold text-[40px] w-[800px] text-black">
            Navigate agreements with{" "}
            <span className="text-violet">confidence</span> and{" "}
            <span className="text-violet">automation</span>
          </h1>
          <WordRotate
            className="text-center text-[20px] text-gray-500 font-medium"
            words={[
              "🚀 Escape the fine print",
              "⏳ Never miss critical timelines",
              "🔏 Sign on Docusign as you always do, rest is on us",
            ]}
          />
        </div>

        <div className="relative mt-10">
          <InteractiveHoverButton
            setShowPopup={setShowPopup}
            text="View demo"
          />
          {showPopup && <LinksPopup setShowPopup={setShowPopup} />}
        </div>
      </div>
      {showPopup && (
        <div className="absolute h-screen w-screen bg-black opacity-60 z-10 top-0 left-0"></div>
      )}
    </main>
  );
}
