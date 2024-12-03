import { FetchMethod } from "@/types/types";
import * as Keychain from "react-native-keychain";

interface Props {
  url: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
  method: FetchMethod;
  body?: any;
  content_type?: string;
  headers?: Record<string, string>;
}

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

    const response = await fetch(`${url}`, {
      method,
      headers: {
        "Content-Type": content_type ?? "application/json",
        Authorization: "Bearer " + access_token,
        ...headers,

        ...(content_type === "multipart/form-data" && {
          enctype: "multipart/form-data",
        }),
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
