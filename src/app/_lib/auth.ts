import { importSPKI, jwtVerify } from "jose";
import {
  LoginFormInputs,
  LoginResponse,
  RegisterFormInputs,
  RegisterResponse,
} from "./../_types/authTypes";

// This function handles the login process by sending a POST request to the server with the user's credentials.
// It returns a promise that resolves to an object containing the success status and message.
export async function login({
  rememberme,
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`;

  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password, rememberme }),
      credentials: "include",
    });

    if (
      !res.ok ||
      (!res.ok && res.status === 401) ||
      res.status === 403 ||
      res.status === 404
    ) {
      const errorData = await res.json();
      return { ...errorData, status: res.status };
    }

    const { token } = await res.json();

    const setCookieRes = await fetch("/api/set-auth-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!setCookieRes.ok || (!setCookieRes.ok && setCookieRes.status === 400)) {
      const errorData = await setCookieRes.json();
      return { ...errorData, status: setCookieRes.status };
    }

    const data = await setCookieRes.json();

    if (data.success && res.status === 200) return data;

    return {
      success: false,
      message: "Login failed",
      status: res.status,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      success: false,
      message,
    };
  }
}

// This function handles the registration process by sending a POST request to the server with the user's registration details.
// It returns a promise that resolves to an object containing the success status and message.
export async function signUp({
  firstname,
  lastname,
  username,
  email,
  password,
}: RegisterFormInputs): Promise<RegisterResponse> {
  const registerUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;

  try {
    const res = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
      }),
    });

    if (
      !res.ok ||
      (!res.ok && res.status === 400) ||
      (!res.ok && res.status === 409)
    ) {
      const errorData = await res.json();
      return { ...errorData, status: res.status };
    }

    const data = await res.json();

    if (res.status === 201 && data.success) return data;

    return {
      success: false,
      message: "Registration failed",
      status: res.status,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      success: false,
      message,
    };
  }
}

export async function logout(): Promise<{
  success: boolean;
  message?: string;
}> {
  const logoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`;

  try {
    const res = await fetch(logoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { ...errorData };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      success: false,
      message,
    };
  }
}

//This function handles clicking to resend verification email by sending a POST request to the server with the user's email.
// It returns a promise that resolves to an object containing the success status and message.
export async function clickToVerifyEmail({
  email,
}: {
  email: string;
}): Promise<{ success: boolean; message: string }> {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/send-verification-email`;

  try {
    const res = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { ...errorData };
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      success: false,
      message,
    };
  }
}

export async function verifyUserToken(token: string) {
  const secret =
    process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET?.replace(/\\n/g, "\n") || "";

  try {
    const cryptoKey = await importSPKI(secret, "RS256");

    const { payload } = await jwtVerify(token, cryptoKey, {
      algorithms: ["RS256"],
    });

    return payload || null;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

export async function verifyToken(token: string | null) {
  if (!token) {
    return {
      success: false,
      message: "Token not received from server",
    };
  }

  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email/${token}`;

  try {
    const response = await fetch(api, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log(response);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
}
