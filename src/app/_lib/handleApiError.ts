type ApiErrorResponse =
  | { handled: false }
  | { handled: true; type: 'invalidCredentials'; message: string }
  | { handled: true; type: 'unverifiedEmail'; message: string; email?: string }
  | { handled: true; type: 'duplicateEmail'; message: string }
  | {
      handled: true;
      type: 'validationError';
      message: string;
      details?: string;
    };

export function handleApiError(res: {
  success: boolean;
  message: string;
  status?: number;
  email?: string;
  details?: string[];
}): ApiErrorResponse {
  const { success, message, status, email, details } = res;

  if (success) return { handled: false };

  if (status === 404 || res.status === 401)
    return { handled: true, type: 'invalidCredentials', message };

  if (status === 403)
    return { handled: true, type: 'unverifiedEmail', message, email };

  if (status === 409) return { handled: true, type: 'duplicateEmail', message };

  if (status === 400)
    return {
      handled: true,
      type: 'validationError',
      message,
      details: details?.[0],
    };

  return { handled: false };
}
