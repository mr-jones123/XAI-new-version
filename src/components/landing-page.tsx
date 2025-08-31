"use client"
import Silk from "@/components/Silk";
import DeveloperToolTip from "./developers-tooltip";
import { ContainerScroll } from "./tablet-scroll";
import FaultyTerminal from "./FaultyTerminal";
import MagnetLines from "@/components/magnetlines";
import { TextHoverEffect } from "@/components/text-hover-effect";
import Cubes from "@/components/cubes";
import { GlobeComponent } from "@/components/globe-component"
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-8">
      <div className="relative min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="absolute inset-0 min-h-full">
          <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={0} />
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              <span className="instrument italic">Production-ready</span> Explainable AI
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 text-gray-300 leading-relaxed">
              XeeAI is a research-based AI system that integrates Explainable AI (XAI) for transparency made by Techne.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base touch-manipulation">
                Ongoing Work
              </button>
              <Button asChild className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors text-sm sm:text-base touch-manipulation">
                <Link href={"https://xai-research.vercel.app/"}>
                Visit Old Version
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-8 sm:mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-full">
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

          <Card className="relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] border-none">
            <div className="absolute inset-0">
              <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={45} />
            </div>
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <CardTitle className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl instrument text-right leading-tight">
                Research-based
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5 text-right p-4 sm:p-6">
              <p className="text-white font-regular text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed">
                XeeAI is a product of a quasi-experimental study conducted in FEU Institute of Technology.
                Results show <span className="font-semibold">87.6%</span> System Usability Score,
                <span className="font-semibold"> 69%</span> higher trust score, and <span className="font-semibold">71.6%</span> Accuracy Score (AUPC).
              </p>
              <p className="text-white font-regular text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed">
                XeeAI is also reviewed and validated by Machine Learning Experts, AI Engineers, and
                Academic Researchers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="mt-8 sm:mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-full">
          <Card className="relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] border-none">
            <div className="absolute inset-0">
              <Silk speed={5} scale={1} color="#5227FF" noiseIntensity={1.5} rotation={45} />
            </div>
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <CardTitle className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl instrument leading-tight">
                Open-source
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5 p-4 sm:p-6">
              <p className="text-white font-regular text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed">
                XeeAI is completely free to be modified and redistributed for commercial or academic use.
                This is a testament of Techne&apos;s commitment to AI transparency.
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center items-center p-4 sm:p-6">
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

      <div className="relative flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-14">
        <GlobeComponent />
      </div>

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center">
                Welcome to the age of <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[6rem] font-bold mt-1 leading-none instrument">
                  AI Transparency
                </span>
              </h1>
            </>
          }
        >
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#5227FF"
            mouseReact={false}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center z-10 px-4">
              See AI with XeeAI
            </h2>
          </div>
        </ContainerScroll>
      </div>
      <div className="h-full flex flex-col items-center justify-end">
        <TextHoverEffect text="XeeAI" />
        <div className="flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6 sm:mb-8 md:mb-10 text-center">
            XeeAI is made by <span className="instrument">Techne</span>
          </h1>
          <DeveloperToolTip />
          <p className="text-sm sm:text-base md:text-lg text-gray-300 text-center">
            This website is made by
            {" "}
            <Link
            href="https://xy-profile.vercel.app/"
            >
              <span className="text-blue-400">
                Xy.
              </span>
            </Link>

          </p>
        </div>
      </div>
    </div>




  )
}
