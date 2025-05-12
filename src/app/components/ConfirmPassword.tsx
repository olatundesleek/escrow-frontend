"use client";

import AuthContent from "./AuthContent";
import banner from "../../../public/code-verification.png";
import { useState } from "react";
import { TogglePassword } from "./togglePassword";
import Button from "./Button";

export default function ConfirmPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await new Promise((res) => setInterval(res, 1500));
      console.log("Password changed successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <>
      <div className="w-full flex justify-center items-center gap-5 flex-col sm:flex-row md:flex-col md:gap-0">
        <TogglePassword
          name={"password"}
          title={"New Password"}
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
        />

        <TogglePassword
          name={"password"}
          title={"Confirm Password"}
          password={confirmPassword}
          setPassword={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        color="bg-lime-500 my-5 text-white font-medium w-full"
        type="submit"
      >
        {loading ? "Creating..." : "Create Password"}
      </Button>
    </>
  );

  return (
    <AuthContent
      authPageName={"Create New Password"}
      aboutAuthPage={
        "Your email has been verified. To secure your account, please create a strong, new password."
      }
      handleSubmit={handleSubmit}
      formContent={formContent}
      formBanner={banner}
    />
  );
}
