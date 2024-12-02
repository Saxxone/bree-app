export enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const access_token = "";

interface Props {
  url: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
  method: FetchMethod;
  body?: any;
  content_type?: string;
}

export async function ApiConnectService<T>({
  url,
  params,
  query,
  method,
  body,
  content_type,
}: Props): Promise<T> {
  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        "Content-Type": content_type ?? "application/json",
        Authorization: "Bearer " + access_token,

        ...(content_type === "multipart/form-data" && {
          enctype: "multipart/form-data",
        }),
      },
      body: method !== FetchMethod.GET ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} - ${errorText}`,
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
