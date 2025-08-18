"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "store/useAuth";

export const useAuthCheck = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, user, isLoading };
};
