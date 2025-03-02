// src/api/index.ts

import {API_BASE_URL, handleError, handleResponse} from './apiClient';

/**
 * GET request helper.
 * @param route - The API route (e.g., '/users').
 * @param params - Query parameters as key-value pairs.
 * @returns A promise resolving to the API response data.
 */
export const getRequest = async <T,>(
  route: string,
  params: Record<string, any> = {},
): Promise<any> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${route}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers like Authorization if needed
      },
    });

    const data: T = await handleResponse(response);
    return data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * POST request helper.
 * @param route - The API route (e.g., '/users').
 * @param body - The request payload.
 * @returns A promise resolving to the API response data.
 */
export const postRequest = async <T,>(
  route: string,
  body: any = {},
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${route}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers like Authorization if needed
      },
      body: JSON.stringify(body),
    });

    const data: T = await handleResponse(response);
    return data;
  } catch (error) {
    // handleError(error);
  }
};
