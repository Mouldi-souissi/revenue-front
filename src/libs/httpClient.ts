// httpClient.ts
import { navigate } from "wouter/use-browser-location";
import storage from "./storage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = { "Content-Type": "application/json" };
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    let fullUrl = `${this.baseURL}${url}`;

    // Handle query params
    if (options.params) {
      const queryString = new URLSearchParams(
        options.params as Record<string, string>,
      ).toString();
      fullUrl += `?${queryString}`;
    }

    // Merge headers as plain object
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...((options.headers as Record<string, string>) || {}),
    };

    // Optional: Attach auth token from storage
    const token = storage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Build request init
    const config: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    };

    try {
      // --- Request interception ---
      console.log("Request:", method, fullUrl, config);

      const response = await fetch(fullUrl, config);

      // --- Response interception ---
      if (response.status === 401 || response.status === 403) {
        storage.clear();
        navigate("/login", { replace: true });
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error ${response.status}`);
      }

      // Auto-detect response type
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        return (await response.text()) as unknown as T;
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", url, undefined, options);
  }

  post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", url, data, options);
  }

  put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", url, data, options);
  }

  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", url, undefined, options);
  }
}

const httpClient = new HttpClient(API_BASE_URL);

export default httpClient;
