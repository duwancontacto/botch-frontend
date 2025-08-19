"use client";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedSection } from "@/components/ui/animated-section";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ContactoPage() {
  return (
    <ProtectedRoute>
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
          <Header />
        </AnimatedSection>

        {/* Tarjeta de contacto */}
        <AnimatedSection delay={0.4} className="pt-[100px]">
          <section className="relative  z-10 mx-auto flex max-w-2xl justify-center px-6 py-10 sm:py-20">
            <div className="w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8 ">
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
    </ProtectedRoute>
  );
}
