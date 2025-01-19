import { FetchMethod } from "@/types/types";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  isAuthenticated: boolean;
}

interface Props {
  url: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
  method: FetchMethod;
  body?: any;
  content_type?: string;
  headers?: Record<string, string>;
}

interface TokenPair {
  access_token: string;
  refresh_token: string;
}

// Constants
const KEYCHAIN_SERVICE = process.env.EXPO_PUBLIC_API_BASE_URL as string;
const TOKEN_REFRESH_ENDPOINT = "/auth/refresh"; // Adjust this to match your API endpoint
let is_refreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

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
 * Subscribes callbacks to be executed once token refresh is complete
 */
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

/**
 * Executes all pending callbacks with the new token
 */
function onTokenRefreshComplete(new_token: string) {
  refreshSubscribers.forEach((cb) => cb(new_token));
  refreshSubscribers = [];
}

/**
 * Saves tokens to keychain
 */
async function saveTokens(tokens: TokenPair): Promise<void> {
  try {
    await Keychain.setInternetCredentials(
      KEYCHAIN_SERVICE,
      "access_token",
      tokens.access_token,
    );
    await Keychain.setInternetCredentials(
      KEYCHAIN_SERVICE + "_refresh",
      "refresh_token",
      tokens.refresh_token,
    );
  } catch (error) {
    console.error("Failed to save tokens to Keychain", error);
    throw error;
  }
}

/**
 * Retrieves both access and refresh tokens from keychain
 */
async function getTokens(): Promise<TokenPair | null> {
  try {
    const [accessCreds, refreshCreds] = await Promise.all([
      Keychain.getInternetCredentials(KEYCHAIN_SERVICE),
      Keychain.getInternetCredentials(KEYCHAIN_SERVICE + "_refresh"),
    ]);

    if (accessCreds && refreshCreds) {
      return {
        access_token: accessCreds.password,
        refresh_token: refreshCreds.password,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to retrieve tokens from Keychain", error);
    return null;
  }
}

/**
 * Clears all tokens from keychain and updates auth state
 */
async function logout() {
  try {
    await Promise.all([
      Keychain.resetInternetCredentials(KEYCHAIN_SERVICE),
      Keychain.resetInternetCredentials(KEYCHAIN_SERVICE + "_refresh"),
    ]);
    await SecureStore.setItemAsync("isAuthenticated", "false");
  } catch (error) {
    console.error("Failed to clear tokens from Keychain", error);
  }
}

/**
 * Refreshes the access token using the refresh token
 */
async function refreshToken(): Promise<string | null> {
  try {
    const tokens = await getTokens();
    if (!tokens?.refresh_token) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(KEYCHAIN_SERVICE + TOKEN_REFRESH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: tokens.refresh_token }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const new_tokens: TokenPair = await response.json();
    await saveTokens(new_tokens);
    return new_tokens.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    await logout();
    return null;
  }
}

/**
 * Makes a network request to an API endpoint with token refresh handling
 */
export async function ApiConnectService<T>({
  url,
  params,
  query,
  method,
  body,
  headers,
  content_type = "application/json",
}: Props): Promise<{ data: T | null; error: any }> {
  try {
    const tokens = await getTokens();
    if (!tokens) {
      await logout();
      return {
        data: null,
        error: { message: "No authentication tokens found" },
      };
    }

    let fullUrl = url;

    // Build URL with params and query
    if (params) {
      const paramParts = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      fullUrl += `/${paramParts}`;
    }

    if (query) {
      const queryParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) =>
        queryParams.append(key, value.toString()),
      );
      fullUrl += `?${queryParams.toString()}`;
    }

    const parsed_body =
      content_type === "application/json" ? JSON.stringify(body) : body;
    // Function to make the actual API call
    const makeRequest = async (token: string) => {
      const response = await fetch(`${fullUrl}`, {
        method,
        headers: {
          "Content-Type": content_type,
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        body: method !== FetchMethod.GET ? parsed_body : undefined,
      });

      if (!response.ok) {
        const error_data = await response
          .json()
          .catch(() => ({ message: response.statusText }));

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        return { data: null, error: error_data };
      }

      const data: T = await response.json();
      return { data, error: null };
    };

    // First attempt with current access token
    try {
      return await makeRequest(tokens.access_token);
    } catch (error: any) {
      return await handleRequestError<T>(error, (new_token) =>
        makeRequest(new_token),
      );
    }
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      await logout();
    }
    return { data: null, error };
  }
}

async function handleRequestError<T>(
  error: any,
  cb: (token: string) => Promise<
    | {
        data: null;
        error: any;
      }
    | {
        data: T;
        error: null;
      }
  >,
) {
  if (error.message === "Unauthorized") {
    if (!is_refreshing) {
      is_refreshing = true;
      const new_token = await refreshToken();
      is_refreshing = false;

      if (new_token) {
        onTokenRefreshComplete(new_token);
        return await cb(new_token);
      }
    } else {
      const new_token = await new Promise<string>((resolve) => {
        subscribeTokenRefresh(resolve);
      });
      return await cb(new_token);
    }
  }
  throw error;
}

export { saveTokens, getTokens, logout };
