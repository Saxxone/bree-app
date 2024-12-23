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
   * The request body.  This will be JSON.stringified unless the it is 'multipart/form-data'.
   */
  body?: any;

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
export async function retrieveTokenFromKeychain(): Promise<string | undefined> {
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
  headers,
}: Props): Promise<{ data: T | null; error: any }> {
  try {
    const access_token = await retrieveTokenFromKeychain();

    const parse_body = body instanceof FormData ? body : JSON.stringify(body);

    let full_url = url;

    if (params) {
      const param_parts = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      full_url += `/${param_parts}`;
    }

    if (query) {
      const query_params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        query_params.append(key, value.toString());
      }
      full_url += `?${query_params.toString()}`;
    }

    const response = await fetch(`${full_url}`, {
      method,
      headers: {
        Authorization: "Bearer " + access_token,
        ...headers,
      },
      body: method !== FetchMethod.GET ? body : undefined,
    });

    if (!response.ok) {
      const error_data = await response
        .json()
        .catch(() => ({ message: response.statusText }));

      console.error("API error", response.status, error_data);
      throw new Error(error_data.message);
    }
    const data: T = await response.json();
    return { data, error: null };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
