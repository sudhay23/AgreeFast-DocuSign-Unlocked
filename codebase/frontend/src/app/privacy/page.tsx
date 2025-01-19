import { PrivacySection } from "@/components/PrivacySection";
import React from "react";

export default function PrivacyPage() {
  return (
    <section className="flex flex-col items-start pt-10">
      <header className="mb-20">
        <h1 className="font-normal text-[30px] text-black">Privacy Policy</h1>
        <p className="font-normal text-[14px] text-black opacity-50 mt-3">
          Last Updated: January 11, 2025
        </p>
      </header>
      <div className="flex flex-col gap-10">
        <PrivacySection heading="1. Introduction">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              Welcome to agreefast. We are committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard
              your information when you use our Chrome extension and related
              services.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="2. Information We Collect">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">Personal Information:</span>{" "}
              When you use agreefast, we may collect personal information from
              your agreements on Docusign, such as key terms and clauses. This
              information is used solely for analysis and insights.
            </p>
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">Usage Data:</span> We collect
              data about how you interact with our extension to improve our
              services. This includes information on features used, interaction
              times, and performance data.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="3. How We Use Your Information">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">To Provide Insights:</span> We
              analyze your agreements to extract key information, such as
              important terms and potential risks.
            </p>
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">To Improve Our Services:</span>{" "}
              Usage data helps us enhance the performance and functionality of
              agreefast.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="4. Data Sharing and Security">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">Data Sharing:</span> We do not
              sell or rent your personal information to third parties. We may
              share data with service providers who assist us in operating our
              extension, under strict confidentiality agreements.
            </p>
            <p className="text-black text-[14px] opacity-50">
              - <span className="font-semibold">Security:</span> We implement
              security measures to protect your data from unauthorized access
              and misuse.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="5. Your Choices">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              You can manage your Docusign account settings directly through
              Docusign. To stop using agreefast, simply uninstall the extension
              from your Chrome browser. You may also adjust your preferences or
              contact us through our website.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="6. Changes to This Policy">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              We may update this Privacy Policy from time to time.
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="7. Contact Us">
          <div className="flex flex-col gap-5">
            <p className="text-black text-[14px] opacity-50">
              If you have any questions or concerns about this Privacy Policy,
              mail us at
              <span className="font-semibold"> mritul2003@gmail.com</span>
            </p>
          </div>
        </PrivacySection>
        <PrivacySection heading="Thanks for using agreefast!">
          <p className="text-black opacity-50">The agreefast team</p>
        </PrivacySection>
      </div>
    </section>
  );
}
