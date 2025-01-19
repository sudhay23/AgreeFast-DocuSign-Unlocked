import React from "react";

export const PrivacySection = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[18px] font-semibold text-black">{heading}</h3>
      {children}
    </div>
  );
};
