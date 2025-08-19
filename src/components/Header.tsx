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
    <div className="absolute inset-x-0 top-4 sm:top-6 flex justify-between  px-2 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
      <div className="flex items-center gap-2 sm:gap-3 text-white px-3  ">
        <div
          onClick={() => router.push("/dashboard")}
          className="relative cursor-pointer w-[100px] md:w-[160px] h-[20px] md:h-[33px]"
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

      <div className="flex sm:flex-row flex-col items-end justify-end gap-0 sm:gap-3 z-20">
        <Button
          variant="outline"
          className="rounded-full border-2 border-white  bg-white  text-[#2a597e] h-10 md:h-14  w-[136px] sm:mr-3 my-3 cursor-pointer sm:my-0  text-sm md:text-base font-bold"
          asChild
        >
          <Link href="/contact-form">Contacto</Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-full bg-white  border-white lg:ml-10 text-[#2a597e]  h-10 md:h-14  w-[136px]  text-sm md:text-base font-bold cursor-pointer"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
