import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as m from "motion/react-client";
import { Input } from "../components/AuthInput";

interface TogglePasswordProps {
  name?: string;
  title?: string;
  password: string;
  setPassword: React.ChangeEventHandler<HTMLInputElement>;
}

export const TogglePassword = ({
  name,
  title,
  password,
  setPassword,
}: TogglePasswordProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = isVisible ? FaEye : FaEyeSlash;
  return (
    <>
      <label className="block pt-4 font-medium">
        {title} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Input
          name={name}
          type={`${isVisible ? "password" : "text"}`}
          value={password}
          onchange={setPassword}
        />
        <m.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon className="text-gray-500 text-xl cursor-pointer" />
        </m.div>
      </div>
    </>
  );
};
