import QuotationForm from "@/components/QuotationForm"
import Image from "next/image"
import Link from "next/link"

export default function QuotationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Taylor Inc Quotation System</h1>
          <Link href="/">
              <Image
                src="/images/Taylor.png"
                alt="Taylor Inc Logo"
                width={100}
                height={80}
                className="mb-4"
              />
              </Link>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto">
              <QuotationForm />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Taylor Inc (Tailored Solutions). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

