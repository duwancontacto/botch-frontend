"use client";

import { useAuth } from "store/useAuth";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface UserHeaderProps {
  className?: string;
}

export default function UserHeader({ className = "" }: UserHeaderProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 text-white">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium">{user.fullName}</p>
          <p className="text-xs opacity-80">
            {user.userType === "distributor"
              ? "Distribuidor"
              : "Punto de Venta"}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="rounded-full border-white text-white hover:bg-white hover:text-[#2a597e]"
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </Button>
    </div>
  );
}
