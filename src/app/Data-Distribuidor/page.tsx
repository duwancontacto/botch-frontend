"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Download} from "lucide-react";
import Image from "next/image";
import backgroundImage from "@/assets/FondoDataDistribuidor.png";
import logoImage from "@/assets/Logo.png";
import Footer from "@/components/Footer";
import Icon from "@/assets/circulo-select.png";

export default function CargaDatosDistribuidorPage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* HERO superior con imagen y navegación */}
      <section className="relative  md:h-56 xl:h-96 h-40 ">
        <div className="relative h-40 sm:h-48 lg:min-h-[360px] lg:h-full ">
          <div className="absolute inset-0 bg-[#2a597e]" />
          <Image
            src={backgroundImage}
            alt="Fondo Login Distribuidor"
            fill
            className="absolute inset-0 object-cover "
            priority
          />
          <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center">
            <h1 className="text-[#2a597e] text-2xl sm:text-3xl lg:text-4xl font-extrabold"></h1>
          </div>
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
        </div>
      </section>

      {/* Contenido principal */}
      <section className="mx-auto max-w-6xl px-6 py-3 md:py-0   ">
        <h1 className="text-xl sm:text-[36px] font-extrabold text-[#2a597e] pt-[5px] md:pt-[30px]">
          {"Cargá tus ventas y participá"}
        </h1>

        {/* Link de descarga */}
        <div className="mt-6">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#2a597e] text-sm md:text-[18px]  hover:opacity-90 font-bold sm:text-lg"
          >
            <span>{"Descargá el reporte para completar con tus ventas"}</span>
            <Download className="size-6 font-bold" />
          </a>
        </div>

        {/* Formulario */}
        <form className="mt-6 space-y-7 text-[#2a597e]">
          {/* Distribuidor y Ventas */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className="text-[#2a597e] font-bold text-sm sm:text-base">
                Distribuidor
              </Label>
              <Select>
                <SelectTrigger className="mt-2 h-12 rounded-full bg-white   text-[#6D6D6D] border-[#2a597e]">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="text-[#6D6D6D] text-[18px] border-0 bg-white">
                  <SelectItem value="dist1">Distribuidor 1</SelectItem>
                  <SelectItem value="dist2">Distribuidor 2</SelectItem>
                  <SelectItem value="dist3">Distribuidor 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Adjuntar documento */}
            <div>
              <Label className="text-[#2a597e] font-bold text-sm sm:text-base">
                Ventas
              </Label>
              <div className="mt-2 relative text-[#6D6D6D]">
                <Input
                  readOnly
                  placeholder="Adjuntar documento"
                  className="h-12 w-full rounded-full  border-[#2a597e]  placeholder:text-[#6D6D6D]/60 focus-visible:ring-0 pr-12"
                />
                <label className="absolute right-2 top-1/2 -translate-y-1/2">
                  <input type="file" className="sr-only" />
                  <span className="grid size-8 place-items-center rounded-full  text-[#6D6D6D] hover:bg-[#2a597e]/10 cursor-pointer bg-white">
                    <Image src={Icon} alt="Upload" width={20} height={20} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-1 text-[#6D6D6D]/80 text-sm sm:text-base md:text-lg">
            <p>{"* Todos los datos proporcionados serán constatados."}</p>
            <p>
              {
                "** Se contabilizan todas las compras realizadas entre septiembre y noviembre."
              }
            </p>
          </div>

          {/* Aceptación de bases */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Checkbox
              id="bases"
              className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full "
            />
            <Label
              htmlFor="bases"
              className="cursor-pointer text-[#6D6D6D] text-sm sm:text-base"
            >
              {"He leído y acepto las "}
              <a href="#" className="underline font-bold">
                {"bases y condiciones"}
              </a>
              .
            </Label>
          </div>

          {/* Enviar */}
          <div className="pt-2">
            <Button className="rounded-full bg-[#2a597e] px-16 py-6 sm:py-5 lg:py-7 text-white hover:bg-[#2a597e]/90 transition-colors">
              <Link
                href="/Confirmacion-Distibuidor"
                className="text-sm sm:text-base lg:text-lg text-white font-medium"
              >
                {"Enviar"}
              </Link>
            </Button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
