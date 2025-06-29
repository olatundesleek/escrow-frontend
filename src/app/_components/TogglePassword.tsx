import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as m from "motion/react-client";
import { AuthInput } from "./AuthInput";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TogglePasswordProps<T extends FieldValues> {
  name?: keyof T;
  title?: string;
  password?: string;
  setPassword?: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  register?: UseFormRegister<T>;
  error?: string;
  style?: string;
}

export const TogglePassword = <T extends FieldValues>({
  name,
  title,
  password,
  setPassword,
  register,
  error,
  style = "p-4",
}: TogglePasswordProps<T>) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = isVisible ? FaEye : FaEyeSlash;
  return (
    <>
      <div className="relative">
        <AuthInput InputTitle={title} name={name as string}>
          <input
            placeholder="Password"
            autoComplete={name as string}
            id={name as string}
            type={`${isVisible ? "password" : "text"}`}
            {...(register && name
              ? register(name as Path<T>, {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })
              : { value: password, onChange: setPassword })}
            className={` w-full ${style} pr-12 border border-primary rounded-sm bg-white ${
              error ? "border-error" : ""
            }`}
          />
          {error && <span className="text-error text-sm">{error}</span>}
        </AuthInput>

        <m.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`absolute right-4 transform -translate-y-1/2 ${
            error ? "top-3/5" : "top-3/4"
          }`}
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon className="text-gray-500 text-xl cursor-pointer" />
        </m.div>
      </div>
    </>
  );
};
