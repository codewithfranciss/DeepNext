"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, BookOpen, Video, Wrench, FileText, Github, Star, Users, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DN</span>
            </div>
            <span className="text-xl font-bold">DeepNext</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
              Submit
            </Link>
            <Button variant="outline" size="sm" className="mr-2">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 p-0"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="#resources"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/submit"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit
              </Link>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-8 md:py-12 lg:py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 md:mb-6">
            <Star className="w-3 h-3 mr-1" />
            Curated by Developers, Not Algorithms
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent leading-tight">
            The Largest Next.js Ecosystem of Resources
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed px-2 md:px-4 max-w-3xl mx-auto">
            Discover the best articles, videos, tools, books, templates & more handpicked by experts.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 md:mb-10 px-2 md:px-4">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 md:w-5 h-4 md:h-5" />
              <Input
                type="text"
                placeholder="Search for Next.js resources, tutorials, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 text-sm md:text-base lg:text-lg bg-card border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-lg"
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
          <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-sm md:max-w-md mx-auto">
            <div className="text-center">
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-blue-500">500+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-purple-500">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-green-500">100%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Types */}
      <section id="resources" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Discover Quality Resources</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Handpicked content across multiple formats to help you master Next.js
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-card border-border hover:border-blue-500 transition-colors">
              <CardHeader className="pb-3">
                <BookOpen className="w-6 md:w-8 h-6 md:h-8 text-blue-500 mb-2" />
                <CardTitle className="text-foreground text-lg">Blogs & Articles</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  In-depth tutorials and insights from Next.js experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-blue-500">150+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Curated articles</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-purple-500 transition-colors">
              <CardHeader className="pb-3">
                <Video className="w-6 md:w-8 h-6 md:h-8 text-purple-500 mb-2" />
                <CardTitle className="text-foreground text-lg">Videos</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Visual learning with courses and tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-purple-500">80+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Video resources</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-green-500 transition-colors">
              <CardHeader className="pb-3">
                <Wrench className="w-6 md:w-8 h-6 md:h-8 text-green-500 mb-2" />
                <CardTitle className="text-foreground text-lg">Tools</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Essential tools and libraries for Next.js development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-green-500">200+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Developer tools</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-orange-500 transition-colors">
              <CardHeader className="pb-3">
                <FileText className="w-6 md:w-8 h-6 md:h-8 text-orange-500 mb-2" />
                <CardTitle className="text-foreground text-lg">Books</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Comprehensive guides and reference materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-orange-500">25+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Recommended books</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Why DeepNext?</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              We believe in quality over quantity. Every resource is carefully vetted by the community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Community Curated</h3>
              <p className="text-muted-foreground text-sm md:text-base px-4">
                Resources are handpicked and voted on by experienced Next.js developers, ensuring quality and relevance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Always Updated</h3>
              <p className="text-muted-foreground text-sm md:text-base px-4">
                Our community actively maintains and updates the resource list to keep up with the latest Next.js
                developments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Open Source</h3>
              <p className="text-muted-foreground text-sm md:text-base px-4">
                Completely open source and transparent. Contribute, suggest resources, or help improve the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of developers who trust DeepNext for their Next.js learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
            <Button size="lg" variant="outline">
              <Github className="w-5 h-5 mr-2" />
              Contribute on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
              <span className="font-semibold">DeepNext</span>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6 text-muted-foreground text-sm">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border text-center text-muted-foreground text-sm">
            <p>&copy; 2024 DeepNext. Open source and built with ❤️ by the community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
