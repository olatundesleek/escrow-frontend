import { ChangeEvent, useState } from "react";
import AuthContent from "./AuthContent";
import signupBanner from "../../../public/signup-banner.png";
import Button from "./Button";
import Link from "next/link";
import { TogglePassword } from "../utils/togglePassword";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
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
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      emailAddress,
      Country,
      Phone,
    } = userInfo;
    if (
      username &&
      password &&
      confirmPassword &&
      firstName &&
      lastName &&
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
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
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
        <label className="block pt-4 font-medium">
          Username
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleOnchange}
          className="form_input w-full p-4 border border-gray-300 rounded-sm bg-white"
        />
      </div>

      <div className="w-full">
        <TogglePassword
          name="password"
          title="Password"
          password={userInfo.password}
          setPassword={handleOnchange}
        />
      </div>

      <div className="w-full">
        <TogglePassword
          name="confirmPassword"
          title="Confirm Password"
          password={userInfo.confirmPassword}
          setPassword={handleOnchange}
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
      authPageName="Sign Up"
      aboutAuthPage="Join our secure platform today. Register now and unlock the power of safe transactions with ease!"
      handleSubmit={handleSubmit}
      formBanner={signupBanner}
      formContent={signupContent}
    />
  );
}
