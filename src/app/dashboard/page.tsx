"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardDistributor from "@/components/Dashboard/DashboardDistributor";
import { useAuth } from "store/useAuth";
import DashboardPuntoVenta from "@/components/Dashboard/DashboardPuntoVenta";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user?.userType === "distributor" ? (
        <DashboardDistributor />
      ) : (
        <DashboardPuntoVenta />
      )}
    </ProtectedRoute>
  );
}
