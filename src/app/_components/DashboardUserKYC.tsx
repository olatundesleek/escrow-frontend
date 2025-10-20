"use client";

import { useEffect, useState } from "react";

interface ApplicantData {
  firstname: string;
  lastname: string;
  phone: string;
  email?: string;
}

interface DashboardUserKYCProps {
  username: string;
  applicant: ApplicantData;
}

export default function DashboardUserKYC({
  username,
  applicant,
}: DashboardUserKYCProps) {
  const [sdkReady, setSdkReady] = useState(false);

  // Load QoreID SDK dynamically
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://dashboard.qoreid.com/qoreid-sdk/qoreid.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://dashboard.qoreid.com/qoreid-sdk/qoreid.js";
      script.async = true;

      script.onload = () => {
        console.log("✅ QoreID SDK loaded");
        setSdkReady(true);
      };

      script.onerror = () => {
        console.error("❌ Failed to load QoreID SDK");
      };

      document.body.appendChild(script);
    } else {
      // SDK already loaded
      setSdkReady(true);
    }
  }, []);

  // Register QoreID event handlers
  // useEffect(() => {
  //   (window).onQoreSubmit = (response) => {
  //     console.log("✅ QoreID submitted:", response);
  //   };

  //   (window).onQoreError = (error) => {
  //     console.error("❌ QoreID error:", error);
  //   };

  //   (window).onQoreClose = () => {
  //     console.log("🔒 QoreID closed");
  //   };
  // }, []);

  const applicantData = JSON.stringify(applicant);

  return (
    <section className="h-full flex justify-center items-center">
      <div className="w-full max-w-mdtext-center">
        <h1 className="text-2xl font-semibold text-db-text mb-2">
          Verify your identity
        </h1>
        <p className="text-sm text-db-text-primary mb-6">
          Verify your identity securely
        </p>

        {sdkReady ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <qoreid-button
                  id="QoreIDButton"
                  clientId="45YG8XCOI7OE77U8R40T"
                  flowId="1517"
                  environment="sandbox"
                  customerReference="${username}"
                  applicantData='${applicantData}'
                  onQoreIDSdkSubmitted="onQoreSubmit"
                  onQoreIDSdkError="onQoreError"
                  onQoreIDSdkClosed="onQoreClose"
                ></qoreid-button>
              `,
            }}
          />
        ) : (
          <div className="text-db-text-primary text-sm">
            Loading KYC module...
          </div>
        )}
      </div>
    </section>
  );
}
