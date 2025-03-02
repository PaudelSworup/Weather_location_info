// import {BASE_URL} from '@env';

export const API_BASE_URL: string =
  process.env.REACT_APP_BASE_URL || 'https://your-backend-api.com/api';
// src/api/apiClient.ts

/**
 * Handles API responses.
 * @param response - The fetch response.
 * @returns Parsed JSON data.
 * @throws Throws an error if the response is not OK.
 */
export const handleResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('Content-Type');
  let data: any = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = data?.message || response.statusText;
    throw new Error(error);
  }

  return data as T;
};

/**
 * Handles API errors.
 * @param error - The error object.
 * @throws The error to be caught by the caller.
 */
export const handleError = (error: any) => {
  // You can add more sophisticated error handling here
  throw error;
};
