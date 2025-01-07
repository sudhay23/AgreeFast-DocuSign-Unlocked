"use client";

import { MailOpen01Icon } from "hugeicons-react";

export const ActivationWarning = () => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center text-white p-4">
      <div className="text-center flex flex-col items-center gap-5">
        <MailOpen01Icon className="animate-jiggle" size={100} />
        <div>
          <h2 className="text-2xl font-bold">
            The agreefast dashboard for this envelope has not been activated yet
          </h2>
          <p className="text-gray-300">
            Reach out to the envelope sender/owner regarding the activation
          </p>
        </div>
      </div>
    </div>
  );
};
