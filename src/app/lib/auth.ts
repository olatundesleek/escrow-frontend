export async function login({
  rememberme,
  username,
  password,
}: {
  username: string;
  password: string;
  rememberme: boolean;
}): Promise<{ success: boolean; message: string }> {
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

    if ((!res.ok && res.status === 401) || res.status === 403) {
      const errorData = await res.json();
      return errorData;
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
