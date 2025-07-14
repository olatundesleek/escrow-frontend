"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<
    "loading" | "success" | "pending" | "failed"
  >("loading");
  const [retries, setRetries] = useState(0);
  const maxRetries = 5;

  const fetchStatus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-payment/${reference}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log("API Response updated:", data);

      // ✅ Check based on paymentStatus field
      if (data.paymentStatus === "paid") {
        setStatus("success");

        const type = data.transaction?.type;
        const escrowId = data.escrowId;

        // ✅ Redirect after 3s
        setTimeout(() => {
          if (type === "escrow" || type === "escrows") {
            router.push(`/dashboard/escrows/${escrowId}`);
          } else if (type === "addfunds") {
            router.push(`/dashboard/wallet`);
          } else {
            setStatus("failed");
          }
        }, 3000);
      } else if (data.paymentStatus === "unpaid" || data.status === "pending") {
        // ⏳ Retry if still pending
        if (retries < maxRetries) {
          setTimeout(() => {
            setRetries((prev) => prev + 1);
            fetchStatus();
          }, 2000);
        } else {
          setStatus("failed");
        }
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (reference) {
      fetchStatus();
    }
  }, [reference]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {status === "loading" || status === "pending" ? (
        <div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Verifying your payment...</p>
        </div>
      ) : status === "success" ? (
        <div className="text-green-600">
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p>Redirecting you to your dashboard...</p>
        </div>
      ) : (
        <div className="text-yellow-600">
          <h2 className="text-2xl font-bold mb-2">Still Processing</h2>
          <p>
            Please check your dashboard for the latest update on your payment.
          </p>
        </div>
      )}
    </div>
  );
}
