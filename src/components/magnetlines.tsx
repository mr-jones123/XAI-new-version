import React, { useRef, useEffect, CSSProperties, useState } from "react";
import "../app/globals.css";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#5227FF",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>("span");

    const onPointerMove = (pointer: { x: number; y: number }) => {
      requestAnimationFrame(() => {
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.x + rect.width / 2;
          const centerY = rect.y + rect.height / 2;

          const b = pointer.x - centerX;
          const a = pointer.y - centerY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r =
            ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

          item.style.setProperty("--rotate", `${r}deg`);
        });
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isMobile) return;
      onPointerMove({ x: e.x, y: e.y });
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      onPointerMove({ x: touch.clientX, y: touch.clientY });
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      onPointerMove({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
      touchTimeoutRef.current = setTimeout(() => {
        items.forEach((item) => {
          item.style.setProperty("--rotate", `${baseAngle}deg`);
        });
      }, 1000);
    };

    if (isMobile) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    } else {
      window.addEventListener("pointermove", handlePointerMove);
    }

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      if (isMobile) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      } else {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, [isMobile, baseAngle]);

  const responsiveRows = isMobile ? Math.max(6, Math.floor(rows * 0.8)) : rows;
  const responsiveColumns = isMobile ? Math.max(6, Math.floor(columns * 0.8)) : columns;
  const responsiveSize = isMobile ? '70vmin' : containerSize;
  const responsiveLineWidth = isMobile ? '0.8vmin' : lineWidth;
  const responsiveLineHeight = isMobile ? '4vmin' : lineHeight;

  const total = responsiveRows * responsiveColumns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={
        {
          "--rotate": `${baseAngle}deg`,
          backgroundColor: lineColor,
          width: responsiveLineWidth,
          height: responsiveLineHeight,
        } as CSSProperties
      }
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
        gridTemplateRows: `repeat(${responsiveRows}, 1fr)`,
        width: responsiveSize,
        height: responsiveSize,
        maxWidth: '90vw',
        maxHeight: '90vw',
        touchAction: isMobile ? 'none' : 'auto',
        ...style,
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;