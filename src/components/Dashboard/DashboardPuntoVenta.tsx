"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logoImage from "@/assets/Logo.png";
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
import backgroundImage from "@/assets/FondoDataPuntoVenta.png";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "store/useAuth";
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

export default function DashboardPuntoVenta() {
  const { logout } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: distributors, isLoading: isLoadingDistributors } =
    useDistributors();
  const {
    data: invoiceSummary,
    isLoading: isLoadingSummary,
    refetch,
  } = useInvoiceSummary();
  const createPdvInvoice = useCreatePdvInvoice();

  console.log(invoiceSummary, "invoiceSummary");

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

  const handleLogout = () => {
    logout();
  };

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

  return (
    <ProtectedRoute requiredUserType="point_of_sale">
      {isSuccess ? (
        <SuccessPuntoVenta
          setIsSuccess={setIsSuccess}
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
          <section className="relative h-64 sm:h-[400px] lg:h-[520px] ">
            <div className="relative h-full block md:flex">
              <Image
                src={backgroundImage}
                alt="Fondo Data Punto de Venta"
                fill
                className="absolute inset-0 object-cover max-h-screen "
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

                <div className="block md:flex-row flex-col items-end justify-end gap-2 sm:gap-3 z-20">
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-white  bg-white  text-[#2a597e] h-14  w-[136px] mx-3 my-3 cursor-pointer md:my-0  text-sm md:text-base font-bold"
                    asChild
                  >
                    <Link href="/contacto">Contacto</Link>
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
              <div className=" absolute z-10  flex items-end justify-end text-end md:h-full  w-full  py-40 md:py-30 px-4 md:px-20 ">
                <div>
                  <p className="text-[#2a597e] text-[20px] md:text-3xl lg:text-[60px] leading-tight  font-bold   ">
                    {"¿Te imaginás arriba"}
                    <br />
                    {"de tu próxima moto?"}
                  </p>{" "}
                  <p className="mt-3 text-[#2a597e] text-sm font-semibold  lg:text-[36px]">
                    {"Estás más cerca de lo que pensás."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-[#2a597e] p-6 py-10 mb-0">
            <div className="grid grid-cols-1 max-w-5xl mx-auto md:grid-cols-4 gap-4">
              {niveles.map((nivel, index) => (
                <div
                  key={index}
                  className="bg-transparent border border-white rounded-full p-4 text-center max-w-[220px]"
                >
                  <p className="text-white text-sm md:text-base  font-medium">
                    {nivel.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Componente de opciones de puntajes */}
          <section className="bg-[#3dadff]/15 p-6 py-10 ">
            <div className="mx-auto  max-w-6xl  block md:items-center py-2 md:px-6 md:py-6 md:flex  md:justify-center px-3 ">
              <h2 className="text-center sm:text-center text-[#2a597e] text-md md:text-[36px] mr-10 font-extrabold">
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
                    <span className=" text-md md:text-5xl font-extrabold text-[#2a597e]">
                      {invoiceSummary?.totalUnits || 0}
                    </span>
                    <span className="text-[#2a597e] font-bold  text-[16px]">
                      {"bujías"}
                    </span>
                    <span className="mx-8 text-md md:text-5xl font-extrabold text-[#2a597e]">
                      =
                    </span>
                    <span className="text-md md:text-5xl font-extrabold text-[#2a597e]">
                      {String(invoiceSummary?.totalChances || 0).padStart(
                        2,
                        "0"
                      )}
                    </span>
                    <span className="text-[#2a597e] font-bold  text-[16px]">
                      {"chances"}
                    </span>
                  </>
                )}
              </div>
              <div />
            </div>
          </section>

          {/* Formulario principal */}
          <section className="mx-auto max-w-6xl px-6 py-4 md:py-12">
            <h3 className="text-xl  font-extrabold text-[#2a597e] md:text-[36px] ">
              {"Cargá tus compras y participá"}
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-7 text-[#2a597e]"
            >
              {/* Fila 1: Distribuidor / Otro / Cantidad de bujías */}
              <span className="text-[18px] ">
                Todos los campos son obligatorios *
              </span>
              <div
                className={`grid gap-6 ${
                  showOtroInput ? "md:grid-cols-3" : "md:grid-cols-2"
                } pt-2`}
              >
                <div>
                  <Label className="text-[#2a597e] text-[16px] font-bold">
                    Distribuidor *
                  </Label>
                  <Select
                    onValueChange={handleDistribuidorChange}
                    value={watchedDistributor}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#6D6D6D] text-[16px]">
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
                    <Label className="text-[#2a597e] text-[16px] font-bold">
                      Otro *
                    </Label>
                    <Input
                      {...register("otherDistributorName")}
                      placeholder="Nombre de la distribuidora..."
                      className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                    />
                    {errors.otherDistributorName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.otherDistributorName.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <Label className="text-[#2a597e] text-[16px] font-bold">
                    Cantidad de bujías *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    //placeholder="Ingresa la cantidad de bujías"
                    {...register("units")}
                    className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                  />
                  {errors.units && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.units.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Fila 2: N° de factura / Fecha de factura */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="invoiceNumber"
                    className="text-[#2a597e] text-[16px] font-bold"
                  >
                    N° de factura *
                  </Label>
                  <Input
                    id="invoiceNumber"
                    {...register("invoiceNumber")}
                    className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
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
                    className="text-[#2a597e] text-[16px] font-bold"
                  >
                    Fecha de factura *
                  </Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    {...register("invoiceDate")}
                    className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
                  />
                  {errors.invoiceDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.invoiceDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Notas */}
              <div className="space-y-1 text-sm text-[#6D6D6D] text-md md:text-[18px]">
                <p>* Todos los datos proporcionados serán constatados.</p>
                <p>
                  ** Se contabilizan todas las compras realizadas entre
                  septiembre y noviembre.
                </p>
                <p>*** Las chances se contabilizan por cada factura.</p>
              </div>

              {/* Aceptación */}
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
                  className="cursor-pointer text-[#6D6D6D] text-sm md:text-[18px]"
                >
                  {"He leído y acepto las "}
                  <a href="#" className="underline font-bold">
                    {"bases y condiciones."}
                  </a>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">
                  {errors.acceptTerms.message}
                </p>
              )}

              {/* Enviar */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full cursor-pointer bg-[#2a597e] px-16 py-6 text-white hover:bg-[#2a597e]/90 font-bold disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>
          </section>

          {/* Banda inferior (CTA catálogo) */}
          <section className="bg-[#6d6d6d]  text-center flex flex-col items-center justify-center   min-h-[300px]">
            <h4 className="text-white text-[36px]  font-extrabold">
              {"Más compras, más chances. Sin vueltas."}
            </h4>
            <div className="mt-6">
              <Button
                variant="outline"
                className="rounded-full h-[70px] w-[200px] bg-white text-[#2a597e] font-bold  text-[18px] border-transparent hover:bg-white/90 px-6"
              >
                {"Ver catálogo"}
              </Button>
            </div>
          </section>

          <Footer />
        </main>
      )}
    </ProtectedRoute>
  );
}
