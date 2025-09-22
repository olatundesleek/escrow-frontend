import { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormValues } from "../_types/dashboardServicesTypes";

/* -------------------- InputField -------------------- */
interface InputFieldProps {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FormValues>>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  register,
  error,
  type = "text",
  placeholder,
  disabled,
}) => (
  <div className="flex flex-col w-full">
    <label
      htmlFor={id}
      className="mb-1 text-sm font-medium text-db-text-primary"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-4 border rounded-lg shadow-sm text-sm 
        bg-db-background text-db-text-primary
        focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200
        placeholder:text-db-text-secondary disabled:opacity-50 disabled:cursor-not-allowed
        ${
          error
            ? "border-db-error focus:ring-db-error/50"
            : "border-db-border focus:border-db-primary focus:ring-db-primary/40"
        }`}
    />
    {error && (
      <p className="mt-1 text-xs text-db-error font-medium">{error.message}</p>
    )}
  </div>
);

/* -------------------- PasswordField -------------------- */
interface PasswordFieldProps {
  id: string;
  label: string;
  register: ReturnType<UseFormRegister<FormValues>>;
  error?: FieldError;
  show: boolean;
  toggleShow: () => void;
  placeholder?: string;
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
  <div className="flex flex-col w-full">
    <label
      htmlFor={id}
      className="mb-1 text-sm font-medium text-db-text-primary"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        {...register}
        placeholder={placeholder}
        className={`w-full px-3 py-4 pr-10 border rounded-lg shadow-sm text-sm 
          bg-db-background text-db-text-primary
          focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200
          placeholder:text-db-text-secondary
          ${
            error
              ? "border-db-error focus:ring-db-error/50"
              : "border-db-border focus:border-db-primary focus:ring-db-primary/40"
          }`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute inset-y-0 right-0 pr-3 flex items-center 
                   text-db-text-secondary hover:text-db-text-primary transition-colors duration-200"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && (
      <p className="mt-1 text-xs text-db-error font-medium">{error.message}</p>
    )}
  </div>
);

/* -------------------- InfoItem -------------------- */
interface InfoItemProps {
  icon: React.ElementType;
  text: string;
  color: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  text,
  color,
}) => (
  <div
    className="flex items-center w-full sm:w-auto gap-2 text-sm 
               text-db-text-primary p-3 rounded-lg border border-db-border
               bg-db-background hover:bg-db-primary/5 transition-colors duration-200"
  >
    <Icon className={`${color} text-lg shrink-0`} />
    <span className="truncate">{text}</span>
  </div>
);
