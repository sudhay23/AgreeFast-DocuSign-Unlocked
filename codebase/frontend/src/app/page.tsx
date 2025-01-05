import DotPattern from "@/components/ui/dot-pattern";
import { TextAnimate } from "@/components/ui/text-animate";
import { appConfig } from "@/config/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full mt-20">
      <div className="flex flex-col items-center gap-5">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,rgba(255,255,255,0.7),transparent)] -z-10"
          )}
        />
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
          <h1 className="text-center font-semibold text-[40px] w-[800px]">
            Navigate agreements with{" "}
            <span className="text-violet">confidence</span> and{" "}
            <span className="text-violet">automation</span>
          </h1>
          <p className="text-center text-[22px] text-black opacity-50 font-regular">
            Escape the fine print. Never miss critical timelines{" "}
          </p>
        </div>
        <Link href={appConfig.extensionLink} className="mt-10">
          <Image
            src={"/webstore-badge.png"}
            alt="extension badge"
            width={250}
            height={125}
          />
        </Link>
      </div>
    </main>
  );
}
