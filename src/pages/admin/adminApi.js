import axios from "axios";
import { clearAdminAuth, getAdminToken } from "./adminAuth";

const adminApi = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1",
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAdminAuth();
      if (window.location.pathname !== "/admin-login") {
        window.location.href = "/admin-login";
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;
