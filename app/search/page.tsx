"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Search, 
  BookOpen, 
  Video, 
  Wrench, 
  FileText, 
  
  ExternalLink, 
  Star, 
  Calendar, 
  Filter, 
  ChevronDown,
  Github,
  Twitter,
  Mail,
  Heart,
  Menu,
  X,
  Briefcase,
  FolderOpen,
  Grid3X3,
  Send,
  CheckCircle,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data for demonstration
const mockResources = [
  {
    id: 1,
    title: "Next.js 14 App Router Complete Guide",
    description:
      "A comprehensive guide to mastering the new App Router in Next.js 14 with practical examples and best practices.",
    type: "blog",
    url: "https://example.com/nextjs-14-guide",
    author: "John Doe",
    date: "2024-01-15",
    rating: 4.8,
    tags: ["app-router", "nextjs-14", "routing"],
  },
  {
    id: 2,
    title: "Building Full-Stack Apps with Next.js",
    description:
      "Learn how to build complete full-stack applications using Next.js, including authentication, database integration, and deployment.",
    type: "video",
    url: "https://youtube.com/watch?v=example",
    author: "Jane Smith",
    date: "2024-01-10",
    rating: 4.9,
    tags: ["full-stack", "authentication", "database"],
  },
  {
    id: 3,
    title: "Next.js Performance Optimization Toolkit",
    description:
      "Essential tools and techniques for optimizing your Next.js applications for maximum performance and user experience.",
    type: "tool",
    url: "https://github.com/example/nextjs-toolkit",
    author: "Dev Team",
    date: "2024-01-08",
    rating: 4.7,
    tags: ["performance", "optimization", "tools"],
  },
  {
    id: 4,
    title: "Mastering Next.js: From Beginner to Expert",
    description:
      "The definitive book on Next.js development, covering everything from basics to advanced patterns and deployment strategies.",
    type: "book",
    url: "https://example.com/nextjs-book",
    author: "Alex Johnson",
    date: "2023-12-20",
    rating: 4.6,
    tags: ["beginner", "advanced", "comprehensive"],
  },
  {
    id: 5,
    title: "Senior Next.js Developer Position",
    description:
      "Join our growing team as a Senior Next.js Developer. Work on cutting-edge projects with modern technologies and competitive salary.",
    type: "job",
    url: "https://example.com/job-listing",
    author: "TechCorp Inc",
    date: "2024-01-12",
    rating: 4.8,
    tags: ["senior", "remote", "full-time"],
  },
  {
    id: 6,
    title: "Next.js E-commerce Starter",
    description:
      "Open-source e-commerce platform built with Next.js 14, Stripe, and Tailwind CSS. Perfect for starting your online store.",
    type: "project",
    url: "https://github.com/example/nextjs-ecommerce",
    author: "Open Source Community",
    date: "2024-01-05",
    rating: 4.7,
    tags: ["ecommerce", "stripe", "tailwind"],
  },
  {
    id: 7,
    title: "Advanced Next.js Patterns and Practices",
    description:
      "Deep dive into advanced patterns, custom hooks, and architectural decisions for large-scale Next.js applications.",
    type: "blog",
    url: "https://example.com/advanced-patterns",
    author: "Emily Davis",
    date: "2024-01-03",
    rating: 4.9,
    tags: ["advanced", "patterns", "architecture"],
  },
  {
    id: 8,
    title: "Next.js CMS Dashboard",
    description:
      "Feature-rich content management system built with Next.js, featuring user authentication, role-based access, and real-time updates.",
    type: "project",
    url: "https://github.com/example/nextjs-cms",
    author: "DevStudio",
    date: "2024-01-01",
    rating: 4.5,
    tags: ["cms", "dashboard", "auth"],
  },
  {
    id: 9,
    title: "Frontend Developer - Next.js Focus",
    description:
      "Exciting opportunity for a Frontend Developer specializing in Next.js. Work with a dynamic startup on innovative web applications.",
    type: "job",
    url: "https://example.com/frontend-job",
    author: "StartupXYZ",
    date: "2023-12-28",
    rating: 4.4,
    tags: ["frontend", "startup", "remote"],
  },
  {
    id: 10,
    title: "Next.js Video Course: Zero to Hero",
    description:
      "Complete video course covering Next.js from basics to advanced concepts. Includes 50+ hours of content and hands-on projects.",
    type: "video",
    url: "https://example.com/video-course",
    author: "CodeMaster",
    date: "2023-12-25",
    rating: 4.8,
    tags: ["beginner", "course", "projects"],
  },
]

const categoryConfig = {
  all: { 
    icon: Grid3X3, 
    label: "All Resources", 
    color: "text-gray-600 dark:text-gray-400",
    count: mockResources.length 
  },
  blog: { 
    icon: BookOpen, 
    label: "Blogs", 
    color: "text-blue-600 dark:text-blue-400",
    count: mockResources.filter(r => r.type === 'blog').length 
  },
  video: { 
    icon: Video, 
    label: "Videos", 
    color: "text-purple-600 dark:text-purple-400",
    count: mockResources.filter(r => r.type === 'video').length 
  },
  book: { 
    icon: FileText, 
    label: "Books", 
    color: "text-orange-600 dark:text-orange-400",
    count: mockResources.filter(r => r.type === 'book').length 
  },
  tool: { 
    icon: Wrench, 
    label: "Tools", 
    color: "text-green-600 dark:text-green-400",
    count: mockResources.filter(r => r.type === 'tool').length 
  },
  job: { 
    icon: Briefcase, 
    label: "Jobs", 
    color: "text-red-600 dark:text-red-400",
    count: mockResources.filter(r => r.type === 'job').length 
  },
  project: { 
    icon: FolderOpen, 
    label: "OS Projects", 
    color: "text-indigo-600 dark:text-indigo-400",
    count: mockResources.filter(r => r.type === 'project').length 
  },
}

