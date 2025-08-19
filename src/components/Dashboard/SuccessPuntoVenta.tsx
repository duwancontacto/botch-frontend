import Link from "next/link";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/Logo.png";

import Footer from "@/components/Footer";
import Image from "next/image";
import backgroundImage from "@/assets/Fondo-Confirmacion.png";
import { useAuth } from "store/useAuth";
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
  const { logout } = useAuth();
  const [isExploding, setIsExploding] = useState(false);

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

  const handleLogout = () => {
    logout();
  };

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
            <h1 className="text-white text-4xl md:text-[60px] font-extrabold">
              {"Ya estás participando"}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className=" text-white text-2xl font-bold md:text-[36px]">
              {"Gracias por confiar en BOSCH"}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className="mt-6 text-white text-lg md:text-[20px]">
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
                className="rounded-full cursor-pointer text-lg bg-[#3dadff] text-white hover:bg-[#3dadff]/90 px-10 py-8 font-bold"
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
        <section className="bg-[#3dadff]/15 p-6 py-10 ">
          <div className="mx-auto  max-w-6xl  block md:items-center py-2 md:px-6 md:py-6 md:flex  md:justify-center px-3 ">
            <h2 className="text-center sm:text-center text-[#2a597e] text-2xl mb-4 md:mb-0  md:text-[36px] mr-0 md:mr-10 font-extrabold">
              {"Ya llevás cargadas"}
            </h2>
            <div className="flex items-center justify-center gap-2 mx-3 md:mx-10">
              <span className=" text-md md:text-5xl font-extrabold text-[#2a597e]">
                {invoiceSummary?.totalUnits || 0}
              </span>
              <span className="text-[#2a597e] font-bold  text-[16px]">
                {"bujías"}
              </span>
              <span className="mx-8 text-md md:text-5xl font-extrabold text-[#2a597e]">
                =
              </span>
              <span className="text-md md:text-5xl font-extrabold text-[#2a597e]">
                {invoiceSummary?.totalChances || 0}
              </span>
              <span className="text-[#2a597e] text-[16px] font-bold">
                {"chances"}
              </span>
            </div>
            <div />
          </div>
        </section>
      </AnimatedSection>
      {/* Bloque gris con CTA catálogo */}
      <AnimatedSection delay={0.8}>
        <section className="bg-[#6d6d6d]  text-center flex flex-col items-center justify-center   min-h-[300px]">
          <h4 className="text-white text-xl md:text-[36px]  font-extrabold">
            {"Más compras, más chances. Sin vueltas."}
          </h4>
          <div className="mt-6">
            <Button
              variant="outline"
              className="rounded-full h-12 md:h-[70px] w-[150px] md:w-[200px] bg-white text-[#2a597e] font-bold  text-[14px] md:text-[18px] border-transparent hover:bg-white/90 px-6"
            >
              {"Ver catálogo"}
            </Button>
          </div>
        </section>
      </AnimatedSection>
      <Footer />
    </main>
  );
}
