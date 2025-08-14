import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";

export default function GraciasPage() {
  return (
    <main className="relative ">
      {/* Fondo azul marca */}
      <div className="absolute inset-0 " aria-hidden="true" />

      <Image
        src={backgroundImage}
        alt="Fondo Login Distribuidor"
        fill
        className="absolute inset-0 object-cover "
        priority
      />
      <div className="absolute inset-0 opacity-45 mix-blend-multiply" />

      {/* Contenido centrado */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center ">
        <h1 className="text-white text-2xl  lg:text-[51px] font-extrabold">
          {"¡Gracias por registrarte!"}
        </h1>
        <p className="mt-6 text-[#ffff] text-md md:text-[36px] sm:text-2xl">
          {"Iniciá sesión y comenzá a sumar chances."}
        </p>
      </section>
    </main>
  );
}
