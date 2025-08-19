"use client";

import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader2 } from "lucide-react";
import Image from "next/image";
import backgroundImage from "@/assets/FondoDataDistribuidor.png";
import logoImage from "@/assets/Logo.png";
import Footer from "@/components/Footer";
import Icon from "@/assets/circulo-select.png";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "store/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateDistributorUpload } from "@/lib/hooks/use-distributor-upload-mutations";
import {
  DistributorUploadFormData,
  distributorUploadSchema,
} from "@/lib/schemas/distributor-upload-schemas";
import { useState } from "react";
import { useDistributors } from "@/lib/hooks/use-distributors";
import SuccessDistributor from "./SuccessDistributor";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function DashboardDistributor() {
  const { logout } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const createDistributorUpload = useCreateDistributorUpload();
  const { data: distributors, isLoading: isLoadingDistributors } =
    useDistributors();

  // Función helper para extraer mensajes de error de manera segura
  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return "Error desconocido";
  };

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DistributorUploadFormData>({
    resolver: zodResolver(distributorUploadSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const watchedFile = watch("file");

  const handleLogout = () => {
    logout();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file", file);
    }
  };

  const onSubmit = async (data: DistributorUploadFormData) => {
    try {
      console.log("Datos del formulario:", data);
      await createDistributorUpload.mutateAsync(data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  const handleSuccess = () => {
    setIsSuccess(false);
    reset();
  };

  if (isSuccess) {
    return <SuccessDistributor setIsSuccess={handleSuccess} />;
  }

  return (
    <ProtectedRoute requiredUserType="distributor">
      <main className="relative min-h-screen bg-white">
        {/* HERO superior con imagen y navegación */}
        <section className="relative  h-64 sm:h-[400px] lg:h-[520px]">
          <div className="relative h-full block md:flex ">
            <Image
              src={backgroundImage}
              alt="Fondo Login Distribuidor"
              fill
              className="absolute inset-0 object-cover "
              priority
            />

            {/* Topbar */}

            <div className="absolute inset-x-0 top-4 sm:top-6 block md:flex md:justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
              <div className="flex items-center gap-2 sm:gap-3 text-white px-3  ">
                <div className="relative w-[160px] h-[33px]">
                  <Image
                    src={logoImage}
                    alt="Logo Bosch"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>

              <div className="block md:flex-row flex-col items-end justify-end  z-20 ">
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-white  bg-white  text-[#2a597e] h-14  w-[136px] mx-3 my-3 cursor-pointer md:my-0  text-sm md:text-base font-bold"
                  asChild
                >
                  <Link href="/contact">Contacto</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-white  border-white lg:ml-10 text-[#2a597e]  h-14  w-[136px]  text-sm md:text-base font-bold cursor-pointer"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="mx-auto max-w-6xl px-6 py-3 md:py-0  ">
          <AnimatedSection delay={0.4}>
            <h1 className="text-xl sm:text-[36px] font-extrabold text-[#2a597e] pt-[5px] md:pt-[80px]">
              {"Cargá tus ventas y participá"}
            </h1>
          </AnimatedSection>

          {/* Link de descarga */}
          <AnimatedSection delay={0.6}>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#2a597e] text-sm md:text-[18px]  hover:opacity-90 font-bold sm:text-lg"
              >
                <span className="underline">
                  {"Descargá el reporte para completar con tus ventas"}
                </span>
                <Download className="size-5 font-bold" />
              </a>
            </div>
          </AnimatedSection>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-7 text-[#2a597e]"
          >
            {/* Campos obligatorios */}
            <AnimatedSection delay={0.8}>
              <span className="text-[18px] ">
                Todos los campos son obligatorios *
              </span>
            </AnimatedSection>

            {/* Distribuidor y Archivo */}
            <AnimatedSection delay={1.0}>
              <div className="grid gap-6 md:grid-cols-2 pt-2">
                <div>
                  <Label className="text-[#2a597e] font-bold text-sm sm:text-base">
                    Distribuidor *
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("distributorId", value)}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-full bg-white text-[#6D6D6D] border-[#2a597e]">
                      <SelectValue placeholder="Seleccionar distribuidor..." />
                    </SelectTrigger>
                    <SelectContent className="text-[#6D6D6D] text-[18px] border-0 bg-white">
                      {distributors?.map((distributor) => (
                        <SelectItem key={distributor.id} value={distributor.id}>
                          {distributor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isLoadingDistributors && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-[#2a597e]/70">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cargando distribuidores...
                    </div>
                  )}
                  {errors.distributorId && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.distributorId)}
                    </p>
                  )}
                </div>

                {/* Adjuntar documento */}
                <div>
                  <Label className="text-[#2a597e] font-bold text-sm sm:text-base">
                    Archivo de ventas *
                  </Label>
                  <div className="mt-2 relative text-[#6D6D6D]">
                    <Input
                      readOnly
                      placeholder={
                        watchedFile ? watchedFile.name : "Adjuntar documento"
                      }
                      className="h-12 w-full rounded-full border-[#2a597e] placeholder:text-[#6D6D6D]/60 focus-visible:ring-0 pr-12"
                    />
                    <label className="absolute right-2 top-1/2 -translate-y-1/2">
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".xlsx,.xls,.csv"
                      />
                      <span className="grid size-8 place-items-center rounded-full text-[#6D6D6D] hover:bg-[#2a597e]/10 cursor-pointer bg-white">
                        <Image src={Icon} alt="Upload" width={20} height={20} />
                      </span>
                    </label>
                  </div>
                  {errors.file && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.file)}
                    </p>
                  )}
                  {watchedFile && (
                    <p className="text-sm text-[#6D6D6D] mt-1">
                      Archivo seleccionado: {watchedFile.name} (
                      {(watchedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Notas */}
            <AnimatedSection delay={1.2}>
              <div className="space-y-1 text-[#6D6D6D]/80 text-sm sm:text-base md:text-lg">
                <p>{"* Todos los datos proporcionados serán constatados."}</p>
                <p>
                  {
                    "** Se contabilizan todas las compras realizadas entre septiembre y noviembre."
                  }
                </p>
              </div>
            </AnimatedSection>

            {/* Aceptación de bases */}
            <AnimatedSection delay={1.4}>
              <div className="flex items-center gap-2 sm:gap-3">
                <Checkbox
                  id="acceptTerms"
                  onCheckedChange={() => {
                    setValue(
                      "acceptTerms",
                      !watch("acceptTerms") ? true : false
                    );
                  }}
                  className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full"
                />
                <Label
                  htmlFor="acceptTerms"
                  className="cursor-pointer text-[#6D6D6D] text-sm sm:text-base"
                >
                  {"He leído y acepto las "}
                  <a href="#" className="underline font-bold">
                    {"bases y condiciones"}
                  </a>
                  .
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(errors.acceptTerms)}
                </p>
              )}
            </AnimatedSection>

            {/* Enviar */}
            <AnimatedSection delay={1.6}>
              <div className="pt-2 mb-20">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#2a597e] px-16 py-6 sm:py-5 lg:py-7 text-white hover:bg-[#2a597e]/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </div>
            </AnimatedSection>
          </form>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
}
