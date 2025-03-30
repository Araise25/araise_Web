"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface EmbeddedVideoProps {
  title: string
  description?: string
  embedUrl: string
  originalUrl: string
  aspectRatio?: "16:9" | "4:3" | "1:1"
}

export function EmbeddedVideo({ title, description, embedUrl, originalUrl, aspectRatio = "16:9" }: EmbeddedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Calculate padding based on aspect ratio
  const getPaddingBottom = () => {
    switch (aspectRatio) {
      case "16:9":
        return "56.25%"
      case "4:3":
        return "75%"
      case "1:1":
        return "100%"
      default:
        return "56.25%"
    }
  }

  return (
    <Card className="border border-primary/20 bg-black overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative" style={{ paddingBottom: getPaddingBottom() }}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center">
                <p className="text-primary mb-2">Loading video...</p>
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </div>
        <div className="p-4 flex justify-end">
          <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10" asChild>
            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-4 w-4" />
              View Original
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

