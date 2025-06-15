"use client"
import type React from "react"
import Header from "@/components/header/Header"
import Hero from "@/components/hero/Hero"
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
    </div>
  )
}
