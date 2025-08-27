import { z } from "zod";

// Esquema base para campos comunes
const baseUserSchema = z
  .object({
    userType: z.enum(["distributor", "point_of_sale"]),
    fullName: z.string().min(1, "El nombre completo es obligatorio"),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .email("Formato de email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    passwordConfirm: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

// Esquema para distribuidor - solo campos específicos de distributor
export const distributorSchema = baseUserSchema.extend({
  userType: z.literal("distributor"),
  distributorId: z.string().min(1, "Selecciona un distribuidor"),
});

// Esquema para punto de venta - solo campos específicos de point_of_sale
export const pointOfSaleSchema = baseUserSchema
  .extend({
    userType: z.literal("point_of_sale"),
    fantasyName: z.string().min(1, "El nombre de fantasía es obligatorio"),
    socialReason: z.string().min(1, "La razón social es obligatoria"),
    cuit: z.string().min(1, "El CUIT es obligatorio"),
    habitualDistributorId: z.string().optional(),
    otherDistributorName: z.string().optional(),
    phone: z.string().min(1, "El teléfono es obligatorio"),
    address: z.string().min(1, "La dirección es obligatoria"),
    city: z.string().min(1, "La localidad es obligatoria"),
    province: z.string().min(1, "La provincia es obligatoria"),
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

// Tipos inferidos de los esquemas
export type DistributorFormData = z.infer<typeof distributorSchema>;
export type PointOfSaleFormData = z.infer<typeof pointOfSaleSchema>;

// Esquema para respuesta del servidor
export const authResponseSchema = z.object({
  user: z.object({
    userId: z.string(),
    userType: z.enum(["distributor", "point_of_sale"]),
    email: z.string(),
  }),
  error: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Esquema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Formato de email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Esquema para respuesta del login
export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    userType: z.enum(["distributor", "point_of_sale"]),
    isApproved: z.boolean(),
    distributorId: z.string().optional(),
    fantasyName: z.string().optional(),
    socialReason: z.string().optional(),
    cuit: z.string().optional(),
    habitualDistributorId: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
