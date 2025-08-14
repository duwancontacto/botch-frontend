import {Button} from "@/components/ui/button";
import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/backgroundHome.png";
import logoImage from "@/assets/Logo.png";
import Link from "next/link";

export default function Page() {
  return (
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
          <h6 className="text-2xl z-10 md:text-2xl lg:text-3xl font-extrabold tracking-wide ">
            BOSCH
          </h6>
        </div>
      </header>
      {/* Contenido principal */}
      <section className="relative z-10 px-6 sm:px-6 md:px-8 lg:px-5  ">
        <div className=" sm:mx-0 md:mx-0 lg:mx-24 mt-26 md:mt-36 z-10">
          <p className="text-[#2A597E] drop-shadow-sm text-lg sm:text-xl md:text-[38px] font-medium leading-snug">
            {"Vendés Bosch. Confiás en Bosch."}
            <br className="hidden sm:block" />
            {"Ahora también ganás con Bosch."}
          </p>

          <h1 className="mt-4 sm:mt-6 text-[#2a597e]  drop-shadow-[0_1px_0_#e1e1e1] font-extrabold leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-[70px]">
            {"Hay motos en juego"}
          </h1>
          <h2 className="mt-2 text-[#2a597e] font-extrabold leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-[52px]">
            {"¡y vos podés ganarte una!"}
          </h2>

          {/* Línea divisoria */}
          <div
            className="mt-4 sm:mt-6 h-[2px] w-12 sm:w-16 rounded bg-[#2a597e]"
            aria-hidden="true"
          />

          <p className="mt-4 sm:mt-6 text-[#2a597e] max-w-xl  text-base sm:text-lg md:text-[27px] leading-relaxed font-medium">
            {"Cada bujía Bosch te acerca más al premio. "}
            {"Registrate y participá."}
          </p>

          {/* CTAs */}
          <div className=" mt-4 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
              <Link href="/Login-Punto-Venta"> {"Soy Punto de Venta"}</Link>
            </Button>

            <Button className="rounded-full cursor-pointer bg-[#2a597e] text-white font-semibold hover:bg-[#2a597e]/90 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
              <Link href="/Login-Distribuidor">{"Soy Distribuidor"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Moto + sombra a la derecha */}
      <div className="pointer-events-none absolute inset-0">
        {/* Sombra del suelo */}
        <div
          className="absolute right-8 bottom-24 hidden rounded-[999px] blur-2xl md:block"
          style={{
            width: "48vw",
            height: "10vh",
            background:
              "radial-gradient(60% 100% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0) 100%)",
            transform: "skewX(-6deg)",
            opacity: 0.85,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Barra social inferior */}
      <Footer />
    </main>
  );
}
