"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormSelect from "@/components/ui/form-select";
import { useRegisterDistributor } from "@/lib/hooks/use-auth-mutations";
import { useDistributors } from "@/lib/hooks/use-distributors";
import {
  distributorSchema,
  DistributorFormData,
} from "@/lib/schemas/auth-schemas";
import { Distributor } from "@/lib/types/api-types";
import { Loader2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

interface FormularioDistribuidorProps {
  onRegistrationSuccess: () => void;
}

export default function FormularioDistribuidor({
  onRegistrationSuccess,
}: FormularioDistribuidorProps) {
  const { data: distributors, isLoading: isLoadingDistributors } =
    useDistributors();
  const registerMutation = useRegisterDistributor();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      userType: "distributor",
      distributorId: "",
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const distributorId = watch("distributorId");

  const onSubmit = async (data: DistributorFormData) => {
    try {
      console.log("test");
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
      {/* Distribuidor (Select) */}
      <AnimatedSection delay={0.2}>
        <div className="w-full">
          <FormSelect
            label="Distribuidor"
            id="distributorId"
            labelClassName="font-bold"
            placeholder="Seleccionar..."
            required
            options={distributorOptions}
            value={distributorId}
            onValueChange={(value) => setValue("distributorId", value)}
            error={errors.distributorId?.message}
          />
          {isLoadingDistributors && (
            <div className="flex items-center gap-2 mt-2 text-sm text-[#2a597e]/70">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando distribuidores...
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Nombre y Mail */}
      <AnimatedSection delay={0.4}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Nombre y apellido del responsable"
            id="fullName"
            labelClassName="font-bold"
            required
            error={errors.fullName?.message}
            {...register("fullName")}
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

      {/* Passwords */}
      <AnimatedSection delay={0.6}>
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

      <AnimatedSection delay={0.8}>
        <span className="text-[18px] tracking-[-0.5px]">
          Todos los campos son obligatorios *
        </span>
      </AnimatedSection>

      <AnimatedSection delay={1.0}>
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
