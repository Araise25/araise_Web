"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { getBlogPostsByCategory, type BlogPost } from "@/lib/data"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const blogPosts = getBlogPostsByCategory(selectedCategory)

  const renderPosts = (posts: BlogPost[]) => (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setSelectedPost(post)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
            All Posts
          </TabsTrigger>
          <TabsTrigger value="tech" onClick={() => setSelectedCategory("tech")}>
            Tech
          </TabsTrigger>
          <TabsTrigger value="design" onClick={() => setSelectedCategory("design")}>
            Design
          </TabsTrigger>
          <TabsTrigger value="updates" onClick={() => setSelectedCategory("updates")}>
            Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderPosts(blogPosts)}</TabsContent>

        <TabsContent value="tech">{renderPosts(blogPosts)}</TabsContent>

        <TabsContent value="design">{renderPosts(blogPosts)}</TabsContent>

        <TabsContent value="updates">{renderPosts(blogPosts)}</TabsContent>
      </Tabs>

      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
        {selectedPost && (
          <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full overflow-y-auto p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-4xl font-bold">{selectedPost.title}</DialogTitle>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {selectedPost.category}
                </Badge>
              </div>
              <DialogDescription className="flex items-center gap-2 text-lg mt-4">
                <Calendar className="h-5 w-5" />
                {selectedPost.date}
              </DialogDescription>
            </DialogHeader>
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
            <div className="flex items-center gap-4 border-t border-primary/10 pt-6 mt-8">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedPost.authorImage} alt={selectedPost.author} />
                <AvatarFallback className="text-xl">{selectedPost.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-medium">{selectedPost.author}</p>
                <p className="text-lg text-muted-foreground">{selectedPost.authorRole}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
