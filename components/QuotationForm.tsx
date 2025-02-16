"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Laptop, Activity, Car, Banknote, Brain } from "lucide-react"

const services = [
  {
    id: "systems-design",
    title: "Systems Design & Troubleshooting",
    description:
      "Custom software and application troubleshooting, embedded systems debugging, and system architecture improvement.",
    icon: Wrench,
    price: 350,
  },
  {
    id: "software-development",
    title: "Software & Application Development",
    description:
      "Custom enterprise solutions, web and mobile app development, API integration, and industry-specific applications.",
    icon: Laptop,
    price: 300,
  },
  {
    id: "healthcare-systems",
    title: "Healthcare & Biomedical Systems",
    description:
      "AI-powered diagnostic tools, EMR systems, IoT-enabled health monitoring, and biomedical imaging software.",
    icon: Activity,
    price: 600,
  },
  {
    id: "engineering-systems",
    title: "Engineering & Automotive Systems",
    description:
      "CAD/CAM software, automotive AI systems, structural integrity simulation, and IoT for smart engineering.",
    icon: Car,
    price: 400,
  },
  {
    id: "finance-solutions",
    title: "Finance, FinTech & Accounting Solutions",
    description:
      "AI-driven fraud detection, financial data analytics, custom accounting software, and blockchain security solutions.",
    icon: Banknote,
    price: 250,
  },
  {
    id: "ai-systems",
    title: "AI Systems Development & Integration",
    description:
      "Machine learning models, AI chatbots, NLP for business applications, and AI-driven cybersecurity solutions.",
    icon: Brain,
    price: 500,
  },
]

export default function QuotationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [selectedService, setSelectedService] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quotation, setQuotation] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const service = services.find((s) => s.id === selectedService)
    if (service) {
      setQuotation({
        name,
        email,
        service: service.title,
        price: service.price,
        quotationNumber: Math.floor(100000 + Math.random() * 900000), // Generate a random 6-digit number
        date: new Date().toLocaleDateString(),
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request a Quotation</h1>
      {!quotation ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <Select onValueChange={setSelectedService} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Generate Quotation</Button>
        </form>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Quotation</CardTitle>
            <CardDescription>Quotation #{quotation.quotationNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Date:</strong> {quotation.date}
              </p>
              <p>
                <strong>Name:</strong> {quotation.name}
              </p>
              <p>
                <strong>Email:</strong> {quotation.email}
              </p>
              <p>
                <strong>Service:</strong> {quotation.service}
              </p>
              <p>
                <strong>Price:</strong> ${quotation.price}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePrint}>Print Quotation</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

