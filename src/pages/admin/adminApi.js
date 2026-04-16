import axios from "axios";
import { clearAdminAuth, getAdminToken } from "./adminAuth";
import { API_BASE_URL, resolveAssetUrl } from "../../utils/assetUrl";

export const ADMIN_API_BASE_URL = API_BASE_URL;

const adminApi = axios.create({
  baseURL: ADMIN_API_BASE_URL,
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
