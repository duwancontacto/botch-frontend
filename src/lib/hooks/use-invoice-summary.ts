import { useQuery } from "@tanstack/react-query";
import AuthService from "../services/auth-service";
import { InvoiceSummary } from "../types/api-types";

export const useInvoiceSummary = () => {
  return useQuery<InvoiceSummary>({
    queryKey: ["invoice-summary"],
    queryFn: AuthService.getMySummary,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
