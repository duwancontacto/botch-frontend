"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/backgroundHome.png";
import backgroundImageMobile from "@/assets/backgroundHomeMobile.webp";
import logoImage from "@/assets/Logo.png";
import { UserType, useUserType } from "store/useUserType";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Page() {
  const router = useRouter();
  const { setUserType } = useUserType();

  const handleUserType = (userType: UserType) => {
    setUserType(userType);
    router.push("/login");
  };

  return (
    <AuthRedirect>
      <main className="relative min-h-screen overflow-hidden pb-20">
        {/* Capa 1: Imagen de fondo */}
        <Image
          src={backgroundImage}
          alt="Fondo principal"
          fill
          className="absolute inset-0 object-cover hidden md:block"
          priority
          quality={100}
        />
        <Image
          src={backgroundImageMobile}
          alt="Fondo principal"
          fill
          className="absolute inset-0 object-cover block md:hidden"
          priority
          quality={100}
        />

        {/* Header / Logo */}
        <AnimatedSection delay={0.2}>
          <header className=" relative z-10  pt-10 md:pt-16 sm:px-6 md:px-8 lg:px-20 lg:pt-16 ">
            <div className="flex items-center gap-2 sm:gap-3 text-white px-3  ">
              <div className="relative w-[120px] md:w-[160px]  h-[24px] md:h-[33px]">
                <Image
                  src={logoImage}
                  alt="Logo Bosch"
                  fill
                  className="object-cover "
                  priority
                  quality={100}
                />
              </div>
            </div>
          </header>
        </AnimatedSection>
        {/* Contenido principal */}
        <section className="relative z-10 px-4 lg:px-0 flex items-start md:items-center pt-34 md:pt-16  h-[85vh] mb-16 md:mb-0">
          <div className=" sm:mx-0 md:mx-0  lg:mx-24  z-10 ">
            <AnimatedSection delay={0.1}>
              <p className="text-[#0D385E] drop-shadow-sm text-[15px] sm:text-xl md:text-[38px] font-medium leading-[20px] md:leading-[38px]">
                {"Vendés Bosch. Confiás en Bosch."}
                <br className="block" />
                {"Ahora también ganás con Bosch."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h1 className="mt-4 sm:mt-6 text-[#0D385E]  drop-shadow-[0_1px_0_#e1e1e1] font-extrabold leading-[30px] text-3xl sm:text-4xl md:text-6xl lg:text-[70px]">
                {"Hay motos en juego"}
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="mt-0 text-[#0D385E] font-extrabold leading-tight text-2xl  md:text-4xl lg:text-[52px] mb-[120px]">
                {"¡y vos podés ganarte una!"}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div
                className=" sm:mt-6 h-[2px] w-12 sm:w-16 rounded bg-[#2a597e] mt-4"
                aria-hidden="true"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <p className="mt-4 sm:mt-6 text-[#0D385E] max-w-[220px] md:max-w-xl  text-xl sm:text-lg md:text-[27px] leading-[26px] font-medium">
                {"Cada bujía Bosch te acerca más al premio. "}
                {"Registrate y participá."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="mt-4 flex flex-col max-w-[220px] md:flex-row items-start md:items-center gap-3 sm:gap-4 pt-4 md:pt-5">
                <Button
                  className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-[12px] md:text-base w-auto md:w-full sm:w-auto"
                  onClick={() => handleUserType("point_of_sale")}
                >
                  Soy Punto de Venta
                </Button>

                <Button
                  className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-[12px] md:text-base w-auto md:w-full sm:w-auto"
                  onClick={() => handleUserType("distributor")}
                >
                  Soy Distribuidor
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Barra social inferior */}

        <Footer absolute={true} />
      </main>
    </AuthRedirect>
  );
}
