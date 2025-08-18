import { useState } from "react";
import { ContactFormData, ContactService } from "../services/contact-service";

export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ContactService.sendContact(data);

      if (response.success) {
        setIsSuccess(true);
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al enviar el mensaje";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    isLoading,
    isSuccess,
    error,
    submitForm,
    resetForm,
  };
};
