import { importSPKI, jwtVerify } from "jose";
import {
  ResendVerificationEmailResponse,
  LoginFormInputs,
  LoginResponse,
  LogoutResponse,
  RegisterFormInputs,
  RegisterResponse,
  ResetPasswordResponse,
  ResetPasswordTypes,
  VerifyUserTokenResponse,
  VerifyAdminResponse,
  changePasswordType,
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
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        rememberme,
      }),
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

    const setCookieRes = await fetch("/api/auth/set-auth-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      credentials: "include",
    });

    if (!setCookieRes.ok || (!setCookieRes.ok && setCookieRes.status === 400)) {
      const errorData = await setCookieRes.json();
      return { ...errorData, status: setCookieRes.status };
    }

    const data = await setCookieRes.json();

    if (data.success && res.status === 200) return { ...data, token };

    return {
      success: false,
      message: "Login failed",
      status: res.status,
      token: "",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      success: false,
      message,
      token: "",
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
  phone,
}: RegisterFormInputs): Promise<RegisterResponse> {
  const registerUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;

  try {
    const res = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        phone: phone.trim(),
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

// This function handles the logout process by sending a POST request to the server to clear the user's session.
// It returns a promise that resolves to an object containing the success status, message, and user role.
export async function logout(): Promise<LogoutResponse> {
  // const logoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`;
  const logoutUrl = `/api/auth/logout`;

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
      userRole: "user",
    };
  }
}

//This function handles clicking to resend verification email by sending a POST request to the server with the user's email.
// It returns a promise that resolves to an object containing the success status and message.
export async function resendVerificationEmail({
  email,
}: {
  email: string;
}): Promise<ResendVerificationEmailResponse> {
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

// This function verifies the user's token by importing the public key and using it to verify the JWT.
// It returns a promise that resolves to the payload of the verified token or null if verification fails.
export async function verifyUserToken(
  token: string
): Promise<VerifyUserTokenResponse | null> {
  const secret =
    process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET?.replace(/\\n/g, "\n") || "";

  try {
    const cryptoKey = await importSPKI(secret, "RS256");

    const { payload: typedPayload } = await jwtVerify(token, cryptoKey, {
      algorithms: ["RS256"],
    });

    const payload = typedPayload as unknown as VerifyUserTokenResponse;

    return payload || null;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

// This function verifies if the user is an admin by checking the role in the token payload.
// It returns an object indicating whether the user is authorized and a message.
// If the user is not an admin, it returns a forbidden message and authorized as false.
// If the token is invalid or expired, it returns null.
// If the token is valid and the user is an admin, it returns authorized as true and a success message.
export async function verifyAdmin(
  token: string
): Promise<VerifyAdminResponse | null> {
  const secret =
    process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET?.replace(/\\n/g, "\n") || "";

  if (!token) return { authorized: false, message: "Unauthorized" };

  try {
    const cryptoKey = await importSPKI(secret, "RS256");

    const { payload } = await jwtVerify(token, cryptoKey, {
      algorithms: ["RS256"],
    });

    if (payload.role === "user")
      return {
        authorized: false,
        message: "Forbidden: You are not allowed to view this page",
      };

    if (payload.role === "admin")
      return { authorized: true, message: "User is an admin" };

    return { authorized: false, message: "Unauthorized" };
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

export async function getUserRole() {
  try {
    const res = await fetch(`/api/auth/status`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData);
    }

    if (res.ok) return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return { isLoggedIn: false, role: "user" };
  }
}

// This function verifies the email token by sending a GET request to the server.
// It returns a promise that resolves to the result of the verification process with success and message properties.
export async function verifyEmailToken(token: string | null) {
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

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
}

export async function forgottenPassword(email: string) {
  if (!email) {
    return { success: false, message: "Email is required" };
  }
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`;
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, message: error.message };
    }
    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error(error);
    const errMessage = error as Error;
    return { success: false, message: errMessage.message };
  }
}

export const confirmResetPassword = async (token: string | null) => {
  if (!token) {
    return { success: false, message: "Invalid or token not found" };
  }
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/confirm-reset-token/${token}`;
  try {
    const res = await fetch(api, {
      method: "GET",
      headers: { "Context-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message };
    }

    const data = await res.json();
    if (res.ok && data.token) {
      return { success: true, ...data };
    } else {
      return {
        message: data.message || "Invalid token.",
        success: false,
      };
    }
  } catch (err) {
    const errMessage = err as Error;
    return {
      message: errMessage || "Failed to validate token.",
      success: false,
    };
  }
};

export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}: ResetPasswordTypes): Promise<ResetPasswordResponse> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`;
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token,
        password,
        confirmPassword,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
    const data = await res.json();
    return { success: true, ...data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, message };
  }
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: changePasswordType) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/change-password`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });
    console.log(res);
    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    if (newPassword !== confirmNewPassword) {
      return {
        success: false,
        message: "New passwords do not match",
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message,
      ...data,
    };
  } catch (err) {
    console.error("password change error:", err);
    return {
      success: false,
      message: "Network or server error",
    };
  }
};
