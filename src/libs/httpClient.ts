import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { navigate } from "wouter/use-browser-location";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: unknown = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: unknown = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

const httpClient = new HttpClient(API_BASE_URL);

export default httpClient;
