"use client";
import { ChangeEvent, useState } from "react";
import AuthContent from "./AuthContent";
import signupBanner from "../../../public/signup-banner.png";
import Button from "./Button";
import Link from "next/link";
import { TogglePassword } from "../utils/togglePassword";
import { AuthInput } from "./AuthInput";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    emailAddress: "",
    Country: "",
    Phone: "",
  });

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const {
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
      emailAddress,
      Country,
      Phone,
    } = userInfo;
    if (
      firstName &&
      lastName &&
      username &&
      password &&
      confirmPassword &&
      emailAddress &&
      Country &&
      Phone
    ) {
      console.log(userInfo);
    } else {
      setError("All fields are required");
    }

    setLoading(true);
    try {
      // Simulate login request
      await new Promise((res) => setTimeout(res, 1500));

      // Success logic here (e.g., redirect, context update)
      console.log("Logged in:", {
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
        emailAddress,
        Country,
        Phone,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signupContent = (
    <>
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
      {loading && <p className="text-gray-600 mb-4">Logging in...</p>}

      <div className="w-full">
        <AuthInput
          InputTitle="First Name"
          name="firstName"
          type="text"
          value={userInfo.firstName}
          onchange={handleOnchange}
        />
      </div>
      <div className="w-full">
        <AuthInput
          InputTitle="Last Name"
          name="lastName"
          type="text"
          value={userInfo.lastName}
          onchange={handleOnchange}
        />
      </div>

      <div className="w-full flex justify-between items-center gap-2">
        <label className="w-1/2">
          <TogglePassword
            name="password"
            title="Password"
            password={userInfo.password}
            setPassword={handleOnchange}
          />
        </label>

        <label className="w-1/2">
          <TogglePassword
            name="confirmPassword"
            title="Confirm Password"
            password={userInfo.confirmPassword}
            setPassword={handleOnchange}
          />
        </label>
      </div>

      <div className="flex w-full justify-between items-center py-4">
        <label className="font-medium flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2 cursor-pointer" />
          Remember me
        </label>
        <Link href="#" className="text-secondary">
          Forgotten Password?
        </Link>
      </div>

      <Button color="bg-secondary text-white font-medium w-full" type="submit">
        {loading ? "Logging in..." : "Log In"}
      </Button>

      <div>
        {"Don't have any account?"}
        <Link href="#" className="text-secondary">
          Create Account
        </Link>
      </div>
    </>
  );
  return (
    <AuthContent
      authPageName="Sign Up"
      aboutAuthPage="Join our secure platform today. Register now and unlock the power of safe transactions with ease!"
      handleSubmit={handleSubmit}
      formBanner={signupBanner}
      formContent={signupContent}
    />
  );
}
