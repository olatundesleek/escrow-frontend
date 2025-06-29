"use client";
import AuthContent from "./AuthContent";
import forgottentPasswordBanner from "../../../public/forgotten-password.png";
import { AuthInput } from "./AuthInput";
import Button from "./Button";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { forgottenPassword } from "../_lib/auth";
import toast from "react-hot-toast";

export default function ForgottenPasssword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await forgottenPassword(email);
      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }
      if (res.success) {
        toast.success(res.message || "A link has been sent to your email");
      }
    } catch (error) {
      const errMessage = error as Error;
      toast.error(errMessage.message);
    } finally {
      setIsLoading(false);
    }
  };

  const forgottenPasswordContent = (
    <>
      <div className="w-full">
        <AuthInput
          placeholder="youremail@email.com"
          InputTitle="Username or Email Address"
          type="email"
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex w-full justify-between items-center py-4 2xl:text-xl text-[16px]">
        <Button
          color="bg-secondary text-white font-medium w-full flex justify-center"
          type="submit"
        >
          {isLoading ? <SpinnerMini /> : "Submit"}
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
