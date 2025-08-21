import { Button } from "@/components/ui/button";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.webp";
import { useAuth } from "store/useAuth";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { AnimatedSection } from "@/components/ui/animated-section";
import Header from "../Header";

export default function SuccessDistributor({
  setIsSuccess,
}: {
  setIsSuccess: (isSuccess: boolean) => void;
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
    <main className="relative h-[100vh]  overflow-hidden">
      {/* Explosión de confeti */}
      {isExploding && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
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

      {/* Fondo azul marca */}
      <Image
        src={backgroundImage}
        alt="Fondo Login Distribuidor"
        fill
        className="absolute inset-0 object-cover "
        priority
      />

      <AnimatedSection delay={0.2}>
        <Header />
      </AnimatedSection>

      {/* Contenido centrado */}
      <section className="relative  z-10 mx-auto flex min-h-0 h-[100vh] max-w-5xl flex-col items-center justify-center px-6 text-center mt-8 md:mt-0 ">
        <AnimatedSection delay={0.5}>
          <h1 className="text-white text-4xl  md:text-[60px]  font-extrabold">
            {"¡Ya estás participando"}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.8}>
          <p className=" text-[#ffff] text-2x font-bold md:text-[36px] ">
            {"Gracias por confiar en BOSCH"}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={1.2}>
          <div className="mt-8 space-y-4">
            <Button
              className="rounded-full cursor-pointer text-lg bg-[#3dadff] text-white hover:bg-[#3dadff]/90 px-10 py-8 font-bold"
              onClick={() => setIsSuccess(false)}
            >
              Cargar mas ventas
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
