"use client";
import AuthRedirect from "@/components/AuthRedirect";
import Image from "next/image";
import backgroundFinishImage from "@/assets/FondoFinishRegister.png";
import { useRouter } from "next/navigation";

function RegisterSuccessPage() {
  const router = useRouter();
  const handleBackToForm = () => {
    router.push("/");
  };
  return (
    <AuthRedirect>
      <main className="relative min-h-screen">
        <Image
          src={backgroundFinishImage}
          alt="Fondo Registro Exitoso"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 opacity-45 mix-blend-multiply" />

        {/* Contenido centrado */}
        <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-white text-[40px] tracking-[-1.5px] md:tracking-[-3px] lg:text-[61px] font-extrabold">
            {"¡Gracias por registrarte!"}
          </h1>
          <p className="lg:mt-2 text-[#ffff] text-[28px] lg:text-[36px] tracking-[-1px] md:tracking-[-1.5px]">
            {"Iniciá sesión y comenzá a sumar chances."}
          </p>

          {/* Botón para volver al formulario */}
          <button
            onClick={handleBackToForm}
            className="mt-8 px-8 py-3 bg-[#3DADFF] text-white rounded-full font-bold tracking-[-0.5px]  transition-colors text-lg h-[70px] w-[280px] cursor-pointer"
          >
            Volver al inicio
          </button>
        </section>
      </main>
    </AuthRedirect>
  );
}

export default RegisterSuccessPage;
