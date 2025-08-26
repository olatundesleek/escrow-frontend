import { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormValues } from "../_types/dashboardServicesTypes";

// Mock InputField component
interface InputFieldProps {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FormValues>>;
  error?: FieldError;
  type?: string;
  placeholder?: string; // Added placeholder prop
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  register,
  error,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      placeholder={placeholder} // Applied placeholder
      className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200 appearance-none ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-300"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

// Mock PasswordField component
interface PasswordFieldProps {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FormValues>>;
  error?: FieldError;
  show: boolean;
  toggleShow: () => void;
  placeholder?: string; // Added placeholder prop
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  register,
  error,
  show,
  toggleShow,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        {...register}
        placeholder={placeholder} // Applied placeholder
        className={`w-full p-2.5 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200 appearance-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
        }`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

// Mock InfoItem component
interface InfoItemProps {
  icon: React.ElementType; // Icon component
  text: string;
  color: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  text,
  color,
}) => (
  <div className="flex items-center gap-2 text-sm text-gray-700 w-full sm:w-auto p-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
    {text ? <Icon className={`${color} text-lg`} /> : ""}
    <span>{text}</span>
  </div>
);
