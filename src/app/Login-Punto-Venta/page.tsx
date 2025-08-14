"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import Image from "next/image";
import backgroundImage from "@/assets/FondoDeLoginDeDistribuidor.png";

export default function PuntoDeVentaLoginPage() {
  return (
    <main className=" md:grid-cols-2 bg-white grid  min-h-screen grid-cols-1 lg:grid-cols-2 bg-light">
      <div className="relative max-h-[680px] md:max-h-full  ">
        <Image
          src={backgroundImage}
          alt="Fondo Login Distribuidor"
          fill
          className="absolute inset-0 object-cover object-center sm:object-center md:object-center lg:object-center "
          priority
        />

        <div className=" inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12   ml-15  md:ml-0">
          <div className=" z-10  md:mx-14 mt-5 md:mt-24  text-[#2a597e] ">
            <h1 className="text-md sm:text-4xl md:text-5xl lg:text-[47px] xl:text-7xl leading-tight] font-bold ">
              {"Tu confianza"}
              <br />
              {"tiene premio."}
            </h1>

            {/* Línea corta bajo el título */}
            <div
              className="mt-1 md:mt-6 h-[2px] md:h-[3px] w-12 md:w-16 rounded bg-[#2a597e]"
              aria-hidden="true"
            />

            <p className="mt-2 md:mt-8 text-md sm:text-xl md:text-2xl lg:text-[25px] leading-snug">
              {"Con la compra de bujías"}
              <br />
              {"Bosch podés ganarte una"}
              <br />
              {"de las "}
              {"ocho motos en juego."}
            </p>

            {/* Lista tipo timeline */}
            <ul className="mt-2 md:mt-8 space-y-4 md:space-y-6 text-[15px]">
              {[
                {text: "De 50 a 99 bujías,sumás 1 chance."},
                {text: "De 100 a 199, sumás 3 chances."},
                {text: "De 200 a 399, sumás 8 chances."},
                {text: "A partir de las 400, sumás 20 chances."},
              ].map((item, i, arr) => (
                <li
                  key={i}
                  className="relative grid grid-cols-[16px_1fr] md:grid-cols-[20px_1fr] items-start gap-3 md:gap-4 "
                >
                  {/* Punto y línea vertical */}
                  <div className="relative ">
                    <span className="block size-2.5 -my-1 md:size-3 rounded-full border-2 border-[#2a597e] bg-white translate-y-1.5 md:translate-y-2" />
                    {i < arr.length - 1 && (
                      <span
                        className="absolute left-1/3 top-3 md:top-4 -translate-x-1/2 w-[2px] bg-[#2a597e]/60"
                        style={{height: "50px", borderRadius: "2px"}}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] leading-relaxed ">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-2 md:mt-8 text-base sm:text-lg md:text-xl lg:text-[19px] leading-relaxed">
              {"Registrate, cargá tus compras"}
              <br />
              {"y empezá a sumar chances."}
            </p>
          </div>
        </div>
      </div>

      {/* Columna derecha: formulario */}
      <div className=" flex items-center justify-center px-4 sm:px-6 md:px-8  mt-10 md:mt-0 sm:py-8 z-10 ">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl ">
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

            <p className="text-[#2a597e] text-xs sm:text-sm md:text-[14px] text-left lg:text-left">
              {"¿Todavía no tenés cuenta? "}
              <Link href="/Registro" className="font-bold  text-[#2a597e]">
                {"Registrate ahora."}
              </Link>
            </p>

            <div className="pt-2 mb-8 md:mb-0">
              <Button className="rounded-full cursor-pointer bg-[#2a597e] px-10 py-4 sm:py-5 md:py-6 font-bold text-white hover:bg-[#2a597e]/90  text-sm sm:text-base">
                <Link
                  href="/Data-Punto-Venta"
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
