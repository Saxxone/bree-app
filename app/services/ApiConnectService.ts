import { FetchMethod } from "@/types/types";
import * as Keychain from "react-native-keychain";

interface Props {
  /**
   * The base URL for the API endpoint.
   */
  url: string;
  /**
   * Path parameters to be appended to the URL.  These are added directly to the path, separated by slashes. For example, `{id: 123}` would add `/id=123` to the URL.
   */
  params?: Record<string, string | number>;
  /**
   * Query parameters to be appended to the URL. These are added after a `?` and are formatted as standard query string parameters.  For example, `{page: 1, limit: 10}` becomes `?page=1&limit=10`.
   */
  query?: Record<string, string | number>;
  /**
   * The HTTP method to use (GET, POST, PUT, DELETE, etc.).
   */
  method: FetchMethod;
  /**
   * The request body.  This will be JSON.stringified unless the 'content_type' is set to 'multipart/form-data'.
   */
  body?: any;
  /**
   * The Content-Type header for the request. Defaults to 'application/json'.  Set this to 'multipart/form-data' for file uploads.
   */
  content_type?: string;
  /**
   * Additional headers to include in the request.
   */
  headers?: Record<string, string>;
}

/**
 * Retrieves a token from the keychain.
 *
 * @returns {Promise<string | undefined>} The stored token, or undefined if retrieval fails or no token is found.
 */
export async function retrieveTokenFromKeychain() {
  const api_url = process.env.EXPO_PUBLIC_API_BASE_URL as string;
  try {
    const credentials = await Keychain.getInternetCredentials(api_url);
    if (credentials) {
      return credentials.password;
    }
  } catch (error) {
    console.error("Failed to access Keychain", error);
  }
}

/**
 * Makes a network request to an API endpoint.
 *
 * @template T The expected type of the response data.
 * @param {Props} options The options for the API request.
 * @returns {Promise<{ data: T | null; error: any }>} A promise that resolves to an object containing either the parsed response data or an error object.
 */
export async function ApiConnectService<T>({
  url,
  params,
  query,
  method,
  body,
  content_type,
  headers,
}: Props): Promise<{ data: T | null; error: any }> {
  try {
    const access_token = await retrieveTokenFromKeychain();

    let fullUrl = url;

    if (params) {
      const paramParts = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      fullUrl += `/${paramParts}`; // Assuming params are path parameters
    }

    if (query) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        queryParams.append(key, value.toString());
      }
      fullUrl += `?${queryParams.toString()}`;
    }

    const response = await fetch(`${fullUrl}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
        ...headers,
      },
      body: method !== FetchMethod.GET ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));

      console.error("API error", response.status, errorData);
      return { data: null, error: errorData };
    }
    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error };
  }
}
