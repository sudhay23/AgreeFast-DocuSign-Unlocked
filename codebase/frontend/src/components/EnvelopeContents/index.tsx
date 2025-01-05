import { DocumentAttachmentIcon } from "hugeicons-react";
import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tooltip";

export const EnvelopeContents = () => {
  const files = [
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      fileName: "Coolest agreement.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];
  return (
    <div className="border-violet border-2 border-opacity-15 p-8 rounded-3xl flex">
      <h1 className="text-[16px] font-medium text-black">Envelope Contents</h1>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-7 p-2 max-h-[150px] w-full overflow-y-auto flex-1">
        {files.map((file, idx) => (
          <div key={idx}>
            <Link
              href={file.fileUrl}
              target="_blank"
              className="flex flex-col items-center gap-3 hover:scale-105 cursor-pointer transition-all hover:transition-all"
              data-tooltip-id="filename-tooltip"
              data-tooltip-content={file.fileName}
            >
              <div className="rounded-xl bg-violet bg-opacity-5 w-[40px] h-[40px] flex items-center justify-center">
                <DocumentAttachmentIcon
                  size={15}
                  className="text-violet"
                  strokeWidth={2}
                />
              </div>

              <p className="text-[12px] text-black text-opacity-50 font-medium truncate max-w-[70px]">
                {file.fileName}
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
    </div>
  );
};
