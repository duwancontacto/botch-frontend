"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";

export default function BoschLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 select-none">
      <Image src={Logo} alt="Bosch" priority className="h-8 w-auto" />
      <span className="sr-only">Inicio</span>
    </Link>
  );
}
