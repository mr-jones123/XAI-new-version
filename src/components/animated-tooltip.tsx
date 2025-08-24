"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile devices only (not tablets)
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: any) => {
    if (isMobile) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  const handleTouchStart = (itemId: number) => {
    if (!isMobile) return;
    setHoveredIndex(itemId);
    
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 3000);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 1500);
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-2 sm:-mr-3 md:-mr-4"
          key={item.name}
          onMouseEnter={() => !isMobile && setHoveredIndex(item.id)}
          onMouseLeave={() => !isMobile && setHoveredIndex(null)}
          onTouchStart={() => handleTouchStart(item.id)}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl whitespace-nowrap"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-xs sm:text-sm md:text-base font-bold text-white text-center">
                  {item.name}
                </div>
                <div className="text-xs text-white text-center leading-tight">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105 touch-manipulation"
          />
        </div>
      ))}
    </>
  );
};
