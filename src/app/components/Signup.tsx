"use client";
import { ChangeEvent, useState } from "react";
import AuthContent from "./AuthContent";
import signupBanner from "../../../public/signup-banner.png";
import Button from "./Button";
import Link from "next/link";
import { TogglePassword } from "./togglePassword";
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
    email: "",
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
      email,
      Country,
      Phone,
    } = userInfo;
    if (
      firstName &&
      lastName &&
      username &&
      password &&
      confirmPassword &&
      email &&
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
        email,
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
      <div className="w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row">
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="First Name"
            name="firstName"
            type="text"
            value={userInfo.firstName}
            onchange={handleOnchange}
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="Last Name"
            name="lastName"
            type="text"
            value={userInfo.lastName}
            onchange={handleOnchange}
          />
        </div>
      </div>
      <div className="w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row">
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="Username"
            name="username"
            type="text"
            value={userInfo.username}
            onchange={handleOnchange}
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="Email Address"
            name="email"
            type="email"
            value={userInfo.email}
            onchange={handleOnchange}
          />
        </div>
      </div>
      <div className="w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row">
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="Country"
            name="Country"
            type="text"
            value={userInfo.Country}
            onchange={handleOnchange}
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <AuthInput
            InputTitle="Phone"
            name="Phone"
            type="number"
            value={userInfo.Phone}
            onchange={handleOnchange}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row">
        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <TogglePassword
            name="password"
            title="Password"
            password={userInfo.password}
            setPassword={handleOnchange}
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-full lg:1/2">
          <TogglePassword
            name="confirmPassword"
            title="Confirm Password"
            password={userInfo.confirmPassword}
            setPassword={handleOnchange}
          />
        </div>
      </div>

      <div className="flex w-full justify-start gap-1 items-center py-4 2xl:text-xl text-[16px]">
        <label className="font-medium flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2 cursor-pointer" />I
          agree with
        </label>
        <Link href="#" className="text-lime-500 font-medium">
          privacy policy
        </Link>
        ,
        <Link href="#" className="text-lime-500 font-medium">
          Terms of Service
        </Link>
      </div>

      <Button color="bg-lime-500 text-white font-medium w-full" type="submit">
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <div className="flex w-full justify-center gap-2 p-2">
        <p>{"Already have an account?"}</p>
        <Link href="/login" className="text-lime-500 font-medium">
          Sign In
        </Link>
        <p>{"here."}</p>
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
