"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthContent from "./AuthContent";
import verificationBanner from "../../../public/code-verification.png";
import { Alert } from "./Alert";

export default function VerifyAccount() {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Verification token not found in the URL.");
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(
          `https://escrow-backend-three.vercel.app/api/auth/verify-email/${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setMessage("Your account has been verified successfully!");
        setError("");
        setTimeout(() => {
          router.push("/login"); // redirect after success
        }, 3000);
      } catch (err) {
        setError((err as Error).message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, router]);

  const content = (
    <>
      {loading && <p className="text-gray-600">Verifying your account...</p>}
      {!loading && error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}
      {!loading && message && (
        <Alert message={message + " Redirecting to login..."} style="success" />
      )}
    </>
  );

  return (
    <AuthContent
      authPageName="Verify your account"
      aboutAuthPage="Hold on! We're verifying your email..."
      handleSubmit={async (e: React.FormEvent) => {
        e.preventDefault();
        return Promise.resolve();
      }}
      formContent={content}
      formBanner={verificationBanner}
    />
  );
}
