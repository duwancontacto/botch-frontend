import { apiClient } from "./api-client";

export interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export class ContactService {
  static async sendContact(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await apiClient.post("/contact", data);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        if (apiError.response?.data?.message) {
          throw new Error(apiError.response.data.message);
        }
      }
      throw new Error(
        "Error al enviar el mensaje. Por favor, intenta nuevamente."
      );
    }
  }
}
