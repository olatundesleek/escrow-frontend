"use client";

import { useState, useEffect } from "react";
import { confirmResetPassword, resetPassword } from "../_lib/auth";
import AuthContent from "./AuthContent";
import toast from "react-hot-toast";
import banner from "../../../public/code-verification.png";
import { TogglePassword } from "./TogglePassword";
import { useSearchParams } from "next/navigation";
import Button from "./Button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        toast.error("Missing token.");
        return;
      }

      try {
        const result = await confirmResetPassword(token);
        const { message, success } = result;

        toast[success ? "success" : "error"](message);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword({ token, password, confirmPassword });
      const { message, success } = result;

      toast[success ? "success" : "error"](message);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <>
      <div className="w-full flex justify-center items-center gap-5 flex-col sm:flex-row md:flex-col md:gap-0">
        <TogglePassword
          name="password"
          title="New Password"
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
        />
        <TogglePassword
          title="Confirm Password"
          password={confirmPassword}
          setPassword={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button
        color="bg-lime-500 my-5 text-white font-medium w-full"
        type="submit"
      >
        {isLoading ? "Creating..." : "Create Password"}
      </Button>
    </>
  );

  return (
    <AuthContent
      authPageName="Create New Password"
      aboutAuthPage="Your email has been verified. To secure your account, please create a strong, new password."
      handleSubmit={handleSubmit}
      formContent={formContent}
      formBanner={banner}
    />
  );
}
