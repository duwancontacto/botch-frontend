"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/backgroundHome.png";
import logoImage from "@/assets/Logo.png";
import { UserType, useUserType } from "store/useUserType";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

export default function Page() {
  const router = useRouter();
  const { setUserType } = useUserType();

  const handleUserType = (userType: UserType) => {
    setUserType(userType);
    router.push("/login");
  };

  return (
    <>
      <AuthRedirect />
      <main className="relative min-h-screen overflow-hidden pb-20">
        {/* Capa 1: Imagen de fondo */}
        <Image
          src={backgroundImage}
          alt="Fondo principal"
          fill
          className="absolute inset-0 object-cover"
          priority
          quality={100}
        />

        {/* Header / Logo */}
        <header className=" relative z-10  pt-4 sm:px-6 md:px-8 lg:px-20 lg:pt-16 ">
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
        </header>
        {/* Contenido principal */}
        <section className="relative z-10 px-8 lg:px-0  pt-24">
          <div className=" sm:mx-0 md:mx-0 lg:mx-24 mt-26 md:mt-36 z-10">
            <p className="text-[#2A597E] drop-shadow-sm text-2xl sm:text-3xl md:text-[38px] font-medium leading-snug">
              {"Vendés Bosch. Confiás en Bosch."}
              <br className="block" />
              {"Ahora también ganás con Bosch."}
            </p>

            <h1 className="mt-4 sm:mt-6 text-[#2a597e]  drop-shadow-[0_1px_0_#e1e1e1] font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[70px]">
              {"Hay motos en juego"}
            </h1>
            <h2 className="mt-0 text-[#2a597e] font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[52px]">
              {"¡y vos podés ganarte una!"}
            </h2>

            <div
              className="mt-4 sm:mt-6 h-[2px] w-12 sm:w-16 rounded bg-[#2a597e]"
              aria-hidden="true"
            />

            <p className="mt-4 sm:mt-6 text-[#2a597e] max-w-xl  text-xl sm:text-lg md:text-[27px] leading-relaxed font-medium">
              {"Cada bujía Bosch te acerca más al premio. "}
              {"Registrate y participá."}
            </p>

            <div className="mt-8 flex flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                onClick={() => handleUserType("point_of_sale")}
              >
                Soy Punto de Venta
              </Button>

              <Button
                className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                onClick={() => handleUserType("distributor")}
              >
                Soy Distribuidor
              </Button>
            </div>
          </div>
        </section>

        {/* Barra social inferior */}
        <Footer absolute={true} />
      </main>
    </>
  );
}
