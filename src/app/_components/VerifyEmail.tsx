"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthContent from "./AuthContent";
import verificationBanner from "../../../public/code-verification.png";
import Link from "next/link";
import { verifyEmailToken } from "../_lib/auth";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Button from "./Button";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    const handleTokenVerification = async () => {
      try {
        const result = await verifyEmailToken(token);
        const { message, success } = result;

        if (success) {
          toast.success(message);
          setMessage(message);
          setStatus("success");
        } else {
          toast.error(message);
          setMessage(message);
          setStatus("error");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Something went wrong. Please try again."
          );
          setMessage(error.message);
        } else {
          toast.error("Something went wrong. Please try again.");
          setMessage("Unexpected error occurred during verification.");
        }
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    handleTokenVerification();
  }, [searchParams]);

  const content = (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {message && (
            <p
              className={`mt-4 text-center ${
                status === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          {status === "success" && (
            <Link href={"/login"}>
              <Button> Go to Login</Button>
            </Link>
          )}
          {status === "error" && (
            <Button
              style="mt-3"
              // onClick={async () => await RetryVerification()}
            >
              Retry Verification
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <AuthContent
      authPageName="Verify your account"
      aboutAuthPage={
        loading
          ? "Hold on! We're verifying your email..."
          : status === "success"
          ? "Verification Successful"
          : "Verification Failed"
      }
      formContent={content}
      formBanner={verificationBanner}
    />
  );
}
