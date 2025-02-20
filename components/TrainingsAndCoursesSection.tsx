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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { BookOpen, GraduationCap, Users } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const trainingsAndCourses = [
  {
    title: "Team Training: AI and Machine Learning Fundamentals",
    description: "Comprehensive training for teams on AI and ML basics, tailored for your company's needs.",
    icon: Users,
    details:
      "This intensive training program covers the fundamentals of AI and machine learning, including supervised and unsupervised learning, neural networks, and practical applications in business contexts.",
    price: 1000,
    priceId: "price_1Qu8ZxQ4Dzd2J7XZc2990Cvb",
    type: "training",
  },
  {
    title: "Team Training: Advanced Data Analytics for Decision Makers",
    description: "Empower your leadership with the skills to leverage data for strategic decision-making.",
    icon: Users,
    details:
      "This executive-level training focuses on interpreting complex data analytics, understanding AI-driven insights, and applying data-driven strategies in your organization.",
    price: 1500,
    priceId: "price_1Qu8dTQ4Dzd2J7XZFb0FxbR1",
    type: "training",
  },
  {
    title: "Individual Course: Python for Data Science",
    description: "Master Python programming for data analysis, visualization, and machine learning.",
    icon: GraduationCap,
    details:
      "This comprehensive course covers Python basics, data manipulation with pandas, data visualization with matplotlib and seaborn, and an introduction to machine learning with scikit-learn.",
    price: 199,
    priceId: "price_1Qu8edQ4Dzd2J7XZqgJNPUq4",
    type: "course",
  },
  {
    title: "Individual Course: Deep Learning and Neural Networks",
    description: "Dive deep into the world of neural networks and their applications.",
    icon: GraduationCap,
    details:
      "Explore the architecture and training of neural networks, convolutional and recurrent neural networks, and their applications in computer vision and natural language processing.",
    price: 249,
    priceId: "price_1Qu8iYQ4Dzd2J7XZxAkRZXMG",
    type: "course",
  },
]

export default function TrainingsAndCoursesSection() {
  const [paymentDialog, setPaymentDialog] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<number | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

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
    <section id="trainings-and-courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Trainings and Courses</h2>

        {!showContent && (
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setShowConfirmDialog(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-8 w-8 text-blue-600" />
                Discover Our Trainings and Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Click to explore our range of team trainings and individual courses designed to enhance your skills in
                AI, machine learning, and data science.
              </CardDescription>
            </CardContent>
          </Card>
        )}

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Trainings and Courses?</DialogTitle>
              <DialogDescription>Would you like to see our available trainings and courses?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">No, thanks</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setShowContent(true)
                  setShowConfirmDialog(false)
                }}
              >
                Yes, show me
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {showContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {trainingsAndCourses.map((item, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <item.icon className="h-8 w-8 text-blue-600" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">{item.description}</CardDescription>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{`$${item.price}`}</p>
                  <div className="flex space-x-2">
                    <Dialog
                      open={paymentDialog === index}
                      onOpenChange={() => setPaymentDialog(paymentDialog === index ? null : index)}
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
                    <Button onClick={() => setPaymentDialog(index)}>Purchase Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      {trainingsAndCourses.map((item, index) => (
        <Dialog
          key={`dialog-${index}`}
          open={paymentDialog === index}
          onOpenChange={() => {
            setPaymentDialog(paymentDialog === index ? null : index)
            setError(null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase {item.title}</DialogTitle>
              <DialogDescription>
                Enter your email to proceed with the purchase of {item.title} for ${item.price}
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
                onClick={() => handlePurchase(item.priceId, index)}
                disabled={loading === index}
              >
                {loading === index ? "Processing..." : `Pay $${item.price}`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </section>
  )
}

