type ApiErrorResponse =
  | { handled: false }
  | { handled: true; type: 'invalidCredentials'; message: string }
  | { handled: true; type: 'unverifiedEmail'; message: string; email?: string };

export function handleApiError(res: {
  success: boolean;
  message: string;
  status?: number;
  email?: string;
}): ApiErrorResponse {
  const { success, message, status, email } = res;

  if (success) return { handled: false };

  if (status === 404 || res.status === 401)
    return { handled: true, type: 'invalidCredentials', message };

  if (status === 403)
    return { handled: true, type: 'unverifiedEmail', message, email };

  return { handled: false };
}
