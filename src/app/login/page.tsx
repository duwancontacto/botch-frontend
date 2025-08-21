"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import backgroundImage from "@/assets/FondoDeLoginDeDistribuidor.webp";
import backgroundImageMobile from "@/assets/FondoDeLoginDeDistribuidorMobile.webp";
import { useUserType } from "store/useUserType";
import LoginForm from "@/components/LoginForm";
import AuthRedirect from "@/components/AuthRedirect";
import { AnimatedSection } from "@/components/ui/animated-section";

function TimelineItem({ text, isLast }: { text: string; isLast: boolean }) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const updateLineHeightToText = () => {
      if (!textRef.current || !lineRef.current) return;
      const paragraphHeight = textRef.current.offsetHeight;
      lineRef.current.style.height = `${paragraphHeight - 7}px`;
    };

    updateLineHeightToText();
    window.addEventListener("resize", updateLineHeightToText);
    return () => window.removeEventListener("resize", updateLineHeightToText);
  }, []);

  return (
    <li className="relative grid grid-cols-[16px_1fr] md:grid-cols-[20px_1fr] items-start gap-3 md:gap-4">
      <div className="relative ">
        <span className="block w-[14px] h-[14px] mt-[9px] rounded-full border-2 border-[#0D385E] text-transparent ">
          .
        </span>
        {!isLast && (
          <span
            ref={lineRef}
            className="absolute left-1/3 top-[22px] -translate-x-1/2 w-[2px] bg-[#0D385E] rounded-[2px]"
            aria-hidden="true"
          />
        )}
      </div>
      <p ref={textRef} className="text-base text-[20px] leading-relaxed">
        {text}
      </p>
    </li>
  );
}

function TimelineItemMobile({
  text,
  isLast,
}: {
  text: string;
  isLast: boolean;
}) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const updateLineHeightToText = () => {
      if (!textRef.current || !lineRef.current) return;
      const paragraphHeight = textRef.current.offsetHeight;
      lineRef.current.style.height = `${paragraphHeight + 3}px`;
    };

    updateLineHeightToText();
    window.addEventListener("resize", updateLineHeightToText);
    return () => window.removeEventListener("resize", updateLineHeightToText);
  }, []);

  return (
    <li className="relative pl-4 py-1">
      <span className="absolute left-0 top-2 w-[7px] h-[7px] rounded-full border-1 border-[#2A597E]" />
      {!isLast && (
        <span
          ref={lineRef}
          className="absolute left-[3px] top-[14px] w-[1px] bg-[#2A597E] rounded-[1px]"
          aria-hidden="true"
        />
      )}
      <p ref={textRef} className="leading-[15px] text-[12px] tracking-[-0.5px]">
        {text}
      </p>
    </li>
  );
}

export default function LoginPage() {
  const { userType } = useUserType();

  return (
    <AuthRedirect>
      <main className="grid h-[260px] lg:h-full  min-h-screen grid-cols-1 lg:grid-cols-2 bg-light">
        {/* Columna izquierda: imagen de fondo con contenido dinámico */}
        <div
          className={`relative min-h-[180px] lg:min-h-[${
            userType === "distributor" ? "400px" : "600px"
          }] `}
        >
          <Image
            src={backgroundImage}
            alt="Fondo Login"
            fill
            className="absolute hidden lg:block inset-0 object-cover"
            priority
          />
          <Image
            src={backgroundImageMobile}
            alt="Fondo Login"
            fill
            className="absolute block  h-[200px]  lg:hidden inset-0 object-cover"
            priority
          />

          {/* Contenido dinámico según el tipo de usuario */}
          <div className="relative h-full inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pt-0 md:pt-0">
            {userType === "distributor" ? (
              // Contenido para Distribuidor
              <AnimatedSection delay={0.2}>
                <h1 className="tracking-[-1.5px] lg-tracking-[-2] text-[25px] lg:text-[47px] font-extrabold leading-[27px] lg:leading-[50px] text-[#0D385E] max-w-xl text-center lg:text-left">
                  {"Registrate,"}
                  <br />
                  {"cargá tus ventas y"}
                  <br />
                  {"empezá a participar."}
                </h1>
              </AnimatedSection>
            ) : (
              <div className="z-10 px-10 md:px-20   lg:px-0 md:mx-14 my-5 md:my-24 text-[#0D385E] max-w-2xl pt-10 md:pt-0">
                <AnimatedSection delay={0.2}>
                  <h1 className="tracking-[-1.5px] lg-tracking-[-2] text-[25px] lg:text-[47px] font-extrabold leading-[27px] lg:leading-[50px] text-[#0D385E] max-w-xl text-center lg:text-left">
                    {"Tu confianza"}
                    <br />
                    {"tiene premio."}
                  </h1>
                </AnimatedSection>

                {/* Línea corta bajo el título */}
                <AnimatedSection delay={0.4}>
                  <div
                    className="mt-1 md:mt-6 h-[2px] md:h-[3px] hidden lg:block w-12 md:w-16 rounded bg-[#0D385E]"
                    aria-hidden="true"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.6}>
                  <p className="mt-2 md:mt-8  text-xl  hidden lg:block text-[25px] leading-[27px] max-w-[410px] tracking-[-1.25px] ">
                    Con la compra de bujías Bosch de septiembre, octubre y
                    noviembre podés ganarte una de las{" "}
                    <span className="font-medium">ocho motos en juego.</span>
                  </p>
                </AnimatedSection>

                {/* Lista tipo timeline */}
                <AnimatedSection delay={0.8}>
                  <ul className="my-10  space-y-1 hidden lg:block leading-[24px] text-[20px] tracking-[-1px]">
                    {[
                      { text: "De 50 a 99 bujías, sumás 1 chance." },
                      { text: "De 100 a 199, sumás 3 chances." },
                      { text: "De 200 a 399, sumás 8 chances." },
                      { text: "A partir de las 400, sumás 20 chances." },
                    ].map((item, i, arr) => (
                      <TimelineItem
                        key={i}
                        text={item.text}
                        isLast={i === arr.length - 1}
                      />
                    ))}
                  </ul>
                </AnimatedSection>

                <AnimatedSection delay={1.0}>
                  <p className=" text-[20px] leading-[24px] tracking-[-1px] hidden lg:block">
                    {"Registrate, cargá tus compras"}
                    <br />
                    {"y empezá a sumar chances."}
                  </p>
                </AnimatedSection>
              </div>
            )}
          </div>
        </div>

        {userType !== "distributor" && (
          <AnimatedSection delay={0.3} className="lg:hidden">
            <div className=" px-10 sm:px-20 py-5 md:py-10 gap-4 bg-[#3DADFF]/15 flex flex-row items-center justify-center lg:hidden text-[#0D385E] ">
              <p className=" max-w-[120px] text-[11px] leading-[11px] tracking-[-0.5px]">
                Con la compra de bujías Bosch de septiembre, octubre y noviembre
                podés ganarte una de las ocho motos en juego.
              </p>

              <ul className=" mt-4 text-[9px] leading-[11px] tracking-[-0.5px]">
                {[
                  { text: "De 50 a 99 bujías, sumás 1 chance." },
                  { text: "De 100 a 199, sumás 3 chances." },
                  { text: "De 200 a 399, sumás 8 chances." },
                  { text: "A partir de las 400, sumás 20 chances." },
                ].map((item, i, arr) => (
                  <TimelineItemMobile
                    key={i}
                    text={item.text}
                    isLast={i === arr.length - 1}
                  />
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}

        {/* Columna derecha: formulario de login */}

        <div className="flex items-start  lg:items-center justify-center px-8 sm:px-6 md:px-8 mt-5 lg:mt-0 sm:py-5 z-10">
          <div className="w-full">
            <AnimatedSection delay={0.3}>
              <LoginForm />
            </AnimatedSection>
          </div>
        </div>
      </main>
    </AuthRedirect>
  );
}
