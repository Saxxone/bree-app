import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

enum FetchMethod {
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
  content_type: string;
}

async function fetchData<T>({
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
        "Content-Type": content_type,
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

export async function useApiConnect<T>({
  url,
  params,
  query,
  method,
  body,
  content_type,
  key,
}: Props & { key: string }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [key, params],
    queryFn: async () =>
      await fetchData<T>({ url, params, query, method, body, content_type }),
  });

  return { isPending, isError, data, error };
}
