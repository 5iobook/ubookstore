export interface ApiError {
  status: number;
  message: string;
  type: 'network' | '404' | '500' | 'service-down' | 'unknown';
}

/**
 * Check if error is an axios error
 */
const isAxiosError = (error: unknown): error is { response?: { status: number; data?: { message?: string } }; message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    ('response' in error || 'request' in error)
  );
};

/**
 * Parse and categorize API errors
 * @param error - The error object from axios or other sources
 * @returns Structured ApiError object
 */
export const parseApiError = (error: unknown): ApiError => {
  // Network error (no response from server)
  if (isAxiosError(error) && !error.response) {
    return {
      status: 0,
      message: '네트워크 연결을 확인해주세요.',
      type: 'network',
    };
  }

  // HTTP error with response
  if (isAxiosError(error) && error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.message;

    if (status === 404) {
      return {
        status,
        message: message || '요청한 리소스를 찾을 수 없습니다.',
        type: '404',
      };
    }

    if (status >= 500) {
      return {
        status,
        message: message || '서버 오류가 발생했습니다.',
        type: '500',
      };
    }

    if (status === 503) {
      return {
        status,
        message: message || '서비스를 일시적으로 사용할 수 없습니다.',
        type: 'service-down',
      };
    }

    return {
      status,
      message,
      type: 'unknown',
    };
  }

  // Unknown error
  return {
    status: 0,
    message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    type: 'unknown',
  };
};

/**
 * Log error to external service (e.g., Sentry, LogRocket)
 * @param error - The error to log
 * @param context - Additional context information
 */
export const logError = (error: Error, context?: Record<string, unknown>): void => {
  if (import.meta.env.MODE === 'production') {
    // In production, send to error tracking service
    console.error('Error logged:', error, context);
    // Example: Sentry.captureException(error, { extra: context });
  } else {
    // In development, just log to console
    console.error('Error:', error);
    if (context) {
      console.error('Context:', context);
    }
  }
};

/**
 * Check if error is a network error
 * @param error - The error to check
 * @returns true if it's a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  return isAxiosError(error) && !error.response;
};

/**
 * Check if error is a server error (5xx)
 * @param error - The error to check
 * @returns true if it's a server error
 */
export const isServerError = (error: unknown): boolean => {
  return isAxiosError(error) && 
         error.response !== undefined && 
         error.response.status >= 500;
};

/**
 * Get user-friendly error message
 * @param error - The error object
 * @returns User-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  const apiError = parseApiError(error);
  return apiError.message;
};
