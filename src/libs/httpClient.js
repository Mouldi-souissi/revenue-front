import axios from "axios";
import { API_URL } from "../constants";
import { navigate } from "wouter/use-browser-location";

const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
    }

    return Promise.reject(error);
  },
);

export default httpClient;
