"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginMutation } from "@/lib/hooks/use-auth-mutations";
import { useAuth } from "store/useAuth";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function LoginForm() {
  const { error, clearError } = useAuth();
  const loginMutation = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepSession: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (error) {
      clearError();
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      keepSession: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      // El error se maneja en el hook
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-lg md:max-w-xl mx-auto"
    >
      <AnimatedSection delay={0.2}>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-[#2a597e]">
          {"Iniciá sesión"}
        </h2>
      </AnimatedSection>

      {error && (
        <AnimatedSection delay={0.3}>
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        </AnimatedSection>
      )}

      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <AnimatedSection delay={0.4}>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[#2A597E] text-base md:text-[20px]"
            >
              {"Email"}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="h-10 md:h-14 px-6 rounded-full border-1 border-[#2A597E] bg-white text-[#2a597e] focus-visible:ring-0 text-sm sm:text-base"
              ///placeholder="tu@email.com"
              required
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-[#2A597E] text-base md:text-[20px]"
            >
              {"Contraseña"}
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="h-10 md:h-14 px-6 rounded-full border-1 border-[#2a597e] bg-white text-[#2a597e] focus-visible:ring-0 text-sm sm:text-base"
              ///placeholder="••••••••"
              required
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.8}>
          <div className="flex items-center gap-3 text-[#2a597e] mb-3">
            <Checkbox
              id="keepSession"
              name="keepSession"
              checked={formData.keepSession}
              onCheckedChange={handleCheckboxChange}
              className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full w-[24px] h-[24px]"
            />
            <Label
              htmlFor="keepSession"
              className="cursor-pointer text-sm md:text-[15px]"
            >
              {"Mantener sesión iniciada."}
            </Label>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1.0}>
          <p className="mt-0 text-[#2a597e] text-sm md:text-[15px] text-left">
            {"¿Todavía no tenés cuenta? "}
            <Link href="/register" className="font-extrabold text-[#2a597e]">
              {"Registrate ahora."}
            </Link>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={1.2}>
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="rounded-full w-[120px] cursor-pointer bg-[#2a597e] px-10 py-4 sm:py-5 md:py-6 font-bold text-white hover:bg-[#2a597e]/90 text-sm  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"Entrar"}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </form>
  );
}
