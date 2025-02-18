import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

const trainings = [
  {
    title: "AI and Machine Learning Fundamentals",
    description: "Comprehensive training for teams on AI and ML basics, tailored for your company's needs.",
    details:
      "This intensive training program covers the fundamentals of AI and machine learning, including supervised and unsupervised learning, neural networks, and practical applications in business contexts.",
  },
  {
    title: "Advanced Data Analytics for Decision Makers",
    description: "Empower your leadership with the skills to leverage data for strategic decision-making.",
    details:
      "This executive-level training focuses on interpreting complex data analytics, understanding AI-driven insights, and applying data-driven strategies in your organization.",
  },
  // Add more trainings as needed
]

export default function TrainingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Team Trainings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainings.map((training, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                {training.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{training.description}</CardDescription>
              <p className="mb-4">{training.details}</p>
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

