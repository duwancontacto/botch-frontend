"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import FormularioDistribuidor from "@/components/Register-Distribuidor/page";
import FormularioPuntoDeVenta from "@/components/Register-Punto-Venta/page";
import Image from "next/image";
import backgroundImage from "@/assets/FondoRegister.png";

type Tipo = "distribuidor" | "punto";

export default function RegistroPage() {
  const [tipo, setTipo] = useState<Tipo>("distribuidor");

  return (
    <main className="relative min-h-screen bg-white">
      {/* Encabezado decorativo con curvas */}
      <div className="relative h-40 sm:h-48 lg:h-56 ">
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
            {tipo === "distribuidor"
              ? "Registrate, cargá tus ventas"
              : "Registrate, cargá tus compras"}
            <br />
            {"¡y ya estás participando!"}
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        {/* Toggle tipo */}
        <TipoSelector tipo={tipo} onChange={setTipo} />

        {/* Formularios */}
        <div className="mt-8">
          {tipo === "distribuidor" ? (
            <FormularioDistribuidor Campo={Campo} />
          ) : (
            <FormularioPuntoDeVenta Campo={Campo} />
          )}
        </div>
      </section>
    </main>
  );
}

function TipoSelector({
  tipo,
  onChange,
}: {
  tipo: Tipo;
  onChange: (t: Tipo) => void;
}) {
  const baseBtn =
    "grid size-8 place-items-center rounded-full border-2 transition-colors";
  return (
    <div className="flex flex-wrap items-center gap-8 text-[#2a597e]">
      <label className="flex items-center gap-3 cursor-pointer">
        <span className="text-sm sm:text-base font-bold">Soy distribuidor</span>
        <button
          type="button"
          aria-pressed={tipo === "distribuidor"}
          onClick={() => onChange("distribuidor")}
          className={`${baseBtn} ${
            tipo === "distribuidor" ? "border-[#2a597e]" : "border-[#2a597e]/70"
          }`}
        >
          <span
            className={`block size-4 rounded-full ${
              tipo === "distribuidor" ? "bg-[#2a597e]" : "bg-transparent"
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
          aria-pressed={tipo === "punto"}
          onClick={() => onChange("punto")}
          className={`${baseBtn} ${
            tipo === "punto" ? "border-[#2a597e]" : "border-[#2a597e]/70"
          }`}
        >
          <span
            className={`block size-4 rounded-full ${
              tipo === "punto" ? "bg-[#2a597e]" : "bg-transparent"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
/* ---------- Utilidad: Campo estándar ---------- */
function Campo({
  id,
  label,
  type = "text",
  labelClassName,
}: {
  id: string;
  label: string;
  type?: string;
  labelClassName?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className={`text-[#2a597e] ${labelClassName || ""}`}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        className="mt-2 h-12 rounded-full  border-[#2a597e] text-[#2a597e] placeholder:text-[#2a597e]/50 focus-visible:ring-0"
      />
    </div>
  );
}
