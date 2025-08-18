import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import backgroundImage from "@/assets/FondoFinishRegister.png";
import logoImage from "@/assets/Logo.png";
import { useAuth } from "store/useAuth";

export default function SuccessDistributor({
  setIsSuccess,
}: {
  setIsSuccess: (isSuccess: boolean) => void;
}) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fondo azul marca */}

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
            <Link href="/contacto">Contacto</Link>
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

      {/* Contenido centrado */}
      <section className="relative z-10 mx-auto flex min-h-0 md:min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center mt-8 md:mt-0 ">
        <h1 className="text-white text-4xl  md:text-[60px]  font-extrabold">
          {"¡Ya estás participando"}
        </h1>
        <p className=" text-[#ffff] text-2x font-bold md:text-[36px] ">
          {"Gracias por confiar en BOSCH"}
        </p>

        <div className="mt-8">
          <Button
            className="rounded-full cursor-pointer text-lg bg-[#3dadff] text-white hover:bg-[#3dadff]/90 px-10 py-8 font-bold"
            onClick={() => setIsSuccess(false)}
          >
            Cargar mas ventas
          </Button>
        </div>
      </section>
    </main>
  );
}
