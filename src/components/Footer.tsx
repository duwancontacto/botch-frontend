import LogoFacebook from "@/assets/Logo-facebook.png";
import Image from "next/image";
import LogoInstagram from "@/assets/Logo-Instragam.png";
import LogoLinkedin from "@/assets/Logo-Linkedin.png";
export default function Footer({ absolute }: { absolute?: boolean }) {
  const IconWrap = ({
    children,
    label,
  }: {
    children: React.ReactNode;
    label: string;
  }) => (
    <a
      href="#"
      aria-label={label}
      className="grid size-10 place-items-center ro3l bg-white text-[#2a597e] shadow hover:opacity-90 transition"
    >
      {children}
    </a>
  );

  return (
    <div
      className={`${
        absolute ? "fixed" : "relative"
      } inset-x-0 bottom-0 z-20 bg-[#2a597e] p-5 md:p-3 flex justify-center items-center mx-auto`}
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
