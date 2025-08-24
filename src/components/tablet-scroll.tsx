"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Extended to tablet range
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = React.useMemo(() => {
    if (typeof window === 'undefined' || isMobile === null) return [1.05, 1];
    const width = window.innerWidth;
    if (width <= 480) return [0.6, 0.85]; // Mobile phones
    if (width <= 768) return [0.7, 0.9];   // Small tablets
    if (width <= 1024) return [0.8, 0.95]; // Tablets
    return [1.05, 1]; // Desktop
  }, [isMobile]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] sm:h-[60rem] lg:h-[70rem] xl:h-[80rem] flex items-center justify-center relative p-2 sm:p-4 md:p-8 lg:p-12 xl:p-20"
      ref={containerRef}
    >
      <div
        className="py-6 sm:py-10 md:py-20 lg:py-30 xl:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center px-4"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl -mt-6 sm:-mt-8 md:-mt-12 mx-auto h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] w-full border-2 sm:border-3 md:border-4 border-[#6C6C6C] p-1 sm:p-2 md:p-4 lg:p-6 bg-[#222222] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-100 dark:bg-zinc-900 p-1 sm:p-2 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