const typeColors = {
  blog: "text-blue-500",
  video: "text-purple-500",
  tool: "text-green-500",
  book: "text-orange-500",
  job: "text-red-500",
  project: "text-indigo-500",
}

const RESOURCES_PER_PAGE = 4

// Newsletter Component
function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    
    // Simulate newsletter subscription
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail("")
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              Welcome to the DeepNext Community! 🎉
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              You're now subscribed to our newsletter. Get ready for amazing Next.js content delivered to your inbox!
            </p>
            <Button
              onClick={() => setIsSubscribed(false)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
            >
              Subscribe Another Email
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-blue-200 dark:border-blue-800 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl"></div>
        </div>
        
        <CardContent className="p-8 relative">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Stay Updated with DeepNext
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Get the latest Next.js resources, tutorials, and insights delivered straight to your inbox. Join our community of developers!
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 font-medium transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResources, setFilteredResources] = useState(mockResources)
  const [displayedResources, setDisplayedResources] = useState<typeof mockResources>([])
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const query = searchParams.get("q") || ""
    const type = searchParams.get("type") || "all"
    setSearchQuery(query)
    setSelectedType(type)
    filterResources(query, type)
    setCurrentPage(1)
  }, [searchParams, sortBy])

  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * RESOURCES_PER_PAGE
    setDisplayedResources(filteredResources.slice(startIndex, endIndex))
  }, [filteredResources, currentPage])

  const filterResources = (query: string, type: string) => {
    let filtered = mockResources

    if (query) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (type !== "all") {
      filtered = filtered.filter((resource) => resource.type === type)
    }

    // Sort resources
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredResources(filtered)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL(searchQuery, selectedType)
  }

  const handleCategoryChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
    setSidebarOpen(false)
    updateURL(searchQuery, type)
  }

  const updateURL = (query: string, type: string) => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (type !== "all") params.set("type", type)
    
    const queryString = params.toString()
    router.push(`/search${queryString ? `?${queryString}` : ''}`)
  }

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentPage(prev => prev + 1)
      setIsLoading(false)
    }, 500)
  }

  const hasMoreResources = displayedResources.length < filteredResources.length

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DN</span>
                </div>
                <span className="text-xl font-bold">DeepNext</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/submit" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Submit
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64  border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Sidebar Content - Now with sticky positioning */}
            <div className="sticky top-16 lg:top-0 max-h-screen overflow-y-auto">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground mb-2">Browse Resources</h2>
                <p className="text-sm text-muted-foreground">Discover Next.js content by category</p>
              </div>

              {/* Categories */}
              <nav className="p-4 space-y-2">
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const IconComponent = config.icon
                  const isActive = selectedType === key
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleCategoryChange(key)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200
                        ${isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : config.color}`} />
                        <span className="font-medium">{config.label}</span>
                      </div>
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className="text-xs"
                      >
                        {config.count}
                      </Badge>
                    </button>
                  )
                })}
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  <p>Total Resources: {mockResources.length}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for Next.js resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-16 py-3 md:py-4 text-base md:text-lg bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-lg"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 w-10 h-8 p-0 rounded-md"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Sort Filter */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">
                    {categoryConfig[selectedType as keyof typeof categoryConfig]?.label}
                  </h1>
                  {selectedType !== 'all' && (
                    <Badge variant="outline" className="capitalize">{selectedType}</Badge>
                  )}
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-background border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Latest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm md:text-base">
                  Showing {displayedResources.length} of {filteredResources.length} resources
                  {searchQuery && <span> for "{searchQuery}"</span>}
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {displayedResources.map((resource) => {
                  const config = categoryConfig[resource.type as keyof typeof categoryConfig]
                  const IconComponent = config?.icon || FileText
                  const iconColor = typeColors[resource.type as keyof typeof typeColors] || "text-gray-500"

                  return (
                    <Card
                      key={resource.id}
                      className= "border-border bg-transparent hover:border-muted-foreground/50 transition-all duration-200 hover:shadow-md"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${iconColor} mt-1 flex-shrink-0`} />
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-foreground hover:text-primary transition-colors text-base md:text-lg leading-tight">
                                  <Link href={resource.url} target="_blank" className="flex items-start gap-2 group">
                                    <span className="break-words">{resource.title}</span>
                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                  </Link>
                                </CardTitle>
                              </div>
                            </div>
                            <Badge variant="secondary" className="capitalize flex-shrink-0 text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm pl-8 md:pl-9">
                            <span className="text-muted-foreground">by {resource.author}</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {new Date(resource.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-muted-foreground">{resource.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <CardDescription className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
                          {resource.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Load More Button */}
              {hasMoreResources && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    variant="outline"
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Load More Resources
                      </>
                    )}
                  </Button>
                </div>
              )}

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    No resources found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {searchQuery 
                      ? `We couldn't find any resources matching "${searchQuery}". Try adjusting your search terms or browse by category.`
                      : "No resources found for the selected category."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedType("all")
                        updateURL("", "all")
                      }}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                    <Button
                      onClick={() => handleCategoryChange("all")}
                      variant="default"
                    >
                      Browse All Resources
                    </Button>
                  </div>
                </div>
              )}
                            {/* Newsletter Section */}
                            <div className="mt-16">
                <NewsletterSection />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DN</span>
                </div>
                <span className="text-xl font-bold">DeepNext</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your go-to platform for discovering the best Next.js resources, tutorials, and tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browse All</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Submit Resource</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Newsletter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Videos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tools</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Jobs</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 DeepNext. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm text-muted-foreground">for the Next.js community</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Theme Toggle Component (since it's imported but not defined)





// Main component wrapped in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}





