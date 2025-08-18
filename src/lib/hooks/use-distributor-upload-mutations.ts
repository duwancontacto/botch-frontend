import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DistributorUploadService from "../services/distributor-upload-service";

export const useCreateDistributorUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DistributorUploadService.createDistributorUpload,
    onSuccess: (data) => {
      console.log("data", data);
      if (data) {
        toast.success("Archivo subido exitosamente");
        // Invalidar queries relacionadas si las hay
        queryClient.invalidateQueries({ queryKey: ["distributor-uploads"] });
      } else {
        toast.error("Error al subir el archivo");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error durante la subida del archivo");
    },
  });
};
