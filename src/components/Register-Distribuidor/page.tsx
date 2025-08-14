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

export default function FormularioDistribuidor({
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
    <form className="space-y-7 text-[#2a597e]">
      {/* Distribuidor (Select) */}
      <div className="max-w-3xl">
        <Label className="text-[#2a597e] font-bold">Distribuidor</Label>
        <Select>
          <SelectTrigger className="mt-2 h-12 rounded-full   border-[#2a597e] text-[#2a597e]">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent className="text-[#2a597e] bg-[#FFF] border-0 cursor-pointer">
            <SelectItem value="dist1">Distribuidor 1</SelectItem>
            <SelectItem value="dist2">Distribuidor 2</SelectItem>
            <SelectItem value="dist3">Distribuidor 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nombre y Mail */}
      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          label="Nombre y apellido del responsable*"
          id="nombre"
          labelClassName="font-bold"
        />
        <Campo
          label="Mail*"
          id="mail"
          type="email"
          labelClassName="font-bold"
        />
      </div>

      {/* Passwords */}
      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          label="Contraseña*"
          id="pass"
          type="password"
          labelClassName="font-bold"
        />
        <Campo
          label="Repetir contraseña*"
          id="pass2"
          type="password"
          labelClassName="font-bold"
        />
      </div>

      <div className="pt-2">
        <Button className="rounded-full bg-[#2a597e] font-semibold px-15 py-6 text-white hover:bg-[#2a597e]/90">
          <Link href="/Finish-Register">Enviar</Link>
        </Button>
      </div>
    </form>
  );
}
