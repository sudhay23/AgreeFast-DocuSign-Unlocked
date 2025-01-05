"use client";
import { DocumentChatInterface } from "@/components/DocumentChatInterface";
import { EnvelopeContents } from "@/components/EnvelopeContents";
import { KeyEventsTimeline } from "@/components/KeyEventsTimeline";
import { ObligatoryScoreChart } from "@/components/ObligatoryScoreChart";
import { PartywiseObligationChart } from "@/components/PartywiseObligationChart";
import { SignStatus } from "@/components/SignStatus";
import { useParams } from "next/navigation";
import React from "react";

export default function RoomPage() {
  const { envelopeId } = useParams();
  return (
    <main className="w-full h-full flex flex-col flex-1 pt-3">
      <div className="mb-2">
        <SignStatus signingDate={null} />
      </div>
      <div className="grid grid-cols-6 h-full flex-1 gap-3">
        <div className="col-span-4 flex-1 h-full grid grid-rows-2 gap-3">
          <div className="grid grid-cols-3 gap-3">
            <ObligatoryScoreChart />
            <EnvelopeContents />
            <PartywiseObligationChart />
          </div>
          <div className="w-full mx-auto flex">
            <KeyEventsTimeline />
          </div>
        </div>
        <div className="col-span-2 flex">
          <DocumentChatInterface />
        </div>
      </div>
    </main>
  );
}
