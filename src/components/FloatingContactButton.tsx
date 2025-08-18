"use client";

import { useContactModal } from "@/lib/hooks/use-contact-modal";
import { ContactModal } from "./ContactModal";

interface FloatingContactButtonProps {
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function FloatingContactButton({
  className = "",
  position = "bottom-right",
}: FloatingContactButtonProps) {
  const { isOpen, openModal, closeModal } = useContactModal();

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={openModal}
        className={`
          fixed z-40 w-14 h-14 bg-[#2a597e] hover:bg-[#2a597e]/90 
          text-white rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-110
          flex items-center justify-center
          ${getPositionClasses()}
          ${className}
        `}
        aria-label="Abrir formulario de contacto"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Modal de contacto */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={() => {
          // Opcional: mostrar notificación de éxito
          console.log("Mensaje enviado exitosamente");
        }}
      />
    </>
  );
}
