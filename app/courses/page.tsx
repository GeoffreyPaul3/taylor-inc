import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    title: "Python for Data Science",
    description: "Master Python programming for data analysis, visualization, and machine learning.",
    details:
      "This comprehensive course covers Python basics, data manipulation with pandas, data visualization with matplotlib and seaborn, and an introduction to machine learning with scikit-learn.",
    price: 199,
  },
  {
    title: "Deep Learning and Neural Networks",
    description: "Dive deep into the world of neural networks and their applications.",
    details:
      "Explore the architecture and training of neural networks, convolutional and recurrent neural networks, and their applications in computer vision and natural language processing.",
    price: 249,
  },
  // Add more courses as needed
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Individual Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{course.description}</CardDescription>
              <p className="mb-4">{course.details}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">${course.price}</p>
              <div className="flex space-x-2">
                <Button asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

