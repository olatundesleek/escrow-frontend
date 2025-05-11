"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Alert } from "./Alert";
import AuthContent from "./AuthContent";
import banner from "../../../public/code-verification.png";

export default function CodeVerification() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const res = sessionStorage.getItem("email");
    if (!res) {
      setError("Email not found!");
    }
    if (res) {
      setEmail(res);
    }
    return () => sessionStorage.clear();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const codeVerification = (
    <>
      <Alert
        style={`${error ? "bg-error" : "bg-secondary"}`}
        message={`${
          error ? "An unexpected error occured" : "Enter code to verify account"
        }`}
      />

      <div className="w-full justify-center flex-col items-center py-4 2xl:text-xl text-[16px]">
        <label className="block pt-4 font-medium 2xl:text-xl text-[16px]">
          {"Verification Code"}
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full h-auto flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((_, id) => {
            return (
              <input
                key={id}
                type="tel"
                name="code[]"
                maxLength={1}
                pattern="[0-9]"
                placeholder="*"
                className="h-[50px] p-5 w-[50px] rounded-xl border text-center"
                autoComplete="off"
                required
              />
            );
          })}
        </div>
      </div>

      <Button color="bg-lime-500 text-white font-medium w-full" type="submit">
        Submit
      </Button>

      <div className="flex w-full justify-evenly p-2">
        <span>
          {
            "Please check including your spam folder. If not found, then you can"
          }
        </span>
        <Link href="/forgottenpassword" className="text-lime-500">
          Try Again.
        </Link>
      </div>
    </>
  );

  return (
    <AuthContent
      authPageName={"Code Verification"}
      aboutAuthPage={`A six-digit verification code has been sent to ${email}`}
      handleSubmit={handleSubmit}
      formContent={codeVerification}
      formBanner={banner}
    />
  );
}
