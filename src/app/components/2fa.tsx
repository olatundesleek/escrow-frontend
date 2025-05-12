"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import { Alert } from "./Alert";
import AuthContent from "./AuthContent";
import banner from "../../../public/code-verification.png";

export default function CodeVerification() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string[]>(Array(6).fill("")); // Array for 6-digit code
  const inputRefs = useRef<HTMLInputElement[]>([]); // Refs for input fields

  useEffect(() => {
    const emailFromSession = sessionStorage.getItem("email");
    if (!emailFromSession) {
      setError("Email not found!");
    } else {
      setEmail(emailFromSession);
    }
    setLoading(false);

    return () => {
      sessionStorage.clear();
    };
  }, []);

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus on the next input field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      setError("Please enter the complete verification code.");
      return;
    }

    try {
      setLoading(true);
      const verificationCode = code.join("");
      console.log("Verification Code Submitted:", verificationCode);

      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));

      setError("");
      alert("Code verified successfully!");
      // Redirect or perform further actions here
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const codeVerification = (
    <>
      {loading && (
        <Alert
          style={`${error ? "bg-error" : "bg-secondary"}`}
          message={`${
            error
              ? "An unexpected error occurred"
              : "Enter code to verify account"
          }`}
        />
      )}

      <div className="w-full flex flex-col py-4 2xl:text-xl text-[16px]">
        <label className="block pt-4 font-medium 2xl:text-xl text-[16px]">
          Verification Code <span className="text-red-500">*</span>
        </label>
        <div className="w-full h-auto flex justify-center items-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              type="tel"
              name={`code-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              placeholder="*"
              className="h-[60px] w-[65px] rounded-lg border-gray-400 border-1 text-center text-xl outline-lime-400"
              autoComplete="off"
              required
            />
          ))}
        </div>
      </div>

      <Button color="bg-lime-500 text-white font-medium w-full" type="submit">
        Submit
      </Button>

      <div className="w-full p-2 text-center">
        Please check your spam folder if you don’t see the email. If not found,
        you can
        <Link href="/forgottenpassword" className="text-lime-500">
          Try Again.
        </Link>
      </div>
    </>
  );

  const encriptedAddress = [email].map(
    (text) => `${text?.split("")[0]}***gmail.com`
  );

  return (
    <AuthContent
      authPageName="Code Verification"
      aboutAuthPage={`A six-digit verification code has been sent to ${encriptedAddress}`}
      handleSubmit={handleSubmit}
      formContent={codeVerification}
      formBanner={banner}
    />
  );
}
