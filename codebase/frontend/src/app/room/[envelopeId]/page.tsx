"use client";
import { ActivationWarning } from "@/components/ActivationWarning";
import { DocumentChatInterface } from "@/components/DocumentChatInterface";
import { EnvelopeContents } from "@/components/EnvelopeContents";
import { KeyEventsTimeline } from "@/components/KeyEventsTimeline";
import { ObligatoryScoreChart } from "@/components/ObligatoryScoreChart";
import { PartywiseObligationChart } from "@/components/PartywiseObligationChart";
import { SignStatus } from "@/components/SignStatus";
import { appConfig } from "@/config/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RoomPage() {
  const { envelopeId } = useParams();
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getActivationStatus`
        );
        const data = response.data;
        setActivated(data.isActive);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <main className="w-full h-full flex-1 flex items-center justify-center">
        <span className="loading loading-dots loading-lg text-violet"></span>
      </main>
    );
  if (!activated) return <ActivationWarning />;
  return (
    <main className="w-full h-full flex flex-col flex-1 pt-3">
      <div className="mb-2">
        <SignStatus envelopeId={envelopeId as string} />
      </div>
      <div className="grid grid-cols-6 h-full flex-1 gap-3">
        <div className="col-span-4 flex-1 h-full grid grid-rows-2 gap-3">
          <div className="grid grid-cols-3 gap-3">
            <ObligatoryScoreChart envelopeId={envelopeId as string} />
            <EnvelopeContents envelopeId={envelopeId as string} />
            <PartywiseObligationChart envelopeId={envelopeId as string} />
          </div>
          <div className="w-full mx-auto flex">
            <KeyEventsTimeline envelopeId={envelopeId as string} />
          </div>
        </div>
        <div className="col-span-2 flex">
          <DocumentChatInterface envelopeId={envelopeId as string} />
        </div>
      </div>
    </main>
  );
}
