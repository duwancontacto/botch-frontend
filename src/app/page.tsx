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
      <main className="relative min-h-screen overflow-hidden pb-20 md:pb-0 ">
        {/* Capa 1: Imagen de fondo */}
        <Image
          src={backgroundImage}
          alt="Fondo principal"
          fill
          className="absolute inset-0  object-cover hidden md:block"
          priority
          quality={100}
        />
        <Image
          src={backgroundImageMobile}
          alt="Fondo principal"
          fill
          className="absolute inset-0 object-cover  block md:hidden"
          priority
          quality={100}
        />

        {/* Header / Logo */}
        <AnimatedSection delay={0.2}>
          <header className=" relative z-10  pt-10 md:pt-16 px-8 lg:px-20 lg:pt-16 ">
            <div className="flex items-center gap-2 sm:gap-3 text-white px-3  ">
              <div className="relative w-[120px] lg:w-[211px] h-[37px] lg:h-[66px]">
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
        <section className=" min-h-[700px] relative z-10 px-4 lg:px-0 flex items-start md:items-center pt-30 md:pt-0  h-[85vh] md:mb-0">
          <div className=" mx-4 md:mx-10  lg:mx-24  z-10 ">
            <AnimatedSection delay={0.1}>
              <p className="text-[#0D385E] drop-shadow-sm text-[15px] md:text-[30px] font-medium leading-[18px] md:leading-[38px] tracking-[-1px] md:tracking-[-2px]">
                {"Vendés Bosch. Confiás en Bosch."}
                <br className="block" />
                {"Ahora también ganás con Bosch."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h1
                style={{ letterSpacing: "-2px" }}
                className="mt-4 sm:mt-6 text-[#0D385E] tracking-[-1.5px] md:tracking-[-4.5px] drop-shadow-[0_1px_0_#e1e1e1] font-extrabold leading-[40px] md:leading-[80px] text-[35px]  md:text-[77px]"
              >
                {"Hay motos en juego"}
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="mt-0 text-[#0D385E] tracking-[-1.5px] md:tracking-[-3px] font-extrabold leading-[28px] md:leading-[60px] text-[23px] md:text-[50px] mb-[120px] md:mb-10">
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
              <p
                style={{ letterSpacing: "-1.3px" }}
                className="mt-4 sm:mt-6 text-[#0D385E] max-w-[200px] md:max-w-md  text-[17px] md:text-[22px] md:leading-[27px] leading-[20px] font-medium"
              >
                {"Cada bujía Bosch te acerca más al premio. "}
                {"Registrate y participá."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="mt-4 flex flex-col max-w-[220px] md:flex-row items-start md:items-center gap-3 sm:gap-4 pt-4 md:pt-5">
                <Button
                  className="rounded-full cursor-pointer bg-[#2a597e] text-white font-bold hover:bg-[#2a597e]/90 px-6 h-12.5 text-[11px] md:text-[13px]  w-auto md:w-full sm:w-auto"
                  onClick={() => handleUserType("point_of_sale")}
                >
                  Soy Punto de Venta
                </Button>

                <Button
                  className="rounded-full cursor-pointer bg-[#2a597e] text-white font-bold hover:bg-[#2a597e]/90 px-6 h-12.5 text-[11px] md:text-[13px] w-auto md:w-full sm:w-auto"
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
