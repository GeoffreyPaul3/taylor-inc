"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Users, GraduationCap } from "lucide-react"
import Link from "next/link"
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

const trainingsAndCourses = [
  {
    id: "ai-ml-fundamentals",
    title: "Team Training: AI and Machine Learning Fundamentals",
    description: "Comprehensive training for teams on AI and ML basics, tailored for your company's needs.",
    icon: Users,
    details:
      "This intensive training program covers the fundamentals of AI and machine learning, including supervised and unsupervised learning, neural networks, and practical applications in business contexts.",
    price: 1000,
    type: "training",
  },
  {
    id: "advanced-data-analytics",
    title: "Team Training: Advanced Data Analytics for Decision Makers",
    description: "Empower your leadership with the skills to leverage data for strategic decision-making.",
    icon: Users,
    details:
      "This executive-level training focuses on interpreting complex data analytics, understanding AI-driven insights, and applying data-driven strategies in your organization.",
    price: 1500,
    type: "training",
  },
  {
    id: "python-data-science",
    title: "Individual Course: Python for Data Science",
    description: "Master Python programming for data analysis, visualization, and machine learning.",
    icon: GraduationCap,
    details:
      "This comprehensive course covers Python basics, data manipulation with pandas, data visualization with matplotlib and seaborn, and an introduction to machine learning with scikit-learn.",
    price: 199,
    type: "course",
  },
  {
    id: "deep-learning-neural-networks",
    title: "Individual Course: Deep Learning and Neural Networks",
    description: "Dive deep into the world of neural networks and their applications.",
    icon: GraduationCap,
    details:
      "Explore the architecture and training of neural networks, convolutional and recurrent neural networks, and their applications in computer vision and natural language processing.",
    price: 249,
    type: "course",
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
    const trainingOrCourse = trainingsAndCourses.find((s) => s.id === formData.selectedService)
    if (trainingOrCourse) {
      setQuotation({
        ...formData,
        service: trainingOrCourse.title,
        price: trainingOrCourse.price,
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
      {quotation ? (
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <Link href="/">
              <Image
                src="/images/Taylor.png"
                alt="Taylor Inc Logo"
                width={120}
                height={80}
                className="mb-4"
              />
              </Link>
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
              <h3 className="font-semibold">Training/Course Details:</h3>
              <p>
                <strong>Training/Course:</strong> {quotation?.service}
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
              <p>4. A 50% deposit is required to commence the training/course.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div>
              <p className="font-semibold">Taylor Inc (Tailored Solutions)</p>
              <p>17230 Dallas Pkwy</p>
              <p>Dallas TX 75248</p>
              <p>Phone: +1 (945) 264-4480</p>
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
              Training/Course
            </label>
            <Select onValueChange={(value) => handleSelectChange("selectedService", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a training/course" />
              </SelectTrigger>
              <SelectContent>
                {trainingsAndCourses.map((trainingOrCourse) => (
                  <SelectItem key={trainingOrCourse.id} value={trainingOrCourse.id}>
                    {trainingOrCourse.title}
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