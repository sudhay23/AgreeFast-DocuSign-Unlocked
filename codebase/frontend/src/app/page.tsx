import DotPattern from "@/components/ui/dot-pattern";
import { TextAnimate } from "@/components/ui/text-animate";
import { appConfig } from "@/config/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full mt-20 relative">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,rgba(255,255,255,0.7),transparent)] -z-10"
        )}
      />{" "}
      <div className="flex flex-col items-center gap-2">
        <Link href={appConfig.extensionLink} className="my-5">
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
          <p className="text-center text-[16px] text-black opacity-50 font-regular">
            Escape the fine print. Never miss critical timelines. Sign on
            <span className="font-medium"> Docusign</span> as you do, rest is on
            us{" "}
          </p>
        </div>
        <div className="flex items-center gap-5 justify-center mt-10">
          <Link
            href="https://google.com"
            className="rounded-badge flex gap-2 items-center text-[16px] text-violet font-medium px-3 py-2 border-violet border-2 hover:bg-violet group group-hover:text-white transition-all"
          >
            <div className="rounded-full p-2 text-[12px] border-violet border-2 group-hover:border-white group-hover:text-white transition-all flex items-center justify-center w-[20px] h-[20px]">
              1
            </div>
            <p className="group-hover:text-white">Get a glimpse</p>
          </Link>
          <Link
            href="https://google.com"
            className="rounded-badge flex gap-2 items-center text-[16px] text-violet font-medium px-3 py-2 border-violet border-2 hover:bg-violet group group-hover:text-white transition-all"
          >
            <div className="rounded-full p-2 text-[12px] border-violet border-2 group-hover:border-white group-hover:text-white transition-all flex items-center justify-center w-[20px] h-[20px]">
              2
            </div>
            <p className="group-hover:text-white">Get a glimpse</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
