import Link from "next/link";
import logoImage from "@/assets/Logo.png";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedSection } from "@/components/ui/animated-section";

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

      <AnimatedSection delay={0.2}>
        <header className="relative z-10 mx-auto block md:flex max-w-6xl md:items-center md:justify-between px-6 pt-6">
          <div className="flex items-center gap-2 sm:gap-3 text-white px-3">
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
          <div className="ml-auto flex items-center gap-3 mt-6 md:mt-0">
            <Link
              href="/contacto"
              className="rounded-full bg-white/90 border-transparent text-[#2a597e] hover:bg-white h-14 w-[136px] mx-3 md:mx-0 my-3 cursor-pointer font-bold flex items-center justify-center"
            >
              Contacto
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white/90 text-[#2a597e] hover:bg-white/30 h-14 w-[136px] mx-3 md:mx-10 my-3 cursor-pointer font-bold flex items-center justify-center"
            >
              Cerrar sesión
            </Link>
          </div>
        </header>
      </AnimatedSection>

      {/* Tarjeta de contacto */}
      <AnimatedSection delay={0.4}>
        <section className="relative z-10 mx-auto flex max-w-2xl justify-center px-6 py-10 sm:py-14">
          <div className="w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
            <AnimatedSection delay={0.6}>
              <div className="text-left mb-8">
                <h1 className="text-3xl font-extrabold text-[#2a597e] mb-2">
                  Contacto
                </h1>
                <p className="text-gray-600 text-lg">
                  ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.8}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
