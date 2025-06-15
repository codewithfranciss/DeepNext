"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SubmitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    url: "",
    authorName: "",
    authorImage: "",
    description: "",
    tags: "",
    platform: "",
  })
  const [tagsList, setTagsList] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag.trim() && !tagsList.includes(currentTag.trim().toLowerCase())) {
      setTagsList((prev) => [...prev, currentTag.trim().toLowerCase()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTagsList((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically send the data to your API
    console.log("Submitted data:", {
      ...formData,
      tags: tagsList,
    })

    setIsSubmitting(false)

    // Show success message or redirect
    alert("Resource submitted successfully! It will be reviewed by our community.")
    router.push("/")
  }

  const isFormValid =
    formData.type &&
    formData.title &&
    formData.url &&
    formData.authorName &&
    formData.description &&
    tagsList.length > 0

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
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">📝 Add a Resource to DeepNext</h1>
          <p className="text-muted-foreground">
            Help the community discover amazing Next.js resources by submitting your favorites.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Resource Details</CardTitle>
            <CardDescription>Fill out the form below to submit a new resource for community review.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resource Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Resource Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="article">📄 Article</SelectItem>
                    <SelectItem value="video">🎥 Video</SelectItem>
                    <SelectItem value="book">📚 Book</SelectItem>
                    <SelectItem value="tool">🔧 Tool</SelectItem>
                    <SelectItem value="template">🎨 Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter the resource title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="bg-background border-border"
                  required
                />
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="url">URL (link to blog/video/tool) *</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/resource"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  className="bg-background border-border"
                  required
                />
              </div>

              {/* Author Name */}
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  type="text"
                  placeholder="Enter the author's name"
                  value={formData.authorName}
                  onChange={(e) => handleInputChange("authorName", e.target.value)}
                  className="bg-background border-border"
                  required
                />
              </div>

              {/* Author Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="authorImage">Author Profile Image (optional)</Label>
                <Input
                  id="authorImage"
                  type="url"
                  placeholder="https://example.com/profile-image.jpg"
                  value={formData.authorImage}
                  onChange={(e) => handleInputChange("authorImage", e.target.value)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">Provide a URL to the authors profile image or avatar</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (1–2 sentences) *</Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe what this resource covers and why it's valuable..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-background border-border min-h-[80px] resize-none"
                  maxLength={200}
                  required
                />
                <p className="text-xs text-muted-foreground">{formData.description.length}/200 characters</p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (e.g. auth, ssg, vercel) *</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tagsList.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    type="text"
                    placeholder="Add a tag and press Enter"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-background border-border flex-1"
                  />
                  <Button type="button" onClick={addTag} size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Add relevant tags to help users discover this resource</p>
              </div>

              {/* Platform */}
              <div className="space-y-2">
                <Label htmlFor="platform">Platform (e.g. Dev.to, YouTube)</Label>
                <Input
                  id="platform"
                  type="text"
                  placeholder="Enter the platform name"
                  value={formData.platform}
                  onChange={(e) => handleInputChange("platform", e.target.value)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">Where is this resource published? (optional)</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Resource ✅</>
                  )}
                </Button>
                {!isFormValid && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Please fill in all required fields and add at least one tag
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-6 bg-muted/30 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Resources should be high-quality and relevant to Next.js development</p>
            <p>• Avoid duplicate submissions - check if the resource already exists</p>
            <p>• Provide accurate and descriptive information</p>
            <p>• All submissions are reviewed by the community before being published</p>
            <p>• Spam or low-quality submissions will be rejected</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
