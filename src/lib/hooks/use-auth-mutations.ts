import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "store/useAuth";
import AuthService from "../services/auth-service";
import {
  DistributorFormData,
  PointOfSaleFormData,
  LoginFormData,
} from "../schemas/auth-schemas";

export const useRegisterDistributor = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.registerDistributor,
    onSuccess: (data) => {
      console.log(data, "asdas asd asd");
      if (data.user) {
        toast.success("Registro exitoso");
        // Invalidar queries relacionadas
        queryClient.invalidateQueries({ queryKey: ["distributors"] });
        // Ya no redirigimos automáticamente, el componente padre maneja el éxito
      } else {
        toast.error(data.error || "Error en el registro");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error durante el registro");
    },
  });
};

export const useRegisterPointOfSale = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.registerPointOfSale,
    onSuccess: (data) => {
      if (data.user) {
        toast.success("Registro exitoso");
        // Invalidar queries relacionadas
        queryClient.invalidateQueries({ queryKey: ["distributors"] });
        // Ya no redirigimos automáticamente, el componente padre maneja el éxito
      } else {
        toast.error(data.error || "Error en el registro");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error durante el registro");
    },
  });
};

export const useLoginMutation = () => {
  const router = useRouter();
  const { login, setError, clearError } = useAuth();

  return useMutation({
    mutationFn: (data: LoginFormData) => AuthService.login(data),
    onSuccess: (response) => {
      // Guardar datos de sesión en el store
      login(response.user, response.accessToken);

      router.push("/dashboard");

      clearError();
    },
    onError: (error: Error) => {
      console.log(error, "asdas asd asd");
      setError(error.message);
    },
  });
};
