"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Download } from "lucide-react";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetInvoice = async () => {
    setLoading(true);
    setError(null); // Reset error state
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("Session ID not found in URL");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/get-invoice?sessionId=${sessionId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch invoice");
      }

      const { invoiceUrl } = await response.json();

      if (invoiceUrl) {
        window.open(invoiceUrl, "_blank");
      } else {
        setError("Invoice URL not found");
      }
    } catch (err) {
      // Type-check the error
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <div className="space-y-4">
          <Button onClick={handleGetInvoice} disabled={loading}>
            {loading ? "Loading..." : "Get Invoice"}
            <Download className="ml-2 h-4 w-4" />
          </Button>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
