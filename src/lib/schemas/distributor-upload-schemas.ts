"use client";

import { z } from "zod";

// Esquema para crear upload del distribuidor
export const distributorUploadSchema = z.object({
  distributorId: z.string().min(1, "Debes seleccionar un distribuidor"),
  file: z
    .any()
    .refine((file) => {
      // Verificar si estamos en el navegador y si el archivo es válido
      if (typeof window === "undefined") return true; // Skip validation on server
      return file instanceof File;
    }, "Debes seleccionar un archivo")
    .refine((file) => {
      if (typeof window === "undefined") return true; // Skip validation on server
      return file && file.size > 0;
    }, "El archivo no puede estar vacío")
    .refine((file) => {
      if (typeof window === "undefined") return true; // Skip validation on server
      return file && file.size <= 10 * 1024 * 1024; // 10MB
    }, "El archivo no puede ser mayor a 10MB")
    .refine((file) => {
      if (typeof window === "undefined") return true; // Skip validation on server
      if (!file || !file.name) return false;
      const validExtensions = [".xlsx", ".xls", ".csv"];
      const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf("."));
      return validExtensions.includes(fileExtension);
    }, "Solo se permiten archivos Excel (.xlsx, .xls) o CSV"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar las bases y condiciones",
  }),
});

export type DistributorUploadFormData = z.infer<typeof distributorUploadSchema>;

// Tipo para los datos que se envían al backend
export interface DistributorUploadBackendData {
  distributorId: string;
}

// Esquema para respuesta del servidor
export const distributorUploadResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      id: z.string(),
      distributorId: z.string(),
      sourceFileKey: z.string(),
      userId: z.string(),
      createdAt: z.string(),
    })
    .optional(),
  error: z.string().optional(),
});

export type DistributorUploadResponse = z.infer<
  typeof distributorUploadResponseSchema
>;
