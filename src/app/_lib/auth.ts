export async function login({
  rememberme,
  username,
  password,
}: {
  username: string;
  password: string;
  rememberme: boolean;
}): Promise<{
  success: boolean;
  message: string;
  status?: number;
  email?: string;
}> {
  const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`;

  try {
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, password, rememberme }),
      credentials: 'include',
    });

    if (
      (!res.ok && res.status === 401) ||
      res.status === 403 ||
      res.status === 404
    ) {
      const errorData = await res.json();
      return { ...errorData, status: res.status };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return {
      success: false,
      message,
    };
  }
}

export async function clickToVerifyEmail({
  email,
}: {
  email: string;
}): Promise<{ success: boolean; message: string }> {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/send-verification-email`;

  try {
    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { ...errorData };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return {
      success: false,
      message,
    };
  }
}


//api/auth/sendverification-email
//https://escrow-backend-three.vercel.app/api/auth/send-verification-email