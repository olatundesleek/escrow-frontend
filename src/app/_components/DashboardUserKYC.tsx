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

// Extend the Window type safely for QoreID
declare global {
  interface Window {
    onQoreSubmit?: (response: unknown) => void;
    onQoreError?: (error: unknown) => void;
    onQoreClose?: () => void;
  }
}

export default function DashboardUserKYC({
  username,
  applicant,
}: DashboardUserKYCProps) {
  const [sdkReady, setSdkReady] = useState(false);

  // ---- Load QoreID SDK dynamically ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptUrl = "https://dashboard.qoreid.com/qoreid-sdk/qoreid.js";
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`
    );

    if (existingScript) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      console.log("QoreID SDK loaded");
      setSdkReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load QoreID SDK");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ---- Register QoreID event handlers ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.onQoreSubmit = (response) => {
      console.log("✅ QoreID submitted:", response);
    };

    window.onQoreError = (error) => {
      console.error("❌ QoreID error:", error);
    };

    window.onQoreClose = () => {
      console.log("🔒 QoreID closed");
    };
  }, []);

  const applicantData = JSON.stringify(applicant);

  return (
    <section className="h-full flex justify-center items-center">
      <div className="w-full max-w-md text-center">
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
