"use client"
import Silk from "@/components/Silk";
import MagnetLines from "@/components/magnetlines";
import { TextHoverEffect } from "@/components/text-hover-effect";
import Cubes from "@/components/cubes";
import { GlobeComponent } from "@/components/globe-component"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="relative min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] rounded-3xl overflow-hidden">
        {/* Silk Background */}
        <div className="absolute inset-0 min-h-full">
          <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={0} />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-8 left-8 z-20 max-w-lg">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="instrument italic">Production-ready</span> Explainable AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              XeeAI is a research-based AI system that integrates Explainable AI (XAI) for transparency made by Techne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-left">
              <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
          <MagnetLines
            rows={9}
            columns={9}
            containerSize="60vmin"
            lineColor="#5227FF"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
            baseAngle={0}
            style={{ margin: "2rem auto" }}
          />

          <Card className="relative overflow-hidden min-h-[300px] border-none">
            <div className="absolute inset-0">
              <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={45} />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-white md:text-7xl instrument text-right">
                Research-based
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-5 text-right">
              <p className="text-white font-regular text-3xl">
                XeeAI is a product of a quasi-experimental study conducted in FEU Institute of Technology.
                Results show <span>87.6%</span> System Usability Score,
                <span> 69%</span> higher trust score, and 71.6% Accuracy Score (AUPC).
              </p>
              <p className="text-white font-regular text-3xl">
                XeeAI is also reviewed and validated by Machine Learning Experts, AI Engineers, and
                Academic Researchers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full">
          <Card className="relative overflow-hidden min-h-[300px] border-none">
            <div className="absolute inset-0">
              <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={45} />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-white md:text-7xl instrument">
                Open-source
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-5">
              <p className="text-white font-regular text-3xl">
                XeeAI is completely free to be modified and redistributed for commercial or academic use.
                This is a testament of Techne&apos;s commitment to AI transparency.
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center items-center">
            <Cubes
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ffffff"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center mt-14">
        <GlobeComponent />
      </div>

      <div className="h-full flex items-center justify-end">
        <TextHoverEffect text="XeeAI" />
      </div>
    </div>




  )
}
