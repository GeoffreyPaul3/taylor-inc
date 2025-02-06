"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const projects = [
  {
    title: "AI-Powered Healthcare Assistant",
    description: "An intelligent chatbot for patient triage and medical advice.",
    image: "/images/Ai.jpg",
    details:
      "This AI-powered healthcare assistant uses natural language processing and machine learning to provide initial patient triage, offer basic medical advice, and schedule appointments. It has significantly reduced wait times and improved patient satisfaction in several major hospitals.",
  },
  {
    title: "Smart City Traffic Management",
    description: "IoT-based system for real-time traffic optimization.",
    image: "/images/Traffic.jpg",
    details:
      "Our smart city traffic management system utilizes a network of IoT sensors and AI algorithms to analyze traffic patterns in real-time. It dynamically adjusts traffic light timings and provides route recommendations, resulting in a 30% reduction in average commute times.",
  },
  {
    title: "Blockchain-Secured Financial Platform",
    description: "Decentralized finance solution for secure, transparent transactions.",
    image: "/images/Blockchain.jpg",
    details:
      "This blockchain-based financial platform provides a secure and transparent environment for various financial transactions. It includes features like smart contracts for automated agreements, decentralized identity verification, and immutable transaction records, enhancing trust and efficiency in financial operations.",
  },
  {
    title: "Augmented Reality for Industrial Maintenance",
    description: "AR application for real-time guidance in complex machinery maintenance.",
    image: "/images/Industrial.jpg",
    details:
      "Our augmented reality solution for industrial maintenance overlays digital information onto physical machinery, providing technicians with real-time guidance for repairs and maintenance. This has led to a 40% reduction in downtime and a 25% increase in first-time fix rates.",
  },
]

export default function ProjectsShowcase() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Dialog
                  open={openDialog === index}
                  onOpenChange={() => setOpenDialog(openDialog === index ? null : index)}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>{project.details}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

