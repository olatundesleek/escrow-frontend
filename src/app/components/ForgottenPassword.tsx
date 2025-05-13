"use client";
import { useRouter } from "next/navigation";
import AuthContent from "./AuthContent";
import forgottentPasswordBanner from "../../../public/forgotten-password.png";
import { AuthInput } from "./AuthInput";
import Button from "./Button";
import { useState } from "react";

export default function ForgottenPasssword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();
  const router = useRouter();
  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      await new Promise((res) => setTimeout(res, 1500));

      setError("");
      router.push("/confirmpassword");
    } catch (err) {
      setError("Password reset failed");
      console.error("Error", err);
    }
  };

  const forgottenPasswordContent = (
    <>
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
      handleSubmit={handleRecoverPassword}
      formContent={forgottenPasswordContent}
      formBanner={forgottentPasswordBanner}
    />
  );
}

// User submits their email on the frontend.

// Frontend sends email to backend via POST /forgot-password.

// Backend validates email and generates a token (or URL with user ID).

// Backend sends an email to the user with a reset password link (e.g. https://your-frontend.com/reset-password/:token).

// User clicks the link, which opens a Reset Password page.

// User submits new password, which the frontend sends to backend via POST /reset-password/:token.

// Backend verifies the token, updates the user's password, and confirms success.
