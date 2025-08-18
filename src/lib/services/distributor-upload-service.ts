import {
  DistributorUploadFormData,
  DistributorUploadResponse,
} from "../schemas/distributor-upload-schemas";
import api from "./api-client";

export class DistributorUploadService {
  /**
   * Crea un nuevo upload del distribuidor
   */
  static async createDistributorUpload(
    data: DistributorUploadFormData
  ): Promise<DistributorUploadResponse> {
    try {
      // Crear FormData para enviar archivo
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("distributorId", data.distributorId);
      formData.append("fileName", data.file.name || "Invoice");

      console.log("Datos enviados al backend:", {
        distributorId: data.distributorId,
        fileName: data.file.name || "Invoice",
        fileSize: data.file.size,
      });

      const response = await api.post<DistributorUploadResponse>(
        "/invoices/distributor/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error");
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido al crear el upload");
    }
  }
}

export default DistributorUploadService;
