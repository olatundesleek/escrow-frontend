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
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  details?: string[];
  status?: number;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  userRole: 'user' | 'admin';
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
