"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, Loader2, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleReload = () => {
    window.location.reload()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    //Simulate api call
    const res = await fetch("api/waitlist", {
        method: "POST",
        headers: 
            { "Content-Type": "application/json" },
        body: JSON.stringify({email})
    })
    const result = await res.json();
    if(result.message == "Already Joined"){
        setIsSubmitting(false)
        setError("You have already joined the waitlist with this email.")
        return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">You're in! 🎉</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Welcome to the DeepNext family. We'll notify you with exclusive early access.
          </p>
          <div className="space-y-4">
            <Button asChild onClick={handleReload} className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium">
              <Link href="/waitlist">Join with Different Email</Link>
            </Button>
            <p className="text-sm text-gray-500">
              Follow us on{" "}
              <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Twitter
              </Link>{" "}
              for updates
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Simple Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/waitlist" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br  rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600  rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DN</span>
              </div>
            </div>
            <span className="text-xl font-bold">DeepNext</span>
          </Link>
          <div className="flex items-center gap-3">

            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 sm:mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Coming Soon</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8">
            The Ultimate
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Next.js Hub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            We dig through the noise so you don't have to. The 1% of Next.js content that actually matters.
          </p>

          {/* Modern Form */}
          <div className="max-w-md mx-auto">
            <div className="relative group">
              
              <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-brrounded-xl mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 text-sm">Get exclusive early access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-base h-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Get Early Access"
                    )}
                  </Button>
                </form>

                {/* Social Proof with Avatars */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex -space-x-2">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format" 
                        alt="John" 
                        className="w-6 h-6 rounded-full border-2 border-gray-800 bg-gray-700"
                      />
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&auto=format" 
                        alt="Mary" 
                        className="w-6 h-6 rounded-full border-2 border-gray-800 bg-gray-700"
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      John, Mary & <span className="text-blue-400 font-medium">328+</span> others joined
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      No spam
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Unsubscribe anytime
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">See It In Action</h2>
          <p className="text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            A sneak peek of the platform that will transform your Next.js workflow.
          </p>

          {/* Demo Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
              <img
                src="/hero.png"
                alt="DeepNext Demo"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

 
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm">
            Built with ❤️ for Next.js developers.{" "}
            <Link href="mailto:hello@deepnext.dev" className="text-blue-400 hover:text-blue-300 transition-colors">
              Questions?
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}