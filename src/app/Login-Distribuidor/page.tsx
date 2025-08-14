"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import Image from "next/image";
import backgroundImage from "@/assets/FondoDeLoginDeDistribuidor.png";

export default function DistribuidorLoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-light">
      {/* Columna izquierda: imagen de fondo */}
      <div className="relative max-h-[680px] md:max-h-full ">
        <Image
          src={backgroundImage}
          alt="Fondo Login Distribuidor"
          fill
          className="absolute inset-0 object-cover "
          priority
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[50px] font-extrabold leading-tight text-[#2a597e] max-w-xl text-center lg:text-left">
            {"Registrate,"}
            <br />
            {"cargá tus ventas y"}
            <br />
            {"empezá a participar."}
          </h1>
        </div>
      </div>

      {/* Columna derecha: formulario */}
      <div className=" flex items-center justify-center px-4 sm:px-6 md:px-8  mt-0 md:mt-0  sm:py-5 z-10  ">
        <div className="w-full sm:max-w-lg md:max-w-xl ">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2a597e]">
            {"Inicia sesión"}
          </h2>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 ">
            <div className="space-y-2">
              <Label
                htmlFor="usuario"
                className="text-[#2A597E] text-base sm:text-lg md:text-[19px]"
              >
                {"Usuario"}
              </Label>
              <Input
                id="usuario"
                name="usuario"
                className="h-10 sm:h-12 rounded-full border-2 border-[#2a597e] bg-white text-[#2a597e] focus-visible:ring-0 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[#2a597e] text-base sm:text-lg md:text-[19px]"
              >
                {"Contraseña"}
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="h-10 sm:h-12 rounded-full border-2 border-[#2a597e] bg-white text-[#2a597e] focus-visible:ring-0 text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center gap-3 text-[#2a597e]">
              <Checkbox
                id="keep"
                className="border-[#2a597e] data-[state=checked]:bg-[#2a597e] rounded-full w-[24px] h-[24px]"
              />
              <Label
                htmlFor="keep"
                className="cursor-pointer text-xs sm:text-sm md:text-[14px]"
              >
                {"Mantener sesión iniciada."}
              </Label>
            </div>

            <p className="text-[#2a597e] text-xs sm:text-sm md:text-[14px] text-center lg:text-left">
              {"¿Todavía no tenés cuenta? "}
              <Link href="/Registro" className="font-bold  text-[#2a597e]">
                {"Registrate ahora."}
              </Link>
            </p>

            <div className="pt-2">
              <Button className="rounded-full cursor-pointer bg-[#2a597e] px-10 py-4 sm:py-5 md:py-6 font-bold text-white hover:bg-[#2a597e]/90  text-sm sm:text-base">
                <Link
                  href="/Data-Distribuidor"
                  className="text-xs sm:text-sm text-white "
                >
                  {"Entrar"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
