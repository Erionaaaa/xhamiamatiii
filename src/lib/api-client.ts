/**
 * Reusable API client for calling backend endpoints
 * 
 * Usage:
 *   const result = await apiCall<Video[]>("/api/videos");
 *   if (result.ok) { console.log(result.data); }
 */

export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
  status?: number;
};

export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
};

/**
 * Make an API call to your backend
 * @param endpoint - API endpoint path (e.g., "/api/videos")
 * @param options - Fetch options (method, body, headers, timeout)
 * @returns Promise with { ok, data, error, status }
 */
export async function apiCall<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    timeout = 10000,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const isFormData = body instanceof FormData;
    const fetchHeaders: Record<string, string> = { ...headers };

    // Only set Content-Type if not FormData (FormData sets its own boundary)
    if (!isFormData && body) {
      fetchHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(endpoint, {
      method,
      headers: fetchHeaders,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        data: json.data as T | undefined,
        error: json.error || `HTTP ${response.status}`,
        status: response.status,
      };
    }

    return {
      ok: true,
      data: (json.data || json) as T,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof TypeError && error.name === "AbortError") {
      return {
        ok: false,
        error: `Request timeout after ${timeout}ms`,
      };
    }

    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Connection error. Please try again.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Helper to make GET requests
 */
export function apiGet<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { ...options, method: "GET" });
}

/**
 * Helper to make POST requests
 */
export function apiPost<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { ...options, method: "POST", body });
}

/**
 * Helper to make PUT requests
 */
export function apiPut<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { ...options, method: "PUT", body });
}

/**
 * Helper to make DELETE requests
 */
export function apiDelete<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { ...options, method: "DELETE" });
}
