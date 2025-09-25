import { Button } from "@/components/ui/button";

import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.webp";
import { InvoiceSummary } from "@/lib/types/api-types";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { AnimatedSection } from "@/components/ui/animated-section";
import Header from "../Header";

export default function SuccessPuntoVenta({
  setIsSuccess,
  invoiceSummary,
}: {
  setIsSuccess: (isSuccess: boolean) => void;
  invoiceSummary: InvoiceSummary;
}) {
  const [isExploding, setIsExploding] = useState(false);

  // Reglas de cálculo para chances
  const reglasChances = [
    { min: 50, chances: 1 },
    { min: 100, chances: 3 },
    { min: 200, chances: 8 },
    { min: 400, chances: 20 },
  ];

  // Calcular cuántas bujías faltan para cada nivel
  const calcularNivelesConFaltantes = (totalUnits: number) => {
    return reglasChances
      .filter((nivel) => totalUnits < nivel.min) // Solo mostrar niveles que faltan
      .map((nivel) => {
        const faltantes = nivel.min - totalUnits;
        return {
          min: nivel.min,
          chances: nivel.chances,
          faltantes,
          mensaje: `Te faltan ${faltantes} bujías para obtener ${
            nivel.chances
          } chance${nivel.chances > 1 ? "s" : ""}.`,
        };
      });
  };

  useEffect(() => {
    // Activar la explosión de confeti cuando el componente se monta
    setTimeout(() => {
      setIsExploding(true);
    }, 1000);

    // Resetear después de 3 segundos para permitir múltiples explosiones
    const timer = setTimeout(() => {
      setIsExploding(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      {/* Explosión de confeti */}

      {/* HERO azul con textura y copy centrado */}
      <section className="relative ">
        {isExploding && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={200}
              width={1600}
              colors={[
                "#FF6B6B",
                "#4ECDC4",
                "#45B7D1",
                "#96CEB4",
                "#FFEAA7",
                "#DDA0DD",
                "#FFB347",
                "#87CEEB",
                "#98FB98",
                "#F0E68C",
              ]}
            />
          </div>
        )}
        <div className="absolute inset-0  ">
          <Image
            src={backgroundImage}
            alt="Fondo confirmacion"
            fill
            className="absolute inset-0 object-cover "
            priority
          />
        </div>
        <AnimatedSection delay={0.2}>
          <Header />
        </AnimatedSection>
        {/* Mensaje principal */}
        <div className="relative min-h-[650px] z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-10 text-center sm:py-20">
          <AnimatedSection delay={0.4}>
            <h1 className="text-white text-4xl md:text-[60px] font-bold tracking-[-1px] md:tracking-[-1.5px]">
              {"Ya estás participando"}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className=" text-white text-2xl font-bold md:text-[36px] tracking-[-1px] md:tracking-[-1.5px]">
              {"Gracias por confiar en BOSCH"}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className="mt-6 text-white tracking-[-0.5px] text-lg md:text-[20px] leading-[20px] md:leading-[28px]">
              {"Cuantas más bujías compres, ¡más chances sumás! "}
              <br></br>
              <span className="font-bold text-lg md:text-[20px]">
                {"Seguí cargando tus compras y aumentá tus posibilidades."}
              </span>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <div className="mt-8">
              <Button
                className="rounded-full h-12.5 md:h-[70px] cursor-pointer text-[12px] md:text-lg bg-[#3dadff] text-white hover:bg-[#3dadff]/90 px-8  font-bold tracking-[-0.5px]"
                onClick={() => setIsSuccess(false)}
              >
                {"Cargar más facturas"}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Franja de contadores (azul claro) */}
      <AnimatedSection delay={0.8}>
        <section className="bg-[#3dadff]/15 p-6 py-4 md:py-10">
          <div className="mx-auto max-w-6xl block md:items-center py-2 md:px-6 md:py-6 md:flex md:justify-center px-3">
            <h2 className="text-center sm:text-center text-[#2a597e] text-md mb-2 md:mb-0 md:text-[36px] mr-0 md:mr-10 font-bold tracking-[-1px] md:tracking-[-1.5px]">
              {"Ya llevás cargadas"}
            </h2>
            <div className="flex items-center justify-center gap-2 mx-3 md:mx-10">
              <span className="text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                {invoiceSummary?.totalUnits || 0}
              </span>
              <span className="text-[#2a597e] font-bold tracking-[-0.5px] text-[10px] md:text-[16px]">
                {"bujías"}
              </span>
              <span className="mx-4 md:mx-8 text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                =
              </span>
              <span className="text-2xl md:text-5xl font-bold tracking-[-1px] md:tracking-[-1.5px] text-[#2a597e]">
                {invoiceSummary?.totalChances || 0}
              </span>
              <span className="text-[#2a597e] font-bold tracking-[-0.5px] text-[10px] md:text-[16px]">
                {"chances"}
              </span>
            </div>
          </div>

          {/* Sección de "Te faltan X bujías" */}
          {invoiceSummary && (
            <div className="flex justify-center ">
              <ul className="space-y-2 md:space-y-3">
                {calcularNivelesConFaltantes(
                  invoiceSummary.totalUnits || 0
                ).map((nivel, index) => (
                  <AnimatedSection
                    key={index}
                    delay={0.5 + index * 0.1}
                    className="text-left"
                  >
                    <li className="text-[#2a597e] text-sm md:text-lg font-medium list-disc list-inside">
                      {nivel.mensaje}
                    </li>
                  </AnimatedSection>
                ))}
              </ul>
            </div>
          )}
        </section>
      </AnimatedSection>
      {/* Bloque gris con CTA catálogo */}
      <AnimatedSection delay={0.8}>
        <section className="bg-[#6d6d6d] text-center flex flex-col items-center justify-center min-h-[330px] relative overflow-hidden">
          {/* Video de fondo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/botch-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay para mejorar la legibilidad del texto */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Contenido del section */}
          <div className="relative z-20">
            <h4 className="text-white text-xl md:text-[36px] font-bold tracking-[-1px] md:tracking-[-1.5px]">
              {"Más compras, más chances. Sin vueltas."}
            </h4>
            <div className="mt-6">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer tracking-[-0.5px] h-12.5 md:h-[70px] w-[150px] md:w-[200px] bg-white text-[#2a597e] font-bold text-[14px] md:text-[18px] border-transparent hover:bg-white/90 px-6"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Catalogo-Bujias-Bosch.pdf";
                  link.download = "Catalogo-Bujias-Bosch.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                {"Ver catálogo"}
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
      <Footer />
    </main>
  );
}
