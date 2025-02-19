"use client"

import { useCallback, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import type { Engine } from "tsparticles-engine"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { RequestDemoDialog } from "./RequestDemoDialog"

const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  ),
})

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Error handling for ResizeObserver
    const resizeObserverError = (error: ErrorEvent) => {
      if (error.message.includes("ResizeObserver")) {
        // This error is often just a warning, so we can ignore it
        error.preventDefault()
      }
    }

    window.addEventListener("error", resizeObserverError)

    return () => {
      window.removeEventListener("error", resizeObserverError)
    }
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await (await import("tsparticles-slim")).loadSlim(engine)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 to-blue-900">
      {isClient && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
      )}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in-up">
          Innovative Systems Solutions for a Smarter Future
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/80 animate-fade-in-up animation-delay-200">
          We are a cutting-edge technology company dedicated to solving complex challenges across industries. Our
          mission is to drive innovation and create intelligent solutions that shape the future of technology.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-400">
        <RequestDemoDialog>
          <Button size="lg" className="bg-white text-blue-900 font-medium hover:bg-blue-100">
            Request a Demo
          </Button>
        </RequestDemoDialog>
          <Button size="lg" variant="default" className="text-white border-white hover:bg-white/10">
          <Link href="/quotation" >
            Get Quotation
          </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

