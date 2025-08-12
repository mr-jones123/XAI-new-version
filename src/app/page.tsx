import { Scene } from "@/components/rubic-cube";

export default function Page(){
  return (
    <div className="h-screen w-screen relative flex flex-col justify-center items-center">
      <div className="absolute inset-0">
        <Scene />
      </div>
      <h1 className="text-6xl md:text-6xl font-bold mb-6 tracking-tight mix-blend-difference text-white">
        Unveiling the Black Box like a Rubik's Cube
      </h1>
      <p className="text-lg md:text-xl text-white mix-blend-exclusion max-w-2xl px-6 leading-relaxed">
         One twist at a time.
      </p>
    </div>
  );
};


