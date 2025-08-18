"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/lib/hooks/use-contact-form";
import { ContactFormData } from "@/lib/services/contact-service";

interface MobileContactFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
  isModal?: boolean;
}

export function MobileContactForm({
  onSuccess,
  onClose,
  className = "",
  isModal = false,
}: MobileContactFormProps) {
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
      <div className={`text-center p-6 ${className}`}>
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
            ¡Mensaje enviado!
          </h3>
          <p className="text-gray-600 mb-6 text-sm">Te responderemos pronto.</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            className="flex-1 rounded-full bg-[#2a597e] px-4 py-3 text-white hover:bg-[#2a597e]/90 text-sm"
          >
            Otro mensaje
          </Button>
          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-full border-[#2a597e] text-[#2a597e] hover:bg-[#2a597e]/10 text-sm"
            >
              Cerrar
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${isModal ? "p-4" : ""} ${className}`}>
      {isModal && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2a597e]">Contacto</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <Label
            htmlFor="nombre-mobile"
            className="text-sm text-[#2a597e] font-medium"
          >
            Nombre completo *
          </Label>
          <Input
            id="nombre-mobile"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="mt-2 h-12 rounded-full border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <Label
            htmlFor="email-mobile"
            className="text-sm text-[#2a597e] font-medium"
          >
            Email *
          </Label>
          <Input
            id="email-mobile"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-2 h-12 rounded-full border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <Label
            htmlFor="mensaje-mobile"
            className="text-sm text-[#2a597e] font-medium"
          >
            Mensaje *
          </Label>
          <Textarea
            id="mensaje-mobile"
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleInputChange}
            required
            className="mt-2 rounded-2xl border-[#2a597e] text-[#2a597e] focus-visible:ring-2 focus-visible:ring-[#2a597e]/20"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[#2a597e] px-6 py-4 text-white hover:bg-[#2a597e]/90 font-bold disabled:opacity-50 disabled:cursor-not-allowed w-full text-base"
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
    </div>
  );
}
