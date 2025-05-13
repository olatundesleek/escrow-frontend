"use client";
import AuthContent from "./AuthContent";
import forgottentPasswordBanner from "../../../public/forgotten-password.png";
import { AuthInput } from "./AuthInput";
import Button from "./Button";
import { useState } from "react";
import { Alert } from "./Alert";

export default function ForgottenPasssword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      const response = await fetch(
        "https://escrow-backend-three.vercel.app/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message || "Something went wrong");
      }

      setError("");
      setMessage(data.message);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Password reset failed";
      setError(errorMessage);
      console.error("Error", err);
    }
  };

  const forgottenPasswordContent = (
    <>
      {message && <Alert message={message} style="bg-secondary" />}
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
      <div className="w-full">
        <AuthInput
          InputTitle="Username or Email Address"
          type="email"
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex w-full justify-between items-center py-4 2xl:text-xl text-[16px]">
        <Button color="bg-lime-500 text-white font-medium w-full" type="submit">
          Next
        </Button>
      </div>
    </>
  );

  return (
    <AuthContent
      authPageName={"Recover your account"}
      aboutAuthPage={
        "No worries! Just enter your email address below, and we'll send you a link to reset your password."
      }
      handleSubmit={handleResetPassword}
      formContent={forgottenPasswordContent}
      formBanner={forgottentPasswordBanner}
    />
  );
}
