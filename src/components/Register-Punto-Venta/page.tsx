"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormSelect from "@/components/ui/form-select";
import { useRegisterPointOfSale } from "@/lib/hooks/use-auth-mutations";
import { useDistributors } from "@/lib/hooks/use-distributors";
import {
  pointOfSaleSchema,
  PointOfSaleFormData,
} from "@/lib/schemas/auth-schemas";
import { Distributor } from "@/lib/types/api-types";
import { Loader2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

interface FormularioPuntoDeVentaProps {
  onRegistrationSuccess: () => void;
}

export default function FormularioPuntoDeVenta({
  onRegistrationSuccess,
}: FormularioPuntoDeVentaProps) {
  const { data: distributors, isLoading: isLoadingDistributors } =
    useDistributors();
  const registerMutation = useRegisterPointOfSale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PointOfSaleFormData>({
    resolver: zodResolver(pointOfSaleSchema),
    defaultValues: {
      userType: "point_of_sale",
      fullName: "",
      fantasyName: "",
      socialReason: "",
      cuit: "",
      habitualDistributorId: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const habitualDistributorId = watch("habitualDistributorId");

  const onSubmit = async (data: PointOfSaleFormData) => {
    try {
      console.log(data);
      await registerMutation.mutateAsync(data);
      // Llamar a la función de éxito cuando el registro sea exitoso
      onRegistrationSuccess();
    } catch (error) {
      // El error se maneja en el hook de mutación
      console.error("Error en el formulario:", error);
    }
  };

  const distributorOptions =
    distributors?.map((dist: Distributor) => ({
      value: dist.id,
      label: dist.name,
    })) || [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 text-[#2a597e]"
    >
      {/* Dos columnas: Nombre y apellido / Nombre fantasía */}
      <AnimatedSection delay={0.2}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Nombre y apellido"
            id="fullName"
            labelClassName="font-bold"
            required
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <FormField
            label="Nombre fantasía"
            id="fantasyName"
            labelClassName="font-bold"
            required
            error={errors.fantasyName?.message}
            {...register("fantasyName")}
          />
        </div>
      </AnimatedSection>

      {/* Razón social / CUIT */}
      <AnimatedSection delay={0.4}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Razón social"
            id="socialReason"
            labelClassName="font-bold"
            required
            error={errors.socialReason?.message}
            {...register("socialReason")}
          />
          <FormField
            label="CUIT"
            id="cuit"
            labelClassName="font-bold"
            //placeholder="XX-XXXXXXXX-X"
            required
            error={errors.cuit?.message}
            {...register("cuit")}
          />
        </div>
      </AnimatedSection>

      {/* Distribuidor habitual (Select) - Obligatorio */}
      <AnimatedSection delay={0.6}>
        <div>
          <FormSelect
            label="Distribuidor habitual"
            id="habitualDistributorId"
            labelClassName="font-bold"
            placeholder="Seleccionar..."
            required
            options={distributorOptions}
            value={habitualDistributorId}
            onValueChange={(value) => setValue("habitualDistributorId", value)}
            error={errors.habitualDistributorId?.message}
          />
          {isLoadingDistributors && (
            <div className="flex items-center gap-2 mt-2 text-sm text-[#2a597e]/70">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando distribuidores...
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Teléfono / Mail */}
      <AnimatedSection delay={0.8}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Teléfono"
            id="phone"
            labelClassName="font-bold"
            required
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormField
            label="Mail"
            id="email"
            type="email"
            labelClassName="font-bold"
            required
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </AnimatedSection>

      {/* Dirección / Localidad / Provincia */}
      <AnimatedSection delay={1.0}>
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            label="Dirección"
            id="address"
            labelClassName="font-bold"
            required
            error={errors.address?.message}
            {...register("address")}
          />
          <FormField
            label="Localidad"
            id="city"
            labelClassName="font-bold"
            required
            error={errors.city?.message}
            {...register("city")}
          />
          <FormField
            label="Provincia"
            id="province"
            labelClassName="font-bold"
            required
            error={errors.province?.message}
            {...register("province")}
          />
        </div>
      </AnimatedSection>

      {/* Passwords */}
      <AnimatedSection delay={1.2}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Contraseña"
            id="password"
            type="password"
            labelClassName="font-bold"
            required
            error={errors.password?.message}
            {...register("password")}
          />
          <FormField
            label="Repetir contraseña"
            id="passwordConfirm"
            type="password"
            labelClassName="font-bold"
            required
            error={errors.passwordConfirm?.message}
            {...register("passwordConfirm")}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={1.4}>
        <span className="text-[18px] tracking-[-0.5px]">
          Todos los campos son obligatorios *
        </span>
      </AnimatedSection>

      <AnimatedSection delay={1.6}>
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || registerMutation.isPending}
            className="rounded-full bg-[#2a597e] font-semibold  text-[18px] h-[70px] w-[154px] text-white hover:bg-[#2a597e]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </AnimatedSection>
    </form>
  );
}
