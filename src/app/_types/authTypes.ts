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

export type authFormInputs = LoginFormInputs | RegisterFormInputs;
