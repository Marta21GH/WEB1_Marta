import axios from "axios";

const API_URL = "https://bildy-rpmaya.koyeb.app";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token solo si existe
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token && !config.url?.includes("/api/user/login") && !config.url?.includes("/api/user/register")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;