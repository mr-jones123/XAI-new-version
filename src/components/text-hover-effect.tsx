"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null && !isMobile) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor, isMobile]);

  // Auto-animation for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    const autoAnimate = () => {
      setIsAutoAnimating(true);
      setHovered(true);

      // Animate the mask position in a circular pattern
      const duration = 3000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration;
        const angle = progress * 2 * Math.PI;

        const cx = 50 + 30 * Math.cos(angle);
        const cy = 50 + 30 * Math.sin(angle);

        setMaskPosition({
          cx: `${cx}%`,
          cy: `${cy}%`,
        });

        if (elapsed < duration * 2) {
          requestAnimationFrame(animate);
        } else {
          setHovered(false);
          setIsAutoAnimating(false);
          setMaskPosition({ cx: "50%", cy: "50%" });
        }
      };

      requestAnimationFrame(animate);
    };

    // Start auto-animation after component mounts
    const timer = setTimeout(autoAnimate, 1000);

    // Repeat every 10 seconds
    const interval = setInterval(autoAnimate, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isMobile]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl select-none"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onMouseMove={(e) => !isMobile && setCursor({ x: e.clientX, y: e.clientY })}
      onTouchStart={() => isMobile && !isAutoAnimating && setHovered(true)}
      onTouchEnd={() => isMobile && !isAutoAnimating && setHovered(false)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          ) : (
            <stop offset="0%" stopColor="#5227FF" />
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}

          // example for a smoother animation below

          //   transition={{
          //     type: "spring",
          //     stiffness: 300,
          //     damping: 50,
          //   }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent text-4xl sm:text-5xl md:text-8xl font-bold instrument"
        stroke="#5227FF"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent  text-4xl sm:text-5xl md:text-8xl font-bold instrument"
        stroke="#5227FF"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent text-4xl sm:text-5xl md:text-8xl instrument"
      >
        {text}
      </text>
    </svg>
  );
};
