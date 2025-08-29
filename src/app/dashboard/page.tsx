"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardDistributor from "@/components/Dashboard/DashboardDistributor";
import { useAuth } from "store/useAuth";
import DashboardPuntoVenta from "@/components/Dashboard/DashboardPuntoVenta";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen bg-white w-[100vw] border-2 border-red-500">
        {user?.userType === "distributor" ? (
          <DashboardDistributor />
        ) : (
          <DashboardPuntoVenta />
        )}
      </main>
    </ProtectedRoute>
  );
}
