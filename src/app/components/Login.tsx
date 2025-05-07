"use client";
import Link from "next/link";
import { useState } from "react";
import loginBanner from "../../../public/loginimage.png";
import Button from "./Button";
import AuthContent from "./AuthContent";
import { TogglePassword } from "../utils/togglePassword";
import { Input } from "./input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // Simulate login request
      await new Promise((res) => setTimeout(res, 1500));

      // Success logic here (e.g., redirect, context update)
      console.log("Logged in:", { username, password });
    } catch (err) {
      console.error("Error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginContent = (
    <>
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
      {loading && <p className="text-gray-600 mb-4">Logging in...</p>}

      <div className="w-full">
        <label className="block pt-4 font-medium">
          Username or Email Address
          <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          value={username}
          onchange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="w-full">
        <TogglePassword
          title={"Password"}
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
        />
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
      authPageName="Login"
      aboutAuthPage="Secure your transactions effortlessly. Log in now and experience peace of mind with our trusted platform!"
      handleSubmit={handleSubmit}
      formBanner={loginBanner}
      formContent={loginContent}
    />
  );
}
