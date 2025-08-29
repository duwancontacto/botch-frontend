"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import backgroundImage from "@/assets/FondoDataPuntoVenta.webp";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDistributors } from "@/lib/hooks/use-distributors";
import { useCreatePdvInvoice } from "@/lib/hooks/use-pdv-invoice-mutations";
import { useInvoiceSummary } from "@/lib/hooks/use-invoice-summary";
import {
  PdvInvoiceFormData,
  pdvInvoiceSchema,
} from "@/lib/schemas/pdv-invoice-schemas";
import { Loader2 } from "lucide-react";
import SuccessPuntoVenta from "./SuccessPuntoVenta";
import { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import Header from "../Header";

export default function DashboardPuntoVenta() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: distributors, isLoading: isLoadingDistributors } =
    useDistributors();
  const {
    data: invoiceSummary,
    isLoading: isLoadingSummary,
    refetch,
  } = useInvoiceSummary();
  const createPdvInvoice = useCreatePdvInvoice();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PdvInvoiceFormData>({
    resolver: zodResolver(pdvInvoiceSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const watchedDistributor = watch("habitualDistributorId");
  const showOtroInput = watchedDistributor === "otro";

  const handleDistribuidorChange = (value: string) => {
    setValue("habitualDistributorId", value);
    if (value !== "otro") {
      setValue("otherDistributorName", "");
    }
  };

  const onSubmit = async (data: PdvInvoiceFormData) => {
    try {
      console.log("Datos del formulario:", data);
      await createPdvInvoice.mutateAsync(data);
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsSuccess(true);
      refetch();
      reset();
    } catch (error) {
      console.error("Error al crear factura:", error);
    }
  };

  const niveles = [
    { title: "De 50 a 99 bujías, sumás 1 chance." },
    { title: "De 100 a 199 bujías, sumás 3 chances." },
    { title: "De 200 a 399 bujías, sumás 8 chances." },
    { title: "A partir de 400 bujías, sumás 20 chances." },
  ];

  const handleSuccess = () => {
    setIsSuccess(false);
    refetch();
    reset();
  };

  return (
    <>
      {isSuccess ? (
        <SuccessPuntoVenta
          setIsSuccess={handleSuccess}
          invoiceSummary={
            invoiceSummary || {
              totalUnits: 0,
              totalChances: 0,
              niveles: [],
            }
          }
        />
      ) : (
        <main className="min-h-screen h-full bg-white">
          <section className="relative h-64 md:h-[400px] lg:h-[480px] ">
            <div className="relative h-full block md:flex">
              <Image
                src={backgroundImage}
                alt="Fondo Data Punto de Venta"
                fill
                className="absolute inset-0 object-cover max-h-screen "
                priority
              />
              {/* Topbar */}

              <Header />

              <div className=" absolute z-10  flex items-end justify-end text-end md:h-full  w-full  py-30 px-6 md:px-20 ">
                <AnimatedSection delay={0.2}>
                  <p className="text-[#0D385E] text-[20px] md:text-3xl lg:text-[60px] leading-[25px] md:leading-[30px] lg:leading-[70px]  font-extrabold tracking-[-1px] lg:tracking-[-3px]   ">
                    {"¿Te imaginás arriba"}
                    <br />
                    {"de tu próxima moto?"}
                  </p>{" "}
                  <div
                    className="sm:mt-6 h-[2px] w-8 md:w-16 rounded bg-[#2a597e] mt-4 ml-auto"
                    aria-hidden="true"
                  />
                  <p className="mt-2 md:mt-3 text-[#0D385E] text-[11px] tracking-[-0.5px] md:tracking-[-1.5px] md:text-sm font-medium  lg:text-[32.5px]">
                    {"Estás más cerca de lo que pensás."}
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <div className="bg-[#2a597e] p-6 py-10 mb-0">
            <div className="grid max-w-5xl mx-auto grid-cols-2 md:grid-cols-4 gap-4 px-10 md:px-0">
              {niveles.map((nivel, index) => (
                <AnimatedSection
                  delay={0.1 + index * 0.2}
                  key={index}
                  className="bg-transparent flex items-center border mx-auto border-white rounded-full p-3 py-2 md:p-4 text-center max-w-[220px]"
                >
                  <p className="text-white text-[12px] md:text-[20px] tracking-[-0.5px] leading-[14px] md:leading-[24px] font-medium">
                    {nivel.title}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Componente de opciones de puntajes */}
          <AnimatedSection delay={0.4}>
            <section className="bg-[#3dadff]/15 p-6 py-4 md:py-10">
              <div className="mx-auto  max-w-6xl  block md:items-center py-2 md:px-6 md:py-6 md:flex  md:justify-center px-3 ">
                <h2 className="text-center sm:text-center text-[#2a597e] text-[14px]  mb-2 md:mb-0 md:text-[36px] mr-0 md:mr-10 font-bold tracking-[-1px] md:tracking-[-1.5px]">
                  {"Ya llevás cargadas"}
                </h2>
                <div className="flex items-center justify-center gap-2 mx-3 md:mx-10">
                  {isLoadingSummary ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-[#2a597e]" />
                      <span className="text-[#2a597e] font-bold text-[16px]">
                        Cargando...
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className=" text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                        {invoiceSummary?.totalUnits || 0}
                      </span>
                      <span className="text-[#2a597e] font-bold tracking-[-0.5px] pl-2 text-[10px] md:text-[16px]">
                        {"bujías"}
                      </span>
                      <span className="mx-4 md:mx-8 text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                        =
                      </span>
                      <span className="text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                        {invoiceSummary?.totalChances || 0}
                      </span>
                      <span className="text-[#2a597e] font-bold tracking-[-0.5px] pl-2 text-[10px] md:text-[16px]">
                        {"chances"}
                      </span>
                    </>
                  )}
                </div>
                <div />
              </div>
            </section>
          </AnimatedSection>

          {/* Formulario principal */}
          <section className="mx-auto max-w-6xl px-6 py-4 md:py-12 pt-10 ">
            <AnimatedSection delay={0.5}>
              <h3 className="text-xl  font-bold text-[#2a597e] md:text-[36px] tracking-[-1px] md:tracking-[-1.5px]">
                {"Cargá tus compras y participá"}
              </h3>
            </AnimatedSection>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-7 text-[#2a597e]"
            >
              {/* Fila 1: Distribuidor / Otro / Cantidad de bujías */}
              <AnimatedSection delay={0.6} className="mb-3">
                <span className="text-[18px] tracking-[-0.5px]">
                  Todos los campos son obligatorios *
                </span>
              </AnimatedSection>
              <AnimatedSection delay={0.7}>
                <div
                  className={`grid gap-6 ${
                    showOtroInput ? "md:grid-cols-3" : "md:grid-cols-2"
                  } pt-2`}
                >
                  <div>
                    <Label className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold">
                      Distribuidor *
                    </Label>
                    <Select
                      onValueChange={handleDistribuidorChange}
                      value={watchedDistributor}
                    >
                      <SelectTrigger className="mt-2 h-14 px-6 rounded-full  border-[#2a597e] text-[#6D6D6D] text-[16px]">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent className="text-[#6D6D6D] bg-white">
                        {distributors?.map((distributor) => (
                          <SelectItem
                            key={distributor.id}
                            value={distributor.id}
                          >
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
                        className="mt-2 h-14 px-6 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                      />
                      {errors.otherDistributorName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.otherDistributorName.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold">
                      Cantidad de bujías *
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      //placeholder="Ingresa la cantidad de bujías"
                      {...register("units")}
                      className="mt-2 h-14 px-6 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                    />
                    {errors.units && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.units.message}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {/* Fila 2: N° de factura / Fecha de factura */}
              <AnimatedSection delay={0.8}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="invoiceNumber"
                      className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold"
                    >
                      N° de factura *
                    </Label>
                    <Input
                      id="invoiceNumber"
                      {...register("invoiceNumber")}
                      className="mt-2 h-14 px-6 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                    />
                    {errors.invoiceNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.invoiceNumber.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="invoiceDate"
                      className="text-[#2a597e] tracking-[-0.5px] text-[16px] font-bold"
                    >
                      Fecha de factura *
                    </Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      {...register("invoiceDate")}
                      className="mt-2 h-14 px-6 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                    />
                    {errors.invoiceDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.invoiceDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {/* Notas */}
              <AnimatedSection delay={0.9}>
                <div className="space-y-1 text-sm text-[#6D6D6D] text-md md:text-[18px]">
                  <p>* Todos los datos proporcionados serán constatados.</p>
                  <p>
                    ** Se contabilizan todas las compras realizadas entre
                    septiembre y noviembre.
                  </p>
                  <p>*** Las chances se contabilizan por cada factura.</p>
                </div>
              </AnimatedSection>

              {/* Aceptación */}
              <AnimatedSection delay={2.0}>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="acceptTerms"
                    {...register("acceptTerms")}
                    onCheckedChange={() => {
                      setValue(
                        "acceptTerms",
                        !watch("acceptTerms") ? true : false
                      );
                    }}
                    className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full text-[18px]"
                  />
                  <Label
                    htmlFor="acceptTerms"
                    className="cursor-pointer text-[#6D6D6D]/80 tracking-[-0.5px] text-sm md:text-[18px]"
                  >
                    {"He leído y acepto las "}
                    <a
                      target="_blank"
                      href="/BOSCH-BC-Bujias-Sorteo-Puntos-de-Venta-Servicios.pdf"
                      className="underline font-bold"
                    >
                      {"bases y condiciones."}
                    </a>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </AnimatedSection>

              {/* Enviar */}
              <AnimatedSection delay={0.6}>
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full h-[50px] md:h-[70px] text-md md:text-lg tracking-[-0.5px] cursor-pointer bg-[#2a597e] px-10 py-2 md:px-18 md:py-6 text-white hover:bg-[#2a597e]/90 font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </AnimatedSection>
            </form>
          </section>

          {/* Banda inferior (CTA catálogo) */}
          <AnimatedSection delay={0.6}>
            <section className="bg-[#6d6d6d] text-center flex flex-col items-center justify-center min-h-[330px] relative overflow-hidden">
              {/* Video de fondo */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/botch-video.mp4" type="video/mp4" />
              </video>

              {/* Overlay para mejorar la legibilidad del texto */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>

              {/* Contenido del section */}
              <div className="relative z-20">
                <h4 className="text-white text-xl md:text-[36px] font-bold tracking-[-1px] md:tracking-[-1.5px]">
                  {"Más compras, más chances. Sin vueltas."}
                </h4>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer tracking-[-0.5px] h-12 md:h-[70px] w-[150px] md:w-[200px] bg-white text-[#2a597e] font-bold text-[14px] md:text-[18px] border-transparent hover:bg-white/90 px-6"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/Catalogo-Bujias-Bosch.pdf";
                      link.download = "Catalogo-Bujias-Bosch.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    {"Ver catálogo"}
                  </Button>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <Footer />
        </main>
      )}
    </>
  );
}
