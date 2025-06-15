'use client'
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Star, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
export default function Hero(){
    const stats = [
        { value: "500+", label: "Resources", color: "text-blue-500" },
        { value: "50+", label: "Contributors", color: "text-purple-500" },
        { value: "100%", label: "Open Source", color: "text-green-500" },
      ];
      
    const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any)
    }
  }

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
    return(
        /* Hero Section */
      <section className="min-h-screen flex items-center overflow-hidden justify-center px-4 py-8 md:py-12">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="secondary" className="mb-4 md:mb-6">
          <Star className="w-3 h-3 mr-1" />
          Curated by Developers, Not Algorithms
        </Badge>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent leading-tight">
          The Largest Next.js Ecosystem of Resources
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed px-2 md:px-4 max-w-2xl mx-auto">
          Discover the best articles, videos, tools, books, templates & more handpicked by experts.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10 px-2 md:px-4">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 md:w-5 h-4 md:h-5" />
            <Input
              type="text"
              placeholder="Search Next.js resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 text-base md:text-base lg:text-lg bg-card border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-lg"
            />
            <Button
              type="button"
              onClick={handleSearchIconClick}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 w-7 h-7 md:w-8 md:h-8 p-0 rounded-md"
            >
              <Search className="w-3 md:w-4 h-3 md:h-4" />
            </Button>
          </div>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
  {stats.map((stat, index) => (
    <div key={index} className="text-center">
      <div className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${stat.color}`}>
        {stat.value}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
    </div>
  ))}
</div>
      </div>
    </section>
    )
}