import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "store/useAuth";
import logoImage from "@/assets/Logo.png";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="absolute inset-x-0 top-2 md:top-6 flex justify-between  px-2 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
      <div className="flex items-center gap-2 sm:gap-3 text-white  px-3  ">
        <div
          onClick={() => router.push("/dashboard")}
          className="relative cursor-pointer w-[100px] lg:w-[160px] h-[20px] lg:h-[33px]"
        >
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

      <div className="flex flex-row  items-center justify-end gap-0 sm:gap-3 z-20">
        <Button
          variant="outline"
          className="rounded-full border-2 border-white  bg-white  text-[#2a597e] h-8 md:h-15  px-4 md:px-8  my-3 cursor-pointer sm:my-0  text-[10px] md:text-sm font-bold"
          asChild
        >
          <Link href="/contact-form">Contacto</Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-full bg-white  border-white ml-4 lg:ml-10 text-[#2a597e]  h-8 md:h-15  px-4 md:px-8  text-[10px] md:text-sm  font-bold cursor-pointer"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
