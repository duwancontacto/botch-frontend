import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
import logoImage from "@/assets/Logo.png";
import { useAuth } from "store/useAuth";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { AnimatedSection } from "@/components/ui/animated-section";

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
        <div className="absolute inset-x-0 top-4 sm:top-6 block md:flex md:justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
          <div className="flex items-center gap-2 sm:gap-3 text-white px-3  ">
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
          <div className="ml-auto flex items-center justify-content-between mt-5 md:mt-0 ">
            <Button
              variant="outline"
              className="rounded-full bg-white/90 border-transparent text-[#2a597e] hover:bg-white h-14  w-[136px] mx-3 md:mx-10 my-3 cursor-pointer  font-bold"
              asChild
            >
              <Link href="/contact-form">Contacto</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-white  border-white lg:ml-10 text-[#2a597e]  h-14  w-[136px]  text-sm md:text-base font-bold cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
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
