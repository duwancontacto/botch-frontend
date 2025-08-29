import LogoFacebook from "@/assets/Logo-facebook.png";
import Image from "next/image";
import LogoInstagram from "@/assets/Logo-Instragam.png";
import LogoWeb from "@/assets/web.png";
export default function Footer({
  absolute,
  className,
}: {
  absolute?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${
        absolute ? "fixed" : "relative"
      } inset-x-0 bottom-0 z-20 bg-[#2a597e] p-2 md:p-3 flex justify-center items-center mx-auto ${className}`}
    >
      <div>
        <div className="flex justify-center items-center gap-4">
          <a
            target="_blank"
            href="https://www.instagram.com/bosch.autopartes/"
            className="w-8 h-8"
          >
            <Image
              src={LogoInstagram}
              alt="Logo Instagram"
              width={29}
              height={29}
              className="rounded-full object-cover cursor-pointer"
              priority
            />
          </a>

          <a
            target="_blank"
            href="https://www.boschaftermarket.com/es/es/ "
            className="w-8 h-8"
          >
            <Image
              src={LogoWeb}
              alt="Logo LinkedIn"
              width={29}
              height={29}
              className="rounded-full object-cover cursor-pointer"
              priority
            />
          </a>
        </div>
        <a
          href="/BOSCH-Politica-de-Privacidad.pdf"
          className=" text-white  tracking-[0.5px] text-[10px] md:text-[12px] "
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidad
        </a>
      </div>
    </div>
  );
}
