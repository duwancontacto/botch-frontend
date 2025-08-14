"use client";

import Link from "next/link";
import logoImage from "@/assets/Logo.png";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
export default function ContactoPage() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo azul + textura */}
      <div className="absolute inset-0 bg-[#2a597e]" aria-hidden="true" />

      <Image
        src={backgroundImage}
        alt="Fondo Login Distribuidor"
        fill
        className="absolute inset-0 object-cover "
        priority
      />
      <div className="absolute inset-0 opacity-45 mix-blend-multiply" />

      <header className="relative z-10 mx-auto block  md:flex max-w-6xl md:items-center md:justify-between  px-6 pt-6">
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
        <div className="ml-auto flex items-center gap-3 mt-6 md:mt-0">
          <Button
            variant="outline"
            className="rounded-full bg-white/90 border-transparent text-[#2a597e] hover:bg-white h-14  w-[136px] mx-3 md:mx-0 my-3 cursor-pointer  font-bold "
            asChild
          >
            <Link href="/contacto">Contacto</Link>
          </Button>
          <Button className="rounded-full bg-white/90 text-[#2a597e] hover:bg-white/30 h-14  w-[136px] mx-3 md:mx-10 my-3 cursor-pointer  font-bold">
            <Link href="/."> Cerrar sesión</Link>
          </Button>
        </div>
      </header>

      {/* Tarjeta de contacto */}
      <section className="relative z-10 mx-auto flex max-w-2xl justify-center px-6 py-10 sm:py-14">
        <div className="w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
          <h1 className="text-2xl font-extrabold text-[#2a597e]">Contacto</h1>

          <form className="mt-6 space-y-6 text-[#2a597e]">
            <div>
              <Label htmlFor="nombre" className=" text-sm md:text-[17px]">
                Nombre y apellido
              </Label>
              <Input
                id="nombre"
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e]  focus-visible:ring-0 fon"
              />
            </div>

            <div>
              <Label htmlFor="mail" className=" text-sm md:text-[17px]">
                Mail
              </Label>
              <Input
                id="mail"
                type="email"
                className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>

            <div>
              <Label htmlFor="mensaje" className=" text-sm md:text-[17px]">
                Mensaje
              </Label>
              <Textarea
                id="mensaje"
                rows={6}
                className="mt-2 rounded-2xl  border-[#2a597e] text-[#2a597e] focus-visible:ring-0"
              />
            </div>

            <div className="pt-2">
              <Button className="rounded-full bg-[#2a597e] px-8 py-6 text-white hover:bg-[#2a597e]/90 font-bold">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
