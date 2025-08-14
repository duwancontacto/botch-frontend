"use client";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function FormularioPuntoDeVenta({
  Campo,
}: {
  Campo: React.ComponentType<{
    id: string;
    label: string;
    type?: string;
    labelClassName?: string;
  }>;
}) {
  return (
    <form className="space-y-7 text-[#2a597e] ">
      {/* Dos columnas: Nombre y apellido / Nombre fantasía */}
      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          label="Nombre y apellido*  "
          id="pv-nombre"
          labelClassName="font-bold"
        />
        <Campo
          label="Nombre fantasía*"
          id="pv-fantasia"
          labelClassName="font-bold"
        />
      </div>

      {/* Razón social / CUIT */}
      <div className="grid gap-6 md:grid-cols-2 ">
        <Campo label="Razón social*" id="pv-razon" labelClassName="font-bold" />
        <Campo label="CUIT*" id="pv-cuit" labelClassName="font-bold" />
      </div>

      {/* Distribuidor habitual (Select) */}
      <div>
        <Label htmlFor="pv-dist" className="text-[#2a597e] font-bold">
          Distribuidor habitual
        </Label>
        <Select>
          <SelectTrigger
            id="pv-dist"
            className="mt-2 h-12 rounded-full border-1 border-[#2a597e] text-[#2a597e]"
          >
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent className="text-[#2a597e] bg-[#FFF] border-0 cursor-pointer">
            <SelectItem value="dist1">Distribuidor 1</SelectItem>
            <SelectItem value="dist2">Distribuidor 2</SelectItem>
            <SelectItem value="dist3">Distribuidor 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Teléfono / Mail */}
      <div className="grid gap-6 md:grid-cols-2">
        <Campo label="Teléfono" id="pv-telefono" labelClassName="font-bold" />
        <Campo
          label="Mail*"
          id="pv-mail"
          type="email"
          labelClassName="font-bold"
        />
      </div>

      {/* Dirección / Localidad / Provincia */}
      <div className="grid gap-6 md:grid-cols-3">
        <Campo label="Dirección" id="pv-direccion" labelClassName="font-bold" />
        <Campo label="Localidad" id="pv-localidad" labelClassName="font-bold" />
        <Campo label="Provincia" id="pv-provincia" labelClassName="font-bold" />
      </div>

      {/* Passwords */}
      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          label="Contraseña*"
          id="pv-pass"
          type="password"
          labelClassName="font-bold"
        />
        <Campo
          label="Repetir contraseña*"
          id="pv-pass2"
          type="password"
          labelClassName="font-bold"
        />
      </div>

      <div className="pt-2">
        <Button className="rounded-full bg-[#2a597e] px-15 py-6 text-white hover:bg-[#2a597e]/90 font-semibold">
          <Link href="/Finish-Register">Enviar</Link>
        </Button>
      </div>
    </form>
  );
}
