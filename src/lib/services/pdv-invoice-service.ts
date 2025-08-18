import {
  PdvInvoiceFormData,
  PdvInvoiceResponse,
  PdvInvoiceBackendData,
} from "../schemas/pdv-invoice-schemas";
import api from "./api-client";

export class PdvInvoiceService {
  /**
   * Crea una nueva factura PDV
   */
  static async createPdvInvoice(
    data: PdvInvoiceFormData
  ): Promise<PdvInvoiceResponse> {
    try {
      // Preparar los datos para el backend
      const requestData: PdvInvoiceBackendData = {
        invoiceNumber: data.invoiceNumber,
        invoiceDate: data.invoiceDate,
        units: Number(data.units),
      };

      // Si seleccionó "otro", usar otherDistributorName
      if (data.habitualDistributorId === "otro") {
        requestData.otherDistributorName = data.otherDistributorName;
      } else if (data.habitualDistributorId) {
        // Si seleccionó un distribuidor específico
        requestData.habitualDistributorId = data.habitualDistributorId;
      }

      console.log("Datos enviados al backend:", requestData);

      const response = await api.post<PdvInvoiceResponse>(
        "/invoices/pdv",
        requestData
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido al crear la factura");
    }
  }
}

export default PdvInvoiceService;
