"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DemoModal } from "@/components/demo-modal"
import { getProjects } from "@/lib/data"

export default function ProjectsPage() {
  const [selectedDemo, setSelectedDemo] = useState<{ videoUrl: string; title: string } | null>(null)
  const projects = getProjects()

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight terminal-text">Projects</h1>
        <p className="text-muted-foreground">Explore available projects with descriptions and links</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="border border-primary/20 bg-black pixel-corners overflow-hidden hover:border-primary/50 transition-all"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center text-primary">
                  <Briefcase className="mr-2 h-5 w-5" />
                  {project.title}
                </CardTitle>
                <div className="flex space-x-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/30 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="mb-2">{project.longDescription}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-primary/10 pt-4">
              <div className="text-xs text-muted-foreground">Last updated: {project.lastUpdated}</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() =>
                    setSelectedDemo({
                      videoUrl: project.videoUrl,
                      title: project.title,
                    })
                  }
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedDemo && (
        <DemoModal
          isOpen={true}
          onClose={() => setSelectedDemo(null)}
          videoUrl={selectedDemo.videoUrl}
          title={selectedDemo.title}
        />
      )}
    </div>
  )
}

