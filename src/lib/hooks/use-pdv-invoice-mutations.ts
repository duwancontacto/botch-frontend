import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PdvInvoiceService from "../services/pdv-invoice-service";

export const useCreatePdvInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PdvInvoiceService.createPdvInvoice,
    onSuccess: (data) => {
      console.log("data", data);
      if (data) {
        toast.success("Factura creada exitosamente");
        // Invalidar queries relacionadas si las hay
        queryClient.invalidateQueries({ queryKey: ["pdv-invoices"] });
      } else {
        toast.error("Error al crear la factura");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error durante la creación de la factura");
    },
  });
};
