import { FetchMethod } from "@/types/types";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";
import api_routes from "@/constants/ApiRoutes";

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

const KEYCHAIN_URL = { service: process.env.EXPO_PUBLIC_API_BASE_URL };
let is_refreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

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
const saveTokens = async (tokens: TokenPair): Promise<void> => {
  try {
  } catch (error) {
    console.error("Failed to save tokens to Keychain:", error);
  }
};

/**
 * Retrieves a token from the keychain.
 *
 * @returns {Promise<string | undefined>} The stored token, or undefined if retrieval fails or no token is found.
 */
export async function retrieveTokenFromKeychain(): Promise<string | undefined> {
  try {
    const credentials = await Keychain.getInternetCredentials(KEYCHAIN_URL);
    if (credentials) {
      return credentials.password;
    }
  } catch (error) {
    console.error("Failed to access Keychain", error);
  }
}

/**
 * Retrieves both access and refresh tokens from keychain
 */
const getTokens = async (): Promise<TokenPair | null> => {
  try {
    const [access_credentials, refresh_credentials] = await Promise.all([
      Keychain.getInternetCredentials(KEYCHAIN_URL),
      Keychain.getInternetCredentials(KEYCHAIN_URL + "_refresh"),
    ]);

    if (access_credentials && refresh_credentials) {
      return {
        access_token: access_credentials.password,
        refresh_token: refresh_credentials.password,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get tokens from Keychain:", error);
    return null;
  }
};

/**
 * Clears all tokens from keychain and updates auth state
 */
const logout = async () => {
  try {
    await Promise.all([
      Keychain.resetInternetCredentials(KEYCHAIN_URL),
      // Keychain.resetInternetCredentials(KEYCHAIN_REFRESH_TOKEN_SERVICE),
    ]);
    await SecureStore.deleteItemAsync("isAuthenticated");
  } catch (error) {
    console.error("Failed to logout and clear credentials:", error);
  }
};

/**
 * Refreshes the access token using the refresh token
 */
async function refreshToken(): Promise<string | null> {
  try {
    const tokens = await getTokens();
    if (!tokens?.refresh_token) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(api_routes.token_refresh, {
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
      const new_token = ""; //await refreshToken();
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
