import axios from "axios";
import { navigate } from "wouter/use-browser-location";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    // response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 403)
        ) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );
  }

  async get(url, config = {}) {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post(url, data = {}, config = {}) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put(url, data = {}, config = {}) {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

const httpClient = new HttpClient(API_BASE_URL);

export default httpClient;
