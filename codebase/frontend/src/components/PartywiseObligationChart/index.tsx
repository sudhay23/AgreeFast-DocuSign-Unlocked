import React, { useState } from "react";
import DonutChart from "./DonutChart";
import { Obligation, ProcessedData } from "./types";
import { ObligationModal } from "./ObligationModal";
import { openModal } from "@/lib/utils";

export const PartywiseObligationChart = () => {
  const [activeObligationParty, setActiveObligationParty] =
    useState<null | ProcessedData>(null);
  const obligations: Obligation[] = [
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
    {
      obligation_statement:
        "The Employee is advised to consult with an attorney before signing the agreement.",
      responsible_party_role_name: "EMPLOYEE",
    },
    {
      obligation_statement:
        "The Employer must provide a copy of the agreement.",
      responsible_party_role_name: "EMPLOYER",
    },
  ];

  const handleSegmentClick = (segment: ProcessedData) => {
    setActiveObligationParty(segment);
    openModal("obligations_modal");
  };

  return (
    <div className="border-violet border-2 border-opacity-15 flex items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <DonutChart
          data={obligations}
          handleSegmentClick={handleSegmentClick}
        />
        <p className="text-black text-opacity-50 text-[14px]">
          Compliance Obligations
        </p>
      </div>
      <ObligationModal activeObligationParty={activeObligationParty} />
    </div>
  );
};
