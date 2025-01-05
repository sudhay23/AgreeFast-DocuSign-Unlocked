import Image from "next/image";
import React from "react";

export const SignStatus = ({ signingDate }: { signingDate: number | null }) => {
  const date = signingDate ? new Date(signingDate).toUTCString() : null;
  return (
    <div className="flex items-center gap-2 pl-2">
      <Image
        src={date ? "/signed.png" : "/not-signed.png"}
        width={25}
        height={25}
        alt="Signing status logo"
        className="pb-2"
      />
      {date ? (
        <p className="font-light text-black text-[12px] text-opacity-50">
          The envelope has been <span className="font-semibold">signed</span> on{" "}
          <span className="font-semibold">{date}</span>
        </p>
      ) : (
        <p className="font-light text-black text-[12px] text-opacity-50">
          The envelope is <span className="font-semibold">not signed</span> yet
        </p>
      )}
    </div>
  );
};
