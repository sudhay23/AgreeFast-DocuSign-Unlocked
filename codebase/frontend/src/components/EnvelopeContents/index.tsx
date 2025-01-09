import { appConfig } from "@/config/config";
import axios from "axios";
import { DocumentAttachmentIcon } from "hugeicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export const EnvelopeContents = ({ envelopeId }: { envelopeId: string }) => {
  const [files, setFiles] = useState<
    {
      file_name: string;
      file_uri: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getAgreements`
        );
        const data = response.data;
        setFiles(data.agreements);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="border-violet border-2 border-opacity-25  py-5 rounded-3xl h-full flex flex-col items-start">
      <h1 className="text-[16px] font-medium text-black px-8 pt-3">
        Envelope Contents
      </h1>
      {loading ? (
        <span className="loading loading-dots loading-md text-violet mx-auto my-auto"></span>
      ) : (
        <div className="flex flex-wrap gap-5 mt-5 justify-start ml-5 px-5 pt-2 max-h-[200px] w-full overflow-y-auto flex-1 ">
          {files.map((file, idx) => (
            <div
              key={idx}
              className={`animate-in zoom-in fade-in duration-1000`}
            >
              <Link
                href={`${appConfig.backendUrl}${file.file_uri}`}
                target="_blank"
                className="flex flex-col items-center gap-3 hover:scale-105 cursor-pointer transition-all hover:transition-all"
                data-tooltip-id="filename-tooltip"
                data-tooltip-content={file.file_name}
              >
                <div className="rounded-xl border-violet border-2 border-opacity-25 w-[40px] h-[40px] flex items-center justify-center">
                  <DocumentAttachmentIcon
                    size={15}
                    className="text-violet"
                    strokeWidth={2}
                  />
                </div>

                <p className="text-[12px] text-black text-opacity-50 font-medium truncate w-[50px]">
                  {file.file_name}
                </p>
              </Link>
              <Tooltip
                id="filename-tooltip"
                style={{
                  fontSize: "10px",
                  backgroundColor: "whitesmoke",
                  color: "black",
                }}
                place={"bottom-end"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
