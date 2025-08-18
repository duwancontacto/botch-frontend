"use client";

import { useState } from "react";
import FormularioDistribuidor from "@/components/Register-Distribuidor/page";
import FormularioPuntoDeVenta from "@/components/Register-Punto-Venta/page";
import Image from "next/image";
import backgroundImage from "@/assets/FondoRegister.png";
import backgroundFinishImage from "@/assets/FondoFinishRegister.png";
import { UserType, useUserType } from "store/useUserType";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

export default function RegisterPage() {
  const router = useRouter();
  const { userType } = useUserType();
  const [tipo, setTipo] = useState<UserType>(userType);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  // Función para manejar el registro exitoso
  const handleRegistrationSuccess = () => {
    setIsRegistrationComplete(true);
  };

  // Función para volver al formulario
  const handleBackToForm = () => {
    setIsRegistrationComplete(false);
    router.push("/");
  };

  // Si el registro está completo, mostrar la pantalla de éxito
  if (isRegistrationComplete) {
    return (
      <>
        <AuthRedirect />
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
            <h1 className="text-white text-[40px] lg:text-[61px] font-extrabold">
              {"¡Gracias por registrarte!"}
            </h1>
            <p className="lg:mt-6 text-[#ffff] text-[28px] lg:text-[36px]">
              {"Iniciá sesión y comenzá a sumar chances."}
            </p>

            {/* Botón para volver al formulario */}
            <button
              onClick={handleBackToForm}
              className="mt-8 px-8 py-3 bg-[#3DADFF] text-white rounded-full font-semibold  transition-colors text-lg h-[70px] w-[280px] cursor-pointer"
            >
              Volver al inicio
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <AuthRedirect />
      <main className="relative min-h-screen  bg-white">
        {/* Decorative header with curves */}
        <div className="relative   h-40 sm:h-48 lg:h-56   min-h-[330px]">
          <div className="absolute inset-0 bg-[#2a597e]" />
          <Image
            src={backgroundImage}
            alt="Fondo Login Distribuidor"
            fill
            className="absolute inset-0 object-cover "
            priority
          />
          <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center">
            <h1 className="text-[#2a597e] text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {tipo === "distributor"
                ? "Registrate, cargá tus ventas"
                : "Registrate, cargá tus compras"}
              <br />
              {"¡y ya estás participando!"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          {/* Type toggle */}
          <TypeSelector tipo={tipo} onChange={setTipo} />

          {/* Forms */}
          <div className="mt-8">
            {tipo === "distributor" ? (
              <FormularioDistribuidor
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            ) : (
              <FormularioPuntoDeVenta
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function TypeSelector({
  tipo,
  onChange,
}: {
  tipo: UserType;
  onChange: (t: UserType) => void;
}) {
  const baseBtn =
    "grid size-8 place-items-center rounded-full border-2 transition-colors";
  return (
    <div className="flex flex-wrap items-center gap-8 text-[#2a597e]">
      <label className="flex items-center gap-3 cursor-pointer">
        <span className="text-sm sm:text-base font-bold">Soy distribuidor</span>
        <button
          type="button"
          aria-pressed={tipo === "distributor"}
          onClick={() => onChange("distributor")}
          className={`${baseBtn} ${
            tipo === "distributor" ? "border-[#2a597e]" : "border-[#2a597e]/70"
          }`}
        >
          <span
            className={`block size-4 rounded-full ${
              tipo === "distributor" ? "bg-[#2a597e]" : "bg-transparent"
            }`}
          />
        </button>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <span className="text-sm sm:text-base font-bold">
          Soy punto de venta
        </span>
        <button
          type="button"
          aria-pressed={tipo === "point_of_sale"}
          onClick={() => onChange("point_of_sale")}
          className={`${baseBtn} ${
            tipo === "point_of_sale"
              ? "border-[#2a597e]"
              : "border-[#2a597e]/70"
          }`}
        >
          <span
            className={`block size-4 rounded-full ${
              tipo === "point_of_sale" ? "bg-[#2a597e]" : "bg-transparent"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
