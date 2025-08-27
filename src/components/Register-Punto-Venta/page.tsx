"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormField from "@/components/ui/form-field";
import { useRegisterPointOfSale } from "@/lib/hooks/use-auth-mutations";
import { useDistributors } from "@/lib/hooks/use-distributors";
import {
  pointOfSaleSchema,
  PointOfSaleFormData,
} from "@/lib/schemas/auth-schemas";
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
      otherDistributorName: "",
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
  const showOtroInput = habitualDistributorId === "otro";

  const handleDistribuidorChange = (value: string) => {
    setValue("habitualDistributorId", value);
    if (value !== "otro") {
      setValue("otherDistributorName", "");
    }
  };

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 text-[#2a597e]"
    >
      {/* Dos columnas: Nombre y apellido / Nombre fantasía */}
      <AnimatedSection delay={0.2}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Nombre fantasía"
            id="fantasyName"
            labelClassName="font-bold"
            required
            error={errors.fantasyName?.message}
            {...register("fantasyName")}
          />
          <FormField
            label="Razón social"
            id="socialReason"
            labelClassName="font-bold"
            required
            error={errors.socialReason?.message}
            {...register("socialReason")}
          />
        </div>
      </AnimatedSection>

      {/* Razón social / CUIT */}
      <AnimatedSection delay={0.4}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="CUIT"
            id="cuit"
            labelClassName="font-bold"
            //placeholder="XX-XXXXXXXX-X"
            required
            error={errors.cuit?.message}
            {...register("cuit")}
          />
          <FormField
            label="Nombre y apellido"
            id="fullName"
            labelClassName="font-bold"
            required
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
      </AnimatedSection>

      {/* Distribuidor habitual (Select) - Obligatorio */}
      <AnimatedSection delay={0.6}>
        <div
          className={`grid gap-6 ${
            showOtroInput ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          <div>
            <Label className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold">
              Distribuidor habitual *
            </Label>
            <Select
              onValueChange={handleDistribuidorChange}
              value={habitualDistributorId}
            >
              <SelectTrigger className="mt-2 h-14 px-6 rounded-full border-[#2a597e] text-[#6D6D6D] text-[16px]">
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent className="text-[#6D6D6D] bg-white">
                {distributors?.map((distributor) => (
                  <SelectItem key={distributor.id} value={distributor.id}>
                    {distributor.name}
                  </SelectItem>
                ))}
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            {isLoadingDistributors && (
              <div className="flex items-center gap-2 mt-2 text-sm text-[#2a597e]/70">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cargando distribuidores...
              </div>
            )}
            {errors.habitualDistributorId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.habitualDistributorId.message}
              </p>
            )}
          </div>

          {showOtroInput && (
            <div>
              <Label className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold">
                Otro *
              </Label>
              <Input
                {...register("otherDistributorName")}
                placeholder="Nombre de la distribuidora..."
                className="mt-2 h-14 px-6 rounded-full border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
              {errors.otherDistributorName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otherDistributorName.message}
                </p>
              )}
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
