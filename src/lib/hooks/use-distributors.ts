import { useQuery } from "@tanstack/react-query";
import AuthService from "../services/auth-service";
import { Distributor } from "../types/api-types";

export const useDistributors = () => {
  return useQuery<Distributor[]>({
    queryKey: ["distributors"],
    queryFn: AuthService.getDistributors,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
