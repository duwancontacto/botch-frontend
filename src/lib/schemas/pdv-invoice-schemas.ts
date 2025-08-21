import { z } from "zod";

// Esquema para crear factura PDV
export const pdvInvoiceSchema = z
  .object({
    habitualDistributorId: z.string().optional(),
    otherDistributorName: z.string().optional(),
    invoiceNumber: z.string().min(1, "El número de factura es obligatorio"),
    invoiceDate: z
      .string()
      .min(1, "La fecha de factura es obligatoria")
      .refine(
        (date) => {
          if (!date) return false;

          const selectedDate = new Date(date);
          const startDate = new Date("2025-09-01");
          const endDate = new Date("2025-11-30");

          return selectedDate >= startDate && selectedDate <= endDate;
        },
        {
          message:
            "Participan las compras realizadas entre septiembre y noviembre 2025",
        }
      ),
    units: z
      .string()
      .min(1, "La cantidad de bujías es obligatoria")
      .refine(
        (val) => {
          const num = parseInt(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: "Debes ingresar una cantidad válida de bujías",
        }
      ),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar las bases y condiciones",
    }),
  })
  .refine(
    (data) => {
      // Debe tener distribuidor habitual O nombre de otro distribuidor
      if (data.habitualDistributorId === "otro") {
        return (
          !!data.otherDistributorName &&
          data.otherDistributorName.trim().length > 0
        );
      }
      return data.habitualDistributorId || data.otherDistributorName;
    },
    {
      message: "Debes seleccionar un distribuidor o especificar otro",
      path: ["habitualDistributorId"],
    }
  )
  .refine(
    (data) => {
      // Si se selecciona "otro", el nombre es obligatorio
      if (data.habitualDistributorId === "otro") {
        return (
          !!data.otherDistributorName &&
          data.otherDistributorName.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "Debes especificar el nombre del distribuidor",
      path: ["otherDistributorName"],
    }
  );

export type PdvInvoiceFormData = z.infer<typeof pdvInvoiceSchema>;

// Tipo para los datos que se envían al backend (con unidades como número)
export interface PdvInvoiceBackendData {
  invoiceNumber: string;
  invoiceDate: string;
  units: number;
  habitualDistributorId?: string;
  otherDistributorName?: string;
}

// Función para mapear las unidades a números
export const mapUnitsToNumber = (units: string): number => {
  const parsed = parseInt(units);
  return isNaN(parsed) ? 0 : parsed;
};

// Esquema para respuesta del servidor
export const pdvInvoiceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      id: z.string(),
      invoiceNumber: z.string(),
      invoiceDate: z.string(),
      units: z.number(),
      userId: z.string(),
      createdAt: z.string(),
    })
    .optional(),
  error: z.string().optional(),
});

export type PdvInvoiceResponse = z.infer<typeof pdvInvoiceResponseSchema>;
