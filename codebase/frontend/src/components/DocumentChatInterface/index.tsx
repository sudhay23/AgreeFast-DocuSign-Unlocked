import { SendIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ChatHistory } from "../ChatHistory";
import { Chat } from "../ChatHistory/types";
import { ArrowExpand01Icon, MultiplicationSignIcon } from "hugeicons-react";
import { socket } from "@/lib/socket";

export const DocumentChatInterface = ({
  envelopeId,
}: {
  envelopeId: string;
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      console.log("Socket connected");
    }

    function onDisconnect() {
      console.log("Socket disconnected");
    }
    function onChatResponse(payload: any) {
      const reply = payload.response;
      setChats((prev: any) => [
        ...prev,
        {
          role: "assistant",
          message: reply,
        },
      ]);
      setLoading(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("ai_response", onChatResponse);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ai_response", onChatResponse);
    };
  }, []);

  const chatWithBot = async (prompt: string) => {
    try {
      setLoading(true);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      setPrompt("");
      setChats((prev: any) => [
        ...prev,
        {
          role: "human",
          message: prompt,
        },
      ]);
      const data = {
        user_question: prompt,
        envelope_id: envelopeId,
      };
      socket.emit("chat", data);
    } catch (err) {
      console.log(err);
      setPrompt("");
      setLoading(false);
    }
  };

  const [animState, setAnimState] = useState(false);

  return (
    <>
      <div
        className={`border-violet border-2 border-opacity-25 animate-in zoom-in fade-in duration-1000 py-5 rounded-3xl flex-1 flex flex-col items-start transition-all z-20 ${
          animState &&
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] h-[90%] transition-all duration-700"
        }`}
      >
        <div className="w-full flex items-center justify-between py-3 px-8">
          <h1 className="text-[16px] font-medium text-black ">
            Chat with your Docusign Envelope
          </h1>

          {animState ? (
            <button
              onClick={() => {
                setAnimState(false);
              }}
              className="hover:opacity-80"
            >
              <MultiplicationSignIcon className="text-red-600" size={35} />
            </button>
          ) : (
            <button
              onClick={() => {
                setAnimState(true);
              }}
              className="hover:opacity-80"
            >
              <ArrowExpand01Icon className="text-black opacity-50" size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col flex-1 w-full px-5">
          <ChatHistory
            chats={chats}
            chatWithBot={chatWithBot}
            loading={loading}
            animState={animState}
            setAnimState={setAnimState}
            chatContainerRef={chatContainerRef}
          />
          <form
            className="w-full relative"
            onSubmit={async (e: any) => {
              try {
                e.preventDefault();
                if (prompt.length === 0) return;
                if (!animState) setAnimState(true);
                await chatWithBot(prompt);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <input
              className="w-full rounded-badge text-black text-opacity-60 bg-black bg-opacity-10 outline-none border-none px-5 text-[14px] py-2 pr-11"
              value={prompt}
              placeholder="Type your query here"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <button>
              <SendIcon
                size={15}
                strokeWidth={2}
                className="text-black absolute right-5 bottom-3 hover:opacity-50 transition-all hover:transition-all"
              />
            </button>
          </form>
        </div>
      </div>
      <div
        className={`absolute w-[102vw] h-[102vh] bg-black bg-opacity-35 top-0 left-0 transition-all ${
          animState ? "z-10 opacity-100" : "-z-10 opacity-0"
        }`}
      ></div>
    </>
  );
};
