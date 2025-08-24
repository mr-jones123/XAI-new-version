"use client";
import React from "react";
import { AnimatedTooltip } from "./animated-tooltip";
const people = [
  {
    id: 1,
    name: "Xynil Jhed Lacap",
    designation: "AI Engineer/Full-Stack Developer",
    image:
      "./xy-white.png",
  },
  {
    id: 2,
    name: "John Aiverson Abong",
    designation: "QA Tester",
    image:
      "./aiv-white.png",
  },
  {
    id: 3,
    name: "Janna Andrea Justiano",
    designation: "UI/UX Developer",
    image:
      "./janna-white.png",
  },
  {
    id: 4,
    name: "Raphael Mercado",
    designation: "Full-Stack Developer",
    image:
      "./mercado-white.png",
  },
];

export default function DeveloperToolTip() {
  return (
    <div className="flex flex-row items-center justify-center mb-6 sm:mb-8 md:mb-10 w-full px-4">
      <div className="flex flex-row items-center justify-center">
        <AnimatedTooltip items={people} />
      </div>
    </div>
  );
}
