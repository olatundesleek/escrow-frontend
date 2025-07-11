import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
      const res = await fetch(`/api/payment-status?reference=${reference}`);
      const data = await res.json();

      if (data.status === "success") {
        const type = data.transaction?.type;

        if (type === "escrow") {
          const escrowId = data.escrowId;
          router.push(`/dashboard/sescrow/${escrowId}`);
        } else if (type === "addfunds") {
          router.push(`/dashboard/wallet`);
        } else {
          setStatus("failed");
        }
      } else if (data.status === "pending") {
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
    } catch (err) {
      console.log(err);
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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Verifying your payment...</p>
        </div>
      ) : status === "failed" ? (
        <div className="text-yellow-600">
          <h2 className="text-2xl font-bold mb-2">Still Processing</h2>
          <p>
            Please check your dashboard for the latest update on your payment.
          </p>
        </div>
      ) : null}
    </div>
  );
}
