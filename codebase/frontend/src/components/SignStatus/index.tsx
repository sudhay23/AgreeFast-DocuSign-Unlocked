import { appConfig } from "@/config/config";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const SignStatus = ({ envelopeId }: { envelopeId: string }) => {
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getSignedDate`
        );
        const data = response.data;
        if (data.signed_on === 0) setDate("");
        else setDate(new Date(data.signed_on).toUTCString());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-2 pl-2">
      {loading ? (
        <>
          <span className="loading loading-dots loading-md text-violet"></span>
        </>
      ) : (
        <div className="flex items-center gap-2 pl-2 animate-in zoom-in fade-in duration-1000">
          <Image
            src={date ? "/signed.png" : "/not-signed.png"}
            width={25}
            height={25}
            alt="Signing status logo"
            className="pb-2"
          />
          {date.length > 0 ? (
            <p className="font-light text-black text-[12px] text-opacity-50">
              The envelope has been{" "}
              <span className="font-semibold">signed</span> on{" "}
              <span className="font-semibold">{date}</span>
            </p>
          ) : (
            <p className="font-light text-black text-[12px] text-opacity-50">
              The envelope is <span className="font-semibold">not signed</span>{" "}
              yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};
