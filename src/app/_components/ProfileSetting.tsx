import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: { message?: string };
  type?: string;
}

export const InputField = ({
  label,
  id,
  register,
  error,
  type = "text",
  ...props
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      {...props}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    />
    {error && <p className="text-red-600 text-xs">{error.message}</p>}
  </div>
);

export const InfoItem = ({
  icon: Icon,
  text,
  color,
}: {
  icon: React.ElementType;
  text: string;
  color?: string;
}) => (
  <div className="flex items-center gap-2 text-xs">
    <Icon className={color} />
    <span>{text}</span>
  </div>
);

interface PasswordFieldProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: { message?: string };
  show: boolean;
  toggleShow: () => void;
}

export const PasswordField = ({
  id,
  label,
  register,
  error,
  show,
  toggleShow,
}: PasswordFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        {...register}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
        placeholder="********"
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={toggleShow}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && <p className="text-red-600 text-xs">{error.message}</p>}
  </div>
);
