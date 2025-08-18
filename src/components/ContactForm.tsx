"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/lib/hooks/use-contact-form";
import { ContactFormData } from "@/lib/services/contact-service";

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function ContactForm({ onSuccess, className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const { isLoading, isSuccess, error, submitForm, resetForm } =
    useContactForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica del lado del cliente
    if (
      !formData.nombre.trim() ||
      !formData.email.trim() ||
      !formData.mensaje.trim()
    ) {
      return;
    }

    const result = await submitForm(formData);

    if (result.success) {
      setFormData({ nombre: "", email: "", mensaje: "" });
      onSuccess?.();
    }
  };

  const handleReset = () => {
    setFormData({ nombre: "", email: "", mensaje: "" });
    resetForm();
  };

  if (isSuccess) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#2a597e] mb-2">
            ¡Mensaje enviado exitosamente!
          </h3>
          <p className="text-gray-600 mb-6">
            Gracias por contactarnos. Te responderemos pronto.
          </p>
        </div>
        <Button
          onClick={handleReset}
          className="rounded-full bg-[#2a597e] px-6 py-3 text-white hover:bg-[#2a597e]/90"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div>
        <Label
          htmlFor="nombre"
          className="text-sm md:text-[17px] text-[#2a597e]"
        >
          Nombre y apellido *
        </Label>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleInputChange}
          required
          className="mt-2 h-12 rounded-full border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
          placeholder="Ingresa tu nombre completo"
        />
      </div>

      <div>
        <Label
          htmlFor="email"
          className="text-sm md:text-[17px] text-[#2a597e]"
        >
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-2 h-12 rounded-full border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
          placeholder="tu.email@ejemplo.com"
        />
      </div>

      <div>
        <Label
          htmlFor="mensaje"
          className="text-sm md:text-[17px] text-[#2a597e]"
        >
          Mensaje *
        </Label>
        <Textarea
          id="mensaje"
          name="mensaje"
          rows={6}
          value={formData.mensaje}
          onChange={handleInputChange}
          required
          className="mt-2 rounded-2xl border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-[#2a597e] px-8 py-6 text-white hover:bg-[#2a597e]/90 font-bold disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </div>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </div>
    </form>
  );
}
