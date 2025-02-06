import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & AI Specialist",
    image: "/placeholder.svg?height=200&width=200",
    bio: "With over 15 years of experience in AI and software development, Jane leads our company's vision and strategy.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    name: "John Smith",
    role: "CTO & Engineering Lead",
    image: "/placeholder.svg?height=200&width=200",
    bio: "John brings 20 years of expertise in systems architecture and engineering, driving our technical innovations.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    name: "Emily Chen",
    role: "Head of FinTech Solutions",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Emily's background in finance and technology enables her to develop cutting-edge solutions for the financial sector.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    name: "Michael Johnson",
    role: "Lead Biomedical Engineer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "With a Ph.D. in Biomedical Engineering, Michael spearheads our healthcare and biomedical systems development.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Us & Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          At Innovative Systems, we bring together experts from diverse fields to create cutting-edge solutions. Our
          team&apos;s combined experience spans software development, AI, engineering, fintech, and biomedical systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

