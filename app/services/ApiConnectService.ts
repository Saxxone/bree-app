import { FetchMethod } from "@/types/types";

const access_token = "";

interface Props {
  url: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
  method: FetchMethod;
  body?: any;
  content_type?: string;
  headers?: Record<string, string>;
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

    console.log(content_type);
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
