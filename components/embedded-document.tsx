"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"

interface EmbeddedDocumentProps {
  title: string
  description?: string
  embedUrl: string
  originalUrl: string
  height?: string
}

export function EmbeddedDocument({
  title,
  description,
  embedUrl,
  originalUrl,
  height = "600px",
}: EmbeddedDocumentProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="border border-primary/20 bg-black overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-primary">
          <FileText className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative" style={{ height }}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center">
                <p className="text-primary mb-2">Loading document...</p>
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
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

