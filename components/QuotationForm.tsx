"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Laptop, Activity, Car, Banknote, Brain } from "lucide-react"
import Image from "next/image"

type Quotation = {
  name: string
  email: string
  address: string
  phone: string
  service: string
  price: number
  quotationNumber: number
  date: string
  validUntil: string
  projectDescription?: string
  timeline: string
  paymentTerms: string
}

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    selectedService: "",
    projectDescription: "",
    timeline: "",
    paymentTerms: "30 days",
  })
  const [quotation, setQuotation] = useState<Quotation | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const service = services.find((s) => s.id === formData.selectedService)
    if (service) {
      setQuotation({
        ...formData,
        service: service.title,
        price: service.price,
        quotationNumber: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request a Quotation</h1>
      {quotation ? (
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <Image
                src="/images/Taylor-logo.png"
                alt="Taylor Inc Logo"
                width={200}
                height={60}
                className="mb-4"
              />
              <div className="text-right">
                <CardTitle className="text-2xl">Official Quotation</CardTitle>
                <CardDescription>Quotation #{quotation?.quotationNumber}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Client Information:</h3>
                <p>{quotation?.name}</p>
                <p>{quotation?.address}</p>
                <p>{quotation?.email}</p>
                <p>{quotation?.phone}</p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Date:</strong> {quotation?.date}
                </p>
                <p>
                  <strong>Valid Until:</strong> {quotation?.validUntil}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Service Details:</h3>
              <p>
                <strong>Service:</strong> {quotation?.service}
              </p>
              <p>
                <strong>Description:</strong> {quotation?.projectDescription}
              </p>
              <p>
                <strong>Estimated Timeline:</strong> {quotation?.timeline} weeks
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Financial Details:</h3>
              <p>
                <strong>Price:</strong> ${quotation?.price.toLocaleString()} USD
              </p>
              <p>
                <strong>Payment Terms:</strong> {quotation?.paymentTerms}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Terms and Conditions:</h3>
              <p>1. This quotation is valid for 30 days from the date of issue.</p>
              <p>2. The final price may vary based on the actual scope of work.</p>
              <p>3. Any changes to the project requirements may affect the timeline and cost.</p>
              <p>4. A 50% deposit is required to commence the project.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div>
              <p className="font-semibold">Taylor Inc (Tailored Solutions)</p>
              <p>123 Business Street</p>
              <p>City, State, ZIP</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <Button onClick={handlePrint}>Print Quotation</Button>
          </CardFooter>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <Select onValueChange={(value) => handleSelectChange("selectedService", value)} required>
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
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
              Project Description (Optional)
            </label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                Project Timeline (weeks)
              </label>
              <Input
                id="timeline"
                name="timeline"
                type="number"
                value={formData.timeline}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">
                Payment Terms
              </label>
              <Select onValueChange={(value) => handleSelectChange("paymentTerms", value)} defaultValue="30 days">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 days">15 days</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                  <SelectItem value="45 days">45 days</SelectItem>
                  <SelectItem value="60 days">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Generate Quotation</Button>
        </form>
      )}
    </div>
  )
}

