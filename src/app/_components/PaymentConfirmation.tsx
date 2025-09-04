"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function PaymentConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<
    "loading" | "success" | "pending" | "failed"
  >("loading");

  const retriesRef = useRef(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 5;

  const fetchStatus = useCallback(async () => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-payment/${reference}`;

    try {
      const res = await fetch(apiUrl, { credentials: "include" });
      if (!res.ok) {
        setStatus("failed");
        return;
      }

      const jsonResponse = await res.json();
      const data = jsonResponse.confirmation;

      if (!data) {
        setStatus("failed");
        return;
      }

      if (data.status === "success") {
        const type = data.type;
        const escrowId = data.escrow;

        if (type === "escrow_payment" || type === "escrow") {
          router.push(`/dashboard/escrows/${escrowId}`);
        } else if (type === "addfunds") {
          router.push(`/dashboard/wallet`);
        } else if (type === "wallet_deposit") {
          router.push(`/dashboard/wallet`);
        } else {
          // fallback
          if (escrowId) {
            router.push(`/dashboard/escrows/${escrowId}`);
          } else {
            router.push(`/dashboard`);
          }
        }

        setStatus("success");
      } else if (data.status === "pending") {
        setStatus("pending");
        if (retriesRef.current < maxRetries) {
          retriesRef.current++;
          timeOutRef.current = setTimeout(fetchStatus, 2000);
        } else {
          setStatus("failed");
        }
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  }, [reference, router]);

  useEffect(() => {
    if (reference) {
      fetchStatus();
    } else {
      setStatus("failed");
    }

    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, [reference, fetchStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      {status === "loading" || status === "pending" ? (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Verifying your payment...
          </p>
          {status === "pending" && (
            <p className="text-sm text-gray-500 mt-2">
              This might take a moment. Please wait.
            </p>
          )}
        </div>
      ) : status === "failed" ? (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full text-red-600">
          <FaTimesCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">
            Payment Failed or Timed Out
          </h2>
          <p className="text-gray-700">
            We could not confirm your payment at this moment. Please check your
            dashboard for the latest update or contact support.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md"
          >
            Go to Dashboard
          </button>
        </div>
      ) : status === "success" ? (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full text-green-600">
          <FaCheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2">Payment Confirmed!</h2>
          <p className="text-gray-700">
            Your transaction was successful! Redirecting shortly...
          </p>
        </div>
      ) : null}
    </div>
  );
}
