import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface LoginFormInputs {
  username: string;
  password: string;
  rememberme: boolean;
}

export interface RegisterFormInputs {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  countryCode: string;
  phone: string;
  email: string;
  agree: boolean;
}

// /**
//  * Represents a country's data returned from the API.
//  */
export interface CountryData {
  name: string;
  code: string;
  cca2: string;
}

export interface country {
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  name: { common: string };
}

export interface CustomCountrySelectProps {
  countries: CountryData[];
  loading: boolean;
  register: UseFormRegister<RegisterFormInputs>;
  setValue: UseFormSetValue<RegisterFormInputs>;
  errors: FieldErrors<RegisterFormInputs>;
  name: "countryCode" | "phoneNumber";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  status?: number;
  email?: string;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  details?: string[];
  status?: number;
}

export interface ResetPasswordTypes {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  userRole: "user" | "admin";
}

export interface ResendVerificationEmailResponse {
  success: boolean;
  message: string;
}

export interface VerifyUserTokenResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  subRole: string;
  iat: number;
  exp: number;
}

export interface VerifyAdminResponse {
  authorized: boolean;
  message: string;
}

export interface changePasswordType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface userType {
  name: string;
  email: string;
  phone: string;
  role: string;
  joined: string;
  avatar: string;
  address: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}
