"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "store/useAuth";

export default function AuthRedirect() {
  const { isAuthenticated, user, _hasHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!_hasHydrated) {
      return;
    }

    // Si el usuario está autenticado, redirigir a su página correspondiente
    if (isAuthenticated && user) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, _hasHydrated, router]);

  // No renderizar nada, solo manejar la redirección
  return null;
}
