import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
import logoImage from "@/assets/Logo.png";

export default function ConfirmacionDistribuidorPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fondo azul marca */}
      <div className="absolute inset-0 bg-[#2a597e]" aria-hidden="true" />

      <Image
        src={backgroundImage}
        alt="Fondo Login Distribuidor"
        fill
        className="absolute inset-0 object-cover "
        priority
      />
      <div className="absolute inset-0 opacity-45 mix-blend-multiply" />

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

      {/* Contenido centrado */}
      <section className="relative z-10 mx-auto flex min-h-0 md:min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center mt-8 md:mt-0 ">
        <h1 className="text-white text-4xl  md:text-[65px]  font-extrabold">
          {"¡Ya estás participando"}
        </h1>
        <p className="mt-6 text-[#ffff] text-2xl md:text-[36px] ">
          {"Gracias por confiar en BOSCH"}
        </p>

        <div className="mt-10">
          <Button
            asChild
            className="rounded-full bg-[#3DADFF] text-white hover:bg-white/30 px-8 py-6 text-base"
          >
            <Link href="/Data-Distribuidor">{"Cargar mas ventas"}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
