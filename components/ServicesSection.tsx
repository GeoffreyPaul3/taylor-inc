"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wrench, Laptop, Activity, Car, Banknote, Brain } from "lucide-react"
import { GetInTouchDialog } from "./GetinTouchDialog"



const services = [
  {
    title: "Systems Design & Troubleshooting",
    description:
      "Custom software and application troubleshooting, embedded systems debugging, and system architecture improvement.",
    icon: Wrench,
    details:
      "Our expert team specializes in diagnosing and resolving complex system issues, optimizing performance, and designing robust architectures tailored to your specific needs.",
  },
  {
    title: "Software & Application Development",
    description:
      "Custom enterprise solutions, web and mobile app development, API integration, and industry-specific applications.",
    icon: Laptop,
    details:
      "We deliver cutting-edge software solutions, from responsive web applications to powerful mobile apps, ensuring seamless integration with your existing systems and third-party APIs.",
  },
  {
    title: "Healthcare & Biomedical Systems",
    description:
      "AI-powered diagnostic tools, EMR systems, IoT-enabled health monitoring, and biomedical imaging software.",
    icon: Activity,
    details:
      "Our innovative healthcare solutions leverage the latest in AI and IoT technologies to improve patient care, streamline medical processes, and advance biomedical research capabilities.",
  },
  {
    title: "Engineering & Automotive Systems",
    description:
      "CAD/CAM software, automotive AI systems, structural integrity simulation, and IoT for smart engineering.",
    icon: Car,
    details:
      "We provide advanced engineering tools and automotive solutions, incorporating AI and IoT to enhance design processes, improve vehicle performance, and enable smart manufacturing.",
  },
  {
    title: "Finance, FinTech & Accounting Solutions",
    description:
      "AI-driven fraud detection, financial data analytics, custom accounting software, and blockchain security solutions.",
    icon: Banknote,
    details:
      "Our fintech solutions employ cutting-edge AI and blockchain technologies to enhance financial security, streamline transactions, and provide deep, actionable insights from complex financial data.",
  },
  {
    title: "AI Systems Development & Integration",
    description:
      "Machine learning models, AI chatbots, NLP for business applications, and AI-driven cybersecurity solutions.",
    icon: Brain,
    details:
      "We develop and integrate sophisticated AI systems, from natural language processing to advanced machine learning models, tailored to solve your unique business challenges and drive innovation.",
  },
]

export default function ServicesSection() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  const [getInTouchDialog, setGetInTouchDialog] = useState<{ isOpen: boolean; service: string }>({
    isOpen: false,
    service: "",
  })

  const handleGetInTouch = (service: string) => {
    setGetInTouchDialog({ isOpen: true, service })
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <item.icon className="h-8 w-8 text-blue-600" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">{item.description}</CardDescription>
                <div className="flex space-x-2">
                  <Dialog
                    open={openDialog === index}
                    onOpenChange={() => setOpenDialog(openDialog === index ? null : index)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">Learn More</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.details}</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleGetInTouch(item.title)}>Get in Touch</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <GetInTouchDialog
        isOpen={getInTouchDialog.isOpen}
        onClose={() => setGetInTouchDialog({ isOpen: false, service: "" })}
        service={getInTouchDialog.service}
      />
    </section>
  )
}

