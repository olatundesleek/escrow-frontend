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
  email: string;
  agree: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  status?: number;
  email?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  details?: string[];
  status?: number;
}