"use client";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.webp";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedSection } from "@/components/ui/animated-section";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function ContactoPage() {
  const [hideTitle, setHideTitle] = useState(false);
  return (
    <ProtectedRoute>
      <main className="relative min-h-screen  flex items-center justify-center">
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

        <Header />

        {/* Tarjeta de contacto */}
        <AnimatedSection delay={0.4} className="">
          <section className="relative  h-full z-10 mx-auto flex max-w-2xl justify-center px-6 py-10 sm:py-20 pt-10 sm:pt-10">
            <div className="w-full min-w-[80vw] md:min-w-[600px] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8 ">
              {!hideTitle && (
                <AnimatedSection delay={0.6}>
                  <div className="text-left mb-4">
                    <h1 className="text-[26px] font-bold tracking-[-1px] text-[#2a597e] ">
                      Contacto
                    </h1>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection delay={0.8}>
                <ContactForm
                  onSuccess={() => setHideTitle(true)}
                  onReset={() => setHideTitle(false)}
                />
              </AnimatedSection>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </ProtectedRoute>
  );
}
