"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "store/useAuth";

interface AuthRedirectProps {
  children: React.ReactNode;
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated, user, _hasHydrated } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!_hasHydrated) {
      return;
    }

    // Si el usuario está autenticado, redirigir a su página correspondiente
    if (isAuthenticated && user && !isRedirecting) {
      setIsRedirecting(true);
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, _hasHydrated, router, isRedirecting]);

  // Mostrar loading mientras se verifica la hidratación
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a597e] mx-auto"></div>
          <p className="mt-4 text-[#2a597e]">Inicializando...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading mientras se verifica la autenticación
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a597e] mx-auto"></div>
          <p className="mt-4 text-[#2a597e]">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado, mostrar loading mientras se redirige
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a597e] mx-auto"></div>
          <p className="mt-4 text-[#2a597e]">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Si el usuario no está autenticado, mostrar el contenido normal
  return <>{children}</>;
}
