"use client";

import Image from "next/image";
import backgroundImage from "@/assets/FondoDeLoginDeDistribuidor.png";
import { useUserType } from "store/useUserType";
import LoginForm from "@/components/LoginForm";
import AuthRedirect from "@/components/AuthRedirect";

export default function LoginPage() {
  const { userType } = useUserType();

  return (
    <>
      <AuthRedirect />
      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-light">
        {/* Columna izquierda: imagen de fondo con contenido dinámico */}
        <div
          className={`relative min-h-[${
            userType === "distributor" ? "400px" : "600px"
          }] md:max-h-full`}
        >
          <Image
            src={backgroundImage}
            alt="Fondo Login"
            fill
            className="absolute inset-0 object-cover"
            priority
          />

          {/* Contenido dinámico según el tipo de usuario */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
            {userType === "distributor" ? (
              // Contenido para Distribuidor
              <h1 className="text-3xl lg:text-4xl xl:text-[50px] font-extrabold leading-tight text-[#2a597e] max-w-xl text-center lg:text-left">
                {"Registrate,"}
                <br />
                {"cargá tus ventas y"}
                <br />
                {"empezá a participar."}
              </h1>
            ) : (
              // Contenido para Punto de Venta
              <div className="z-10 md:mx-14 my-5 md:my-24 text-[#2a597e] max-w-2xl ">
                <h1 className="text-4xl md:text-5xl lg:text-[47px] xl:text-7xl leading-tight font-bold">
                  {"Tu confianza"}
                  <br />
                  {"tiene premio."}
                </h1>

                {/* Línea corta bajo el título */}
                <div
                  className="mt-1 md:mt-6 h-[2px] md:h-[3px] w-12 md:w-16 rounded bg-[#2a597e]"
                  aria-hidden="true"
                />

                <p className="mt-2 md:mt-8 text-xl lg:text-[27px] leading-snug max-w-[460px]">
                  Con la compra de bujías Bosch de septiembre, octubre y
                  noviembre podés ganarte una de las{" "}
                  <span className="font-semibold">ocho motos en juego.</span>
                </p>

                {/* Lista tipo timeline */}
                <ul className="my-10  space-y-3 md:space-y-3 text-[15px]">
                  {[
                    { text: "De 50 a 99 bujías, sumás 1 chance." },
                    { text: "De 100 a 199, sumás 3 chances." },
                    { text: "De 200 a 399, sumás 8 chances." },
                    { text: "A partir de las 400, sumás 20 chances." },
                  ].map((item, i, arr) => (
                    <li
                      key={i}
                      className="relative grid grid-cols-[16px_1fr] md:grid-cols-[20px_1fr] items-start gap-3 md:gap-4"
                    >
                      {/* Punto y línea vertical */}
                      <div className="relative">
                        <span className="block w-[14px] h-[14px] mt-[9px] rounded-full border-2 border-[#2a597e] text-transparent ">
                          .
                        </span>
                        {i < arr.length - 1 && (
                          <span
                            className="absolute left-1/3 top-[22px] -translate-x-1/2 w-[2px] bg-[#2a597e]"
                            style={{ height: "33px", borderRadius: "2px" }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <p className="text-base text-[20px] leading-relaxed">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className=" text-[20px] leading-relaxed">
                  {"Registrate, cargá tus compras"}
                  <br />
                  {"y empezá a sumar chances."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: formulario de login */}
        <div className="flex items-start  lg:items-center justify-center px-4 sm:px-6 md:px-8 mt-10 lg:mt-0 sm:py-5 z-10">
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}
