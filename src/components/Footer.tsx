import LogoFacebook from "@/assets/Logo-facebook.png";
import Image from "next/image";
import LogoInstagram from "@/assets/Logo-Instragam.png";
import LogoLinkedin from "@/assets/Logo-Linkedin.png";
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
      } inset-x-0 bottom-0 z-20 bg-[#2a597e] p-5 md:p-3 flex justify-center items-center mx-auto ${className}`}
    >
      <div>
        <div className="flex justify-center items-center gap-4">
          <div className="w-8 h-8">
            <Image
              src={LogoInstagram}
              alt="Logo Instagram"
              width={29}
              height={29}
              className="rounded-full object-cover cursor-pointer"
              priority
            />
          </div>
          <div className="w-8 h-8">
            <Image
              src={LogoFacebook}
              alt="Logo Facebook"
              width={29}
              height={29}
              className="rounded-full object-cover cursor-pointer"
              priority
            />
          </div>

          <div className="w-8 h-8">
            <Image
              src={LogoLinkedin}
              alt="Logo LinkedIn"
              width={29}
              height={29}
              className="rounded-full object-cover cursor-pointer"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
