import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChatHistory } from "../ChatHistory";
import { Chat } from "../ChatHistory/types";
import { MultiplicationSignIcon } from "hugeicons-react";

export const DocumentChatInterface = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  const chatWithBot = async (prompt: string) => {
    try {
      setLoading(true);
      const responseChat =
        "### Service Fee Conditions\n\n| **Condition**                                                                 | **Service Fee Rate**                                                                                                           |\n|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|\n| For Combined Products with **≥ 90% Tally Content**                            | 14.2% of Tally's direct selling price to customer or Tally Channel Partners' actual distributor cost for BuyCo ARC Customers. |\n| For Combined Products with **≥ 75% and < 90% Tally Content**                  | 3.3% of Tally's direct selling price to customer or Tally Channel Partners' actual distributor cost for BuyCo ARC Customers.  |\n| For Combined Products with **≥ 65% and < 75% Tally Content**                  | 3.2% of Tally's direct selling price to customer or Tally Channel Partners' actual distributor cost for BuyCo ARC Customers.  |\n| For Combined Products with **≥ 50% and < 65% Tally Content**                  | 2.9% of Tally's direct selling price to customer or Tally Channel Partners' actual distributor cost for BuyCo ARC Customers.  |\n| For Combined Products with **≥ 25% and < 50% Tally Content**                  | 2.3% of Tally's direct selling price to customer or Tally Channel Partners' actual distributor cost for BuyCo ARC Customers.  |\n\n---\n\n### Non-Disclosure Agreement (NDA) Duration\n\nThe NDA is effective **from June 7, 2023**, but its specific duration is not mentioned in the provided context.\n\n";
      setChats((prev: any) => [
        ...prev,
        {
          role: "human",
          message: prompt,
        },
        {
          role: "assistant",
          message: responseChat,
        },
      ]);
      setPrompt("");
      setLoading(false);
    } catch (err) {
      setPrompt("");
      setLoading(false);
    }
  };

  const [animState, setAnimState] = useState(false);

  return (
    <>
      <div
        className={`border-violet border-2 border-opacity-15 animate-in zoom-in fade-in duration-1000 py-5 rounded-3xl flex-1 flex flex-col items-start transition-all duration-700 z-20 ${
          animState &&
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] h-[90%] transition-all duration-700"
        }`}
      >
        <div className="w-full flex items-center justify-between py-3 px-8">
          <h1 className="text-[16px] font-medium text-black ">
            Chat with your Docusign Envelope
          </h1>

          {animState && (
            <button
              onClick={() => {
                setAnimState(false);
              }}
              className="hover:opacity-80"
            >
              <MultiplicationSignIcon className="text-red-600" size={35} />
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
              className="w-full rounded-badge text-black text-opacity-60 bg-black bg-opacity-10 outline-none border-none px-3 py-2 pr-11"
              value={prompt}
              placeholder="Type your query here"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <button>
              <SendIcon
                size={20}
                strokeWidth={2}
                className="text-black absolute right-3 bottom-3 hover:opacity-50 transition-all hover:transition-all"
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
