"use client";

import Link from "next/link";
import {Home} from "lucide-react";

export default function SocialBar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/80 backdrop-blur shadow-md border border-black/5 p-1">
      <nav className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className="grid size-10 place-items-center rounded-full hover:bg-black/5 text-[#2a597e]"
          title="Inicio"
        >
          <Home className="size-5" />
        </Link>
      </nav>
    </div>
  );
}
