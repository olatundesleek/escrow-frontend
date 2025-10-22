"use client";

import { useEffect, useRef, useState } from "react";

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

// ✅ Declare QoreID event handlers on the global Window type
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
  const qoreContainerRef = useRef<HTMLDivElement>(null);

  // 1️⃣ Define global handlers before rendering
  useEffect(() => {
  window.onQoreSubmit = (response) => {
      console.log("✅ QoreID submitted:", response);
    };

    window.onQoreError = (error) => {
      console.error("❌ QoreID error:", error);
    };

    window.onQoreClose = () => {
      console.log("🔒 QoreID closed");
    };

    return () => {
      delete window.onQoreSubmit;
      delete window.onQoreError;
      delete window.onQoreClose;
    };
  }, []);

  // 2️⃣ Dynamically load SDK
  useEffect(() => {
    const scriptSrc = "https://dashboard.qoreid.com/qoreid-sdk/qoreid.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
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
      setSdkReady(true);
    }
  }, []);

  // 3️⃣ Render QoreID button once SDK is ready
  useEffect(() => {
    if (sdkReady && qoreContainerRef.current) {
      const applicantData = JSON.stringify(applicant);

      const button = document.createElement("qoreid-button");
      button.id = "QoreIDButton";
      button.setAttribute("clientId", "45YG8XCOI7OE77U8R40T");
      button.setAttribute("flowId", "1517");
      button.setAttribute("environment", "sandbox");
      button.setAttribute("customerReference", username);
      button.setAttribute("applicantData", applicantData);
      button.setAttribute("onQoreIDSdkSubmitted", "onQoreSubmit");
      button.setAttribute("onQoreIDSdkError", "onQoreError");
      button.setAttribute("onQoreIDSdkClosed", "onQoreClose");

      qoreContainerRef.current.innerHTML = ""; // clear old content
      qoreContainerRef.current.appendChild(button);
    }
  }, [sdkReady, username, applicant]);

  useEffect(() => {
    const adjustButtonPosition = () => {
      const sdkPopup = document.querySelector<HTMLDivElement>(
        '#QoreIDButton.sdkPopup',
      );

      if (sdkPopup) {
        sdkPopup.style.top = '0';
        sdkPopup.style.position = 'fixed';
        sdkPopup.style.zIndex = '100';
        sdkPopup.style.right = '0';
        sdkPopup.style.left = '0';
        sdkPopup.style.bottom = '0';
        sdkPopup.style.backdropFilter = 'blur(5px)';
        sdkPopup.style.backdropFilter = 'blur(5px)';
        sdkPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        sdkPopup.style.userSelect = 'none';
        sdkPopup.style.webkitUserSelect = 'none';

        console.log('✅ QoreID popup repositioned');
      } else {
        console.warn('⏳ Waiting for QoreIDButton to appear...');
      }
    };

    // Run immediately and again after SDK inserts it
    const interval = setInterval(adjustButtonPosition, 500);

    return () => clearInterval(interval);
  }, []);


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
          <div ref={qoreContainerRef}></div>
        ) : (
          <div className="text-db-text-primary text-sm">
            Loading KYC module...
          </div>
        )}
      </div>
    </section>
  );
}
