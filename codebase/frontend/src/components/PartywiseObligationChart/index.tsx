import React, { useEffect, useState } from "react";
import DonutChart from "./DonutChart";
import { Obligation, ProcessedData } from "./types";
import { ObligationModal } from "./ObligationModal";
import { openModal } from "@/lib/utils";
import axios from "axios";
import { appConfig } from "@/config/config";

export const PartywiseObligationChart = ({
  envelopeId,
}: {
  envelopeId: string;
}) => {
  const [activeObligationParty, setActiveObligationParty] =
    useState<null | ProcessedData>(null);
  const [obligations, setObligations] = useState<
    {
      obligation_statement: string;
      responsible_party_role_name: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${appConfig.backendUrl}/api/envelope/${envelopeId}/getObligations`
        );
        const data = response.data;
        setObligations(data.obligations);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);
  // const obligations: Obligation[] = [
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement. The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employee is advised to consult with an attorney before signing the agreement.",
  //     responsible_party_role_name: "EMPLOYEE",
  //   },
  //   {
  //     obligation_statement:
  //       "The Employer must provide a copy of the agreement.",
  //     responsible_party_role_name: "EMPLOYER",
  //   },
  // ];

  const handleSegmentClick = (segment: ProcessedData) => {
    setActiveObligationParty(segment);
    openModal("obligations_modal");
  };

  return (
    <div className="border-violet border-2 border-opacity-15 animate-in zoom-in fade-in duration-1000 flex items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center justify-center gap-5">
        {loading ? (
          <span className="loading loading-dots loading-md text-violet"></span>
        ) : (
          <>
            <DonutChart
              data={obligations}
              handleSegmentClick={handleSegmentClick}
            />
            <p className="text-black text-opacity-50 text-[14px]">
              Compliance Obligations
            </p>
          </>
        )}
      </div>
      <ObligationModal activeObligationParty={activeObligationParty} />
    </div>
  );
};
