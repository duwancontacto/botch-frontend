"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import logoImage from "@/assets/Logo.png";

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

export default function CargarComprasPVPage() {
  return (
    <main className="min-h-screen h-full bg-white">
      <section className="relative h-64 sm:h-72 lg:h-96 ">
        <div className="relative h-full block md:flex">
          <div className="absolute inset-0 max-h-screen" />
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
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src={logoImage}
                  alt="Logo Bosch"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>
              <h6 className="text-2xl  md:text-2xl lg:text-3xl font-extrabold tracking-wide ">
                BOSCH
              </h6>
            </div>

            <div className="block md:flex-row flex-col items-end justify-end gap-2 sm:gap-3 z-20">
              <Button
                variant="outline"
                className="rounded-full border-2 border-white  bg-white  text-[#2a597e] h-14  w-[136px] mx-3 my-3 cursor-pointer md:my-0  text-sm md:text-base font-bold"
                asChild
              >
                <Link href="/Contacto">Contacto</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-white  border-white   text-[#2a597e]  h-14  w-[136px]  text-sm md:text-base font-bold cursor-pointer"
                asChild
              >
                <Link href="/.">Cerrar sesión</Link>
              </Button>
            </div>
          </div>
          <div className=" absolute z-10 flex items-end justify-end text-end  w-full py-40 md:py-30 px-4 md:px-20">
            <div>
              <p className="text-[#2a597e] text-[20px] md:text-2xl lg:text-[50px] leading-tight  font-bold   ">
                {"¿Te imaginás arriba"}
                <br />
                {"de tu próxima moto?"}
              </p>{" "}
              <p className="mt-3 text-[#2a597e] text-sm font-semibold  lg:text-[32px]">
                {"Estás más cerca de lo que pensás."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de contadores */}
      <section className="bg-[#3dadff]/15 p-6 md:p-0">
        <div className="mx-auto  max-w-6xl  block md:items-center py-2 md:px-6 md:py-6 md:flex  md:justify-center px-3 ">
          <h2 className="text-center sm:text-center text-[#2a597e] text-md md:text-[30px] font-extrabold">
            {"Ya llevás cargadas"}
          </h2>
          <div className="flex items-center justify-center gap-2 mx-3 md:mx-10">
            <span className=" text-md md:text-4xl font-extrabold text-[#2a597e]">
              100
            </span>
            <span className="text-[#2a597e] font-bold  text-[16px]">
              {"bujías"}
            </span>
            <span className="mx-4 text-md md:text-2xl font-extrabold text-[#2a597e]">
              =
            </span>
            <span className="text-md md:text-4xl font-extrabold text-[#2a597e]">
              03
            </span>
            <span className="text-[#2a597e] text-[16px] font-bold">
              {"chances"}
            </span>
          </div>
          <div />
        </div>
      </section>

      {/* Formulario principal */}
      <section className="mx-auto max-w-6xl px-6 py-4 md:py-12">
        <h3 className="text-xl  font-extrabold text-[#2a597e] md:text-[30px] ">
          {"Cargá tus compras y participá"}
        </h3>

        <form className="mt-8 space-y-7 text-[#2a597e]">
          {/* Fila 1: Distribuidor / Cantidad / Fecha */}
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label className="text-[#2a597e] text-[16px] font-bold">
                Distribuidor
              </Label>
              <Select>
                <SelectTrigger className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#6D6D6D] text-[16px]">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="text-[#6D6D6D]">
                  <SelectItem value="dist1">Distribuidor 1</SelectItem>
                  <SelectItem value="dist2">Distribuidor 2</SelectItem>
                  <SelectItem value="dist3">Distribuidor 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="qty"
                className="text-[#2a597e] text-[16px] font-bold"
              >
                Cantidad de bujías
              </Label>
              <Input
                id="qty"
                type="number"
                min={0}
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>
            <div>
              <Label
                htmlFor="fecha"
                className="text-[#2a597e] text-[16px] font-bold"
              >
                Fecha de factura
              </Label>
              <Input
                id="fecha"
                type="date"
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Fila 2: N° de factura / Nombre vendedor */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label
                htmlFor="nro"
                className="text-[#2a597e] text-[16px] font-bold"
              >
                Nº de factura
              </Label>
              <Input
                id="nro"
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>
            <div>
              <Label
                htmlFor="vendedor"
                className="text-[#2a597e] text-[16px] font-bold"
              >
                Nombre vendedor
              </Label>
              <Input
                id="vendedor"
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-1 text-sm text-[#6D6D6D]/80 text-md md:text-[18px]">
            <p>{"* Todos los datos proporcionados serán constatados."}</p>
            <p>
              {
                "** Se contabilizan todas las compras realizadas entre septiembre y noviembre."
              }
            </p>
          </div>

          {/* Aceptación */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="bases"
              className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full text-[18px]"
            />
            <Label
              htmlFor="bases"
              className="cursor-pointer text-[#6D6D6D] text-sm md:text-[18px]"
            >
              {"He leído y acepto las "}
              <a href="#" className="underline font-bold">
                {"bases y condiciones."}
              </a>
            </Label>
          </div>

          {/* Enviar */}
          <div className="pt-2">
            <Button className="rounded-full bg-[#2a597e] px-16 py-6 text-white hover:bg-[#2a597e]/90 font-bold">
              <Link
                href="/Confirmacion-Punto-Venta"
                className="text-xs sm:text-sm text-white "
              >
                {"Enviar"}
              </Link>
            </Button>
          </div>
        </form>
      </section>

      {/* Banda inferior (CTA catálogo) */}
      <section className="bg-[#6d6d6d]  text-center pb-28 pt-10">
        <div className="mx-auto max-w-4xl px-6">
          <h4 className="text-white text-[36px] sm:text-3xl font-extrabold">
            {"Más compras, más chances. Sin vueltas."}
          </h4>
          <div className="mt-6">
            <Button
              variant="outline"
              className="rounded-full bg-white text-[#2a597e] font-bold  text-[18px] border-transparent hover:bg-white/90 px-6"
            >
              {"Ver catálogo"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
