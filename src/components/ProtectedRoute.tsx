"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "store/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "distributor" | "point_of_sale";
}

export default function ProtectedRoute({
  children,
  requiredUserType,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, _hasHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!_hasHydrated) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.push("/");
      return;
    }

    // Si la ruta es contact-form, no redirigir
    if (pathname === "/contact-form") {
      return;
    }

    router.push("/dashboard");
    return;
  }, [isAuthenticated, user, requiredUserType, router, _hasHydrated, pathname]);

  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a597e] mx-auto"></div>
          <p className="mt-4 text-[#2a597e]">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si se especifica un tipo de usuario y no coincide, mostrar loading
  if (requiredUserType && user.userType !== requiredUserType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a597e] mx-auto"></div>
          <p className="mt-4 text-[#2a597e]">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
