"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Globe, Linkedin, Mail, User, Twitter } from "lucide-react"
import Link from "next/link"
import { getTeamMembers, type TeamMember } from "@/lib/data"

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const teamMembers = getTeamMembers()

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight terminal-text">Team</h1>
        <p className="text-muted-foreground">Meet the team behind arAIse</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className="border border-primary/20 bg-black hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <CardHeader className="pb-2 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-primary">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                {member.links.github && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <Link href={member.links.github} target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {member.links.x && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <Link href={member.links.x} target="_blank">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {member.links.website && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <Link href={member.links.website} target="_blank">
                      <Globe className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-primary/30 text-primary text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 justify-center">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/10"
                onClick={() => setSelectedMember(member)}
              >
                <User className="mr-1 h-4 w-4" />
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="sm:max-w-[600px] bg-black border-primary/30">
            <DialogHeader>
              <DialogTitle className="text-primary text-center">{selectedMember.name}</DialogTitle>
              <DialogDescription className="text-center">{selectedMember.role}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {selectedMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex space-x-2">
                  {selectedMember.links.github && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={selectedMember.links.github} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {selectedMember.links.x && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={selectedMember.links.x} target="_blank">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {selectedMember.links.linkedin && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={selectedMember.links.linkedin} target="_blank">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {selectedMember.links.website && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={selectedMember.links.website} target="_blank">
                        <Globe className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                {selectedMember.email && (
                  <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10" asChild>
                    <Link href={`mailto:${selectedMember.email}`}>
                      <Mail className="mr-1 h-4 w-4" />
                      Contact
                    </Link>
                  </Button>
                )}
              </div>

              <div className="flex-1">
                <Tabs defaultValue="bio">
                  <TabsList className="grid grid-cols-3 bg-black border border-primary/20">
                    <TabsTrigger
                      value="bio"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Bio
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Skills
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Projects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="bio" className="mt-4 text-sm text-muted-foreground">
                    <p>{selectedMember.bio}</p>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMember.skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2 bg-primary/5 p-2 rounded-md">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="projects" className="mt-4">
                    <div className="space-y-3">
                      {selectedMember.projects.map((project) => (
                        <div key={project.name} className="border border-primary/10 rounded-md p-3">
                          <h4 className="text-sm font-medium text-primary">{project.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
                          {project.link && (
                            <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary" asChild>
                              <Link href={project.link} target="_blank">
                                View Project
                              </Link>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

