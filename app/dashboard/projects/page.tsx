"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Github, Copy, Check, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getProjects } from "@/lib/data"

export default function ProjectsPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null)
  const projects = getProjects()

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("win") !== -1) setCurrentPlatform("windows");
    else if (userAgent.indexOf("mac") !== -1) setCurrentPlatform("mac");
    else if (userAgent.indexOf("linux") !== -1) setCurrentPlatform("linux");
    else setCurrentPlatform(null);
  }, []);

  const copyToClipboard = (command: string, id: string) => {
    navigator.clipboard.writeText(command)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

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

                {project.installCommands && project.installCommands.length > 0 ? (
                  currentPlatform && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-semibold text-primary">Installation Command:</h4>
                      {project.installCommands
                        .filter(cmd => cmd.os.toLowerCase() === currentPlatform)
                        .map((cmd, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-black/40 p-3 rounded-md border border-primary/20"
                          >
                            <div className="flex items-center space-x-2">
                              <code className="font-mono text-primary text-sm">
                                {cmd.command}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="border-primary/30">
                                {cmd.os}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-primary hover:text-primary/80"
                                onClick={() => copyToClipboard(cmd.command, `${project.id}-${cmd.os}`)}
                              >
                                {copiedCommand === `${project.id}-${cmd.os}` ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                                <span className="sr-only">Copy command</span>
                              </Button>
                            </div>
                          </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="mt-4 p-3 rounded-md bg-black/40 border border-primary/20">
                    <p className="text-sm text-muted-foreground">No installation commands available for this project.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-primary/10 pt-4">
              <div className="text-xs text-muted-foreground">Last updated: {project.lastUpdated}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                  <Link href="/dashboard/blog">
                    <BookOpen className="mr-1 h-4 w-4" />
                    Blog
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

