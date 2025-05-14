"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthContent from "./AuthContent";
import verificationBanner from "../../../public/code-verification.png";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";
import { verifyToken } from "../_lib/auth";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Record<string, unknown> | undefined>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const handleTokenVerification = async () => {
      if (!token) {
        toast.error("Verification token not found in the URL.");
        setLoading(false);
        return;
      }
      const result = await verifyToken({ token });
      const { message, data, success } = result;
      try {
        if (success) {
          toast.success(message);
          setMessage(data);
        } else {
          toast.error(message);
        }
      } finally {
        setLoading(false);
      }
    };
    handleTokenVerification();
  }, [searchParams]);

  const content = (
    <>
      {loading && <SpinnerMini />}
      {message && (
        <>
          {message}
          <Link className="text-green-400" href={"/(auth)/login"}>
            Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <AuthContent
        authPageName="Verify your account"
        aboutAuthPage={`${
          loading
            ? "Hold on! We're verifying your email..."
            : "Verification Complete"
        }`}
        formContent={content}
        formBanner={verificationBanner}
      />
    </>
  );
}
