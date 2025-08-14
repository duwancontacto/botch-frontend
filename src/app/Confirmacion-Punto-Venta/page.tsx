import Link from "next/link";
import {Button} from "@/components/ui/button";
import logoImage from "@/assets/Logo.png";

import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/Fondo-Confirmacion.png";

export default function ParticipandoPVPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO azul con textura y copy centrado */}
      <section className="relative ">
        <div className="absolute inset-0 z-10 ">
          <Image
            src={backgroundImage}
            alt="Fondo confirmacion"
            fill
            className="absolute inset-0 object-cover "
            priority
          />
        </div>
        <div className="relative z-10 mx-auto block md:flex max-w-6xl md:items-start md:justify-between gap-6 px-6 pt-6">
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
          <div className="ml-auto flex items-center justify-content-between mt-5 md:mt-0 ">
            <Button
              variant="outline"
              className="rounded-full bg-white/90 border-transparent text-[#2a597e] hover:bg-white h-14  w-[136px] mx-3 md:mx-10 my-3 cursor-pointer  font-bold"
              asChild
            >
              <Link href="/Contacto">Contacto</Link>
            </Button>
            <Button className="rounded-full bg-white/90 border-transparent text-[#2a597e] hover:bg-white/30 h-14  w-[136px]  my-3 cursor-pointer  font-bold ">
              <Link href="/.">{" Cerrar sesión"}</Link>{" "}
            </Button>
          </div>
        </div>
        {/* Mensaje principal */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-10 text-center sm:py-20">
          <h1 className="text-white text-xl md:text-[68px] font-extrabold">
            {"Ya estás participando"}
          </h1>
          <p className="mt-3 text-white/90 text-md md:text-[36px]">
            {"Gracias por confiar en BOSCH"}
          </p>

          <p className="mt-4 text-white/90 text-sm md:text-[20px]">
            {"Cuantas más bujías compres, ¡más chances sumás! "}
            <br></br>
            <span className="font-bold text-sm md:text-[20px]">
              {"Seguí cargando tus compras y aumentá tus posibilidades."}
            </span>
          </p>

          <div className="mt-8">
            <Button
              className="rounded-full bg-[#3dadff] text-white hover:bg-[#3dadff]/90 px-8 py-6 font-bold"
              asChild
            >
              <Link href="/Data-Punto-Venta">{"Cargar más facturas"}</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Franja de contadores (azul claro) */}
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
      {/* Bloque gris con CTA catálogo */}
      <section className="bg-[#6d6d6d]   text-center p-20 md:p-10 ">
        <div className="mx-auto  w-full ">
          <h3 className="text-white text-xl sm:text-3xl font-extrabold">
            {"Más compras, más chances. Sin vueltas."}
          </h3>
          <div className="mt-6">
            <Button
              variant="outline"
              className="rounded-full bg-white text-[#2a597e] border-transparent font-bold hover:bg-white/90 px-6"
            >
              {"Ver catálogo"}
            </Button>
          </div>
        </div>
      </section>{" "}
      <Footer />
    </main>
  );
}
