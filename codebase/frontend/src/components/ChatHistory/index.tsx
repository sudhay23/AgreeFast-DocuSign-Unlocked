import React, { useEffect, useRef } from "react";
import { Chat } from "./types";
import { SparklesIcon } from "hugeicons-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import remarkGfm from "remark-gfm";

export const ChatHistory = ({
  chats,
  chatWithBot,
  loading,
  animState,
  setAnimState,
  chatContainerRef,
}: {
  chats: Chat[];
  chatWithBot: any;
  loading: boolean;
  animState: boolean;
  setAnimState: any;
  chatContainerRef: any;
}) => {
  const searchParams = useSearchParams();

  const p = searchParams.get("p");

  let question1 = "";
  let question2 = "";

  if (p === "1") {
    question1 = "What are the service fee rates applicable?";
    question2 = "What is the area of jurisdiction for the NDA?";
  } else if (p == "2") {
    question1 = "What is the max. value of contract amount?";
    question2 = "When and how should customer content be provided?";
  }

  const chatWithSamplePrompt = async (prompt: string) => {
    try {
      if (!animState) setAnimState(true);
      await chatWithBot(prompt);
    } catch (err) {
      console.log(err);
    }
  };

  const AssistantChatBubble = ({ message }: { message: string }) => {
    return (
      <div className="flex items-start gap-3 w-[80%] self-start">
        <div className="rounded-full min-w-[30px] border">
          <Image
            src={"/logo.png"}
            width={30}
            height={30}
            alt="agreefast logo"
          />
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-8 ">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-6 ">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
            ),
            p: ({ children }) => <p className=" leading-7">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-6  space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6  space-y-2">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-7">{children}</li>,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-border border-black border-opacity-15">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-muted">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="border border-border border-black border-opacity-15 px-4 py-2 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border border-black border-opacity-15 px-4 py-2">
                {children}
              </td>
            ),
          }}
          className="p-4 bg-violet bg-opacity-15 rounded-2xl text-[14px] text-black text-opacity-80"
        >
          {message}
        </ReactMarkdown>
      </div>
    );
  };
  const HumanChatBubble = ({ message }: { message: string }) => {
    return (
      <div className="flex items-start gap-3 w-[80%] self-end justify-end">
        <ReactMarkdown className="p-4 bg-black bg-opacity-10 rounded-2xl text-[14px] text-black text-opacity-80">
          {message}
        </ReactMarkdown>
      </div>
    );
  };

  if (chats.length === 0)
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-5">
            <div className="rounded-full min-w-[30px] min-h-[30px] border">
              <Image
                src={"/logo.png"}
                width={30}
                height={30}
                alt="agreefast logo"
              />
            </div>
            <p className="font-regular text-black text-opacity-40">
              <span className="text-violet">agreefast</span> is thinking
            </p>
            <span className="loading loading-dots loading-md text-violet"></span>
          </div>
        ) : (
          <>
            <h1 className="text-black font-regular text-[20px] text-opacity-60 text-center">
              Ask <span className="text-violet">agreefast</span> questions about
              your envelope
            </h1>
            {question1.length > 0 && question2.length > 0 ? (
              <div className="flex items-center gap-5 flex-wrap justify-start mt-10">
                <button
                  className="flex flex-1 flex-col items-start gap-2 border-2 border-violet border-opacity-50 rounded-xl w-[150px] text-[14px] font-medium p-2 hover:bg-violet hover:bg-opacity-15 transition-all hover:transition-all"
                  onClick={() => chatWithSamplePrompt(question1)}
                >
                  <SparklesIcon size={20} className="text-purple" />
                  <p className="text-black text-opacity-50 text-left">
                    {question1}{" "}
                  </p>
                </button>
                <button
                  className="flex flex-1 flex-col items-start gap-2 border-2 border-violet border-opacity-50 rounded-xl w-[150px] text-[14px] font-medium p-2 hover:bg-violet hover:bg-opacity-15 transition-all hover:transition-all"
                  onClick={() => chatWithSamplePrompt(question2)}
                >
                  <SparklesIcon size={20} className="text-purple" />
                  <p className="text-black text-opacity-50 text-left">
                    {question2}{" "}
                  </p>
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    );
  return (
    <div className="flex-1 h-full py-5">
      <div
        className="max-h-[500px] overflow-y-auto flex flex-col gap-5"
        ref={chatContainerRef}
      >
        {chats.map((chat, idx) => {
          return (
            <>
              {chat.role === "assistant" ? (
                <AssistantChatBubble message={chat.message} key={idx} />
              ) : (
                <HumanChatBubble message={chat.message} key={idx} />
              )}
            </>
          );
        })}
        <span
          className={`loading loading-dots loading-md text-violet ${
            loading ? "opacity-100" : "opacity-0"
          }`}
        ></span>
      </div>
    </div>
  );
};
