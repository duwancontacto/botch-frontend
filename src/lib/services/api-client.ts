import axios from "axios";
import { useAuth } from "store/useAuth";

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar el token JWT a las cabeceras
api.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("auth-storage");
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          if (parsed.state?.token) {
            config.headers.Authorization = `Bearer ${parsed.state.token}`;
          }
        } catch (error) {
          console.error("Error parsing auth storage:", error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido, limpiar localStorage y redirigir al login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
      }
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("Tiempo de espera agotado. Intenta nuevamente.");
    }
    if (error.response?.status === 500) {
      throw new Error("Error interno del servidor. Intenta más tarde.");
    }
    if (error.response?.status === 404) {
      throw new Error("Recurso no encontrado.");
    }
    throw new Error("Error de conexión. Verifica tu conexión a internet.");
  }
);

export const apiClient = api;
export default api;
