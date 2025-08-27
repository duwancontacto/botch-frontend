import {
  DistributorFormData,
  PointOfSaleFormData,
  AuthResponse,
  authResponseSchema,
  LoginFormData,
  LoginResponse,
  loginResponseSchema,
} from "../schemas/auth-schemas";
import { Distributor, ApiResponse, InvoiceSummary } from "../types/api-types";
import api from "./api-client";

export class AuthService {
  /**
   * Registra un nuevo distribuidor
   */
  static async registerDistributor(
    data: DistributorFormData
  ): Promise<AuthResponse> {
    try {
      console.log(data, "asdas asd asd");
      const response = await api.post<AuthResponse>("/auth/register", {
        userType: data.userType,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        distributorId: data.distributorId,
      });

      console.log(response.data, "asdas asd asd");
      // Validar respuesta con Zod
      return response.data;
    } catch (error) {
      console.log(error, "asdas asd asd");
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido durante el registro");
    }
  }

  /**
   * Registra un nuevo punto de venta
   */
  static async registerPointOfSale(
    data: PointOfSaleFormData
  ): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", {
        userType: data.userType,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        fantasyName: data.fantasyName,
        socialReason: data.socialReason,
        cuit: data.cuit,
        habitualDistributorId: data.habitualDistributorId,
        phone: data.phone,
        address: data.address,
        city: data.city,
        province: data.province,
        otherDistributorName: data.otherDistributorName,
      });

      // Validar respuesta con Zod
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido durante el registro");
    }
  }

  /**
   * Inicia sesión de un usuario
   */
  static async login(data: LoginFormData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email: data.email,
        password: data.password,
      });

      return response.data;
    } catch (error) {
      console.log(error, "asdas asd asd");
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido durante el login");
    }
  }

  /**
   * Obtiene la lista de distribuidores disponibles
   */
  static async getDistributors(): Promise<Distributor[]> {
    try {
      const response = await api.get<Distributor[]>("/distributors");
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener distribuidores");
    }
  }

  /**
   * Obtiene el resumen de facturas del usuario actual
   */
  static async getMySummary(): Promise<InvoiceSummary> {
    try {
      const response = await api.get<InvoiceSummary>("/invoices/me/summary");
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el resumen de facturas");
    }
  }
}

export default AuthService;
