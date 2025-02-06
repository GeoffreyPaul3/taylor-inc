"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-blue-800 shadow-md" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
            <Image src="/images/Taylor-logo.png" alt="Logo" width={98} height={70} />
          <div className="hidden md:flex space-x-4">
            <Link href="#services" className={`${isScrolled ? "text-white" : "text-white"} hover:text-blue-500`}>
              Services
            </Link>
            <Link href="#about" className={`${isScrolled ? "text-white" : "text-white"} hover:text-blue-500`}>
              About
            </Link>
            <Link href="#projects" className={`${isScrolled ? "text-white" : "text-white"} hover:text-blue-500`}>
              Projects
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-12 w-12" /> : <Menu className="h-12 w-12 bg-white" />}
            </Button>
          </div>
          <Button
            variant={isScrolled ? "default" : "default"}
            className={`hidden md:inline-flex ${isScrolled ? "bg-blue-600 text-white" : "text-white border-white"}`}
          >
            Contact Us
          </Button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link href="#services" className="block text-gray-600 hover:text-blue-500" onClick={toggleMobileMenu}>
              Services
            </Link>
            <Link href="#about" className="block text-gray-600 hover:text-blue-500" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link href="#projects" className="block text-gray-600 hover:text-blue-500" onClick={toggleMobileMenu}>
              Projects
            </Link>
            <Button variant="default" className="w-full bg-blue-600 text-white">
              <Link href="#contact" onClick={toggleMobileMenu}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

