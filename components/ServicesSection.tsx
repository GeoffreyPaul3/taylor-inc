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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wrench, Laptop, Activity, Car, Banknote, Brain } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const services = [
  {
    title: "Systems Design & Troubleshooting",
    description:
      "Custom software and application troubleshooting, embedded systems debugging, and system architecture improvement.",
    icon: Wrench,
    details:
      "Our expert team specializes in diagnosing and resolving complex system issues, optimizing performance, and designing robust architectures tailored to your specific needs.",
    price: 350,
    priceId: "price_1Qt20dQ4Dzd2J7XZpXGY6mqi",
  },
  {
    title: "Software & Application Development",
    description:
      "Custom enterprise solutions, web and mobile app development, API integration, and industry-specific applications.",
    icon: Laptop,
    details:
      "We deliver cutting-edge software solutions, from responsive web applications to powerful mobile apps, ensuring seamless integration with your existing systems and third-party APIs.",
    price: 300,
    priceId: "price_1Qt2pJQ4Dzd2J7XZZ3lWA2nH",
  },
  {
    title: "Healthcare & Biomedical Systems",
    description:
      "AI-powered diagnostic tools, EMR systems, IoT-enabled health monitoring, and biomedical imaging software.",
    icon: Activity,
    details:
      "Our innovative healthcare solutions leverage the latest in AI and IoT technologies to improve patient care, streamline medical processes, and advance biomedical research capabilities.",
    price: 600,
    priceId: "price_1Qt2qdQ4Dzd2J7XZskl1HAfQ",
  },
  {
    title: "Engineering & Automotive Systems",
    description:
      "CAD/CAM software, automotive AI systems, structural integrity simulation, and IoT for smart engineering.",
    icon: Car,
    details:
      "We provide advanced engineering tools and automotive solutions, incorporating AI and IoT to enhance design processes, improve vehicle performance, and enable smart manufacturing.",
    price: 400,
    priceId: "price_1Qt2uNQ4Dzd2J7XZ4QNUsSim",
  },
  {
    title: "Finance, FinTech & Accounting Solutions",
    description:
      "AI-driven fraud detection, financial data analytics, custom accounting software, and blockchain security solutions.",
    icon: Banknote,
    details:
      "Our fintech solutions employ cutting-edge AI and blockchain technologies to enhance financial security, streamline transactions, and provide deep, actionable insights from complex financial data.",
    price: 250,
    priceId: "price_1Qt2vnQ4Dzd2J7XZ9vCcgnBp", 
  },
  {
    title: "AI Systems Development & Integration",
    description:
      "Machine learning models, AI chatbots, NLP for business applications, and AI-driven cybersecurity solutions.",
    icon: Brain,
    details:
      "We develop and integrate sophisticated AI systems, from natural language processing to advanced machine learning models, tailored to solve your unique business challenges and drive innovation.",
    price: 500,
    priceId: "price_1Qt2wvQ4Dzd2J7XZwrUxW1b2", 
  },
]

export default function ServicesSection() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  const [loading, setLoading] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [paymentDialog, setPaymentDialog] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (priceId: string, index: number) => {
    if (!email) {
      setError("Please enter your email address.")
      return
    }
    setLoading(index)
    setError(null)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, email }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        throw error
      }
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <service.icon className="h-8 w-8 text-blue-600" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                <p className="text-2xl font-bold text-blue-600 mb-4">${service.price}</p>
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
                        <DialogTitle>{service.title}</DialogTitle>
                        <DialogDescription>{service.details}</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={paymentDialog === index}
                    onOpenChange={() => {
                      setPaymentDialog(paymentDialog === index ? null : index)
                      setError(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button>Purchase Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Purchase {service.title}</DialogTitle>
                        <DialogDescription>
                          Enter your email to proceed with the purchase of {service.title} for ${service.price}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button
                          className="w-full"
                          onClick={() => handlePurchase(service.priceId, index)}
                          disabled={loading === index}
                        >
                          {loading === index ? "Processing..." : `Pay $${service.price}`}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


