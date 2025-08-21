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
      lineRef.current.style.height = `${paragraphHeight}px`;
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
      lineRef.current.style.height = `${paragraphHeight - 10}px`;
    };

    updateLineHeightToText();
    window.addEventListener("resize", updateLineHeightToText);
    return () => window.removeEventListener("resize", updateLineHeightToText);
  }, []);

  return (
    <li className="relative pl-6">
      <span className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-[#2A597E]" />
      {!isLast && (
        <span
          ref={lineRef}
          className="absolute left-[5px] top-[14px] w-[2px] bg-[#2A597E] rounded-[2px]"
          aria-hidden="true"
        />
      )}
      <p ref={textRef} className="leading-relaxed">
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
          className={`relative min-h-[100px] lg:min-h-[${
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
            className="absolute block lg:hidden inset-0 object-cover"
            priority
          />

          {/* Contenido dinámico según el tipo de usuario */}
          <div className="relative  h-full inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pt-20 md:pt-0">
            {userType === "distributor" ? (
              // Contenido para Distribuidor
              <AnimatedSection delay={0.2}>
                <h1 className="text-3xl lg:text-4xl xl:text-[46px] font-extrabold leading-tight text-[#0D385E] max-w-xl text-center lg:text-left">
                  {"Registrate,"}
                  <br />
                  {"cargá tus ventas y"}
                  <br />
                  {"empezá a participar."}
                </h1>
              </AnimatedSection>
            ) : (
              <div className="z-10 px-10 md:px-20   lg:px-0 md:mx-14 my-5 md:my-24 text-[#0D385E] max-w-2xl ">
                <AnimatedSection delay={0.2}>
                  <h1 className="text-3xl md:text-4xl lg:text-[46px] xl:text-7xl leading-tight xl:leading-[70px] font-bold">
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
                  <p className="mt-2 md:mt-8 text-xl  hidden lg:block lg:text-[25px] leading-snug max-w-[460px]">
                    Con la compra de bujías Bosch de septiembre, octubre y
                    noviembre podés ganarte una de las{" "}
                    <span className="font-semibold">ocho motos en juego.</span>
                  </p>
                </AnimatedSection>

                {/* Lista tipo timeline */}
                <AnimatedSection delay={0.8}>
                  <ul className="my-10  space-y-3  hidden lg:block md:space-y-3 text-[15px]">
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
                  <p className=" text-[20px]  hidden lg:block leading-relaxed">
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
          <AnimatedSection delay={1.1} className="lg:hidden">
            <div className=" px-10 md:px-20 py-5 md:py-10 gap-4 bg-[#3DADFF]/15 flex flex-row items-center justify-center lg:hidden text-[#0D385E] ">
              <p className="w-1/2 text-[12px] md:text-[15px] leading-relaxed">
                Con la compra de bujías Bosch de septiembre, octubre y noviembre
                podés ganarte una de las ocho motos en juego.
              </p>

              <ul className="w-1/2 mt-4  text-[12px] md:text-[15px]">
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
