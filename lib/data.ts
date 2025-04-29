import projectsData from '@/data/projects.json'
import teamData from '@/data/team.json'
import contactData from '@/data/contact.json'
import blogData from "@/data/blog.json"
export type BlogPost = (typeof blogData)[0]

export type Project = {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  githubUrl: string
  lastUpdated: string
  longDescription: string
  features: string[]
  installCommands?: {
    os: string
    command: string
    description: string
  }[]
}

export type TeamMember = {
  id: number
  name: string
  role: string
  image: string
  bio: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
}

export type ContactInfo = {
  email: string
  github: string
  twitter: string
  officeHours: string
  responseTime: string
  urgentNote: string
  faqs: {
    question: string
    answer: string
  }[]
}

export function getProjects(): Project[] {
  return projectsData
}

export function getProject(id: string) {
  return projectsData.find((project) => project.id === id)
}

export function getTeamMembers() {
  return teamData
}

export function getTeamMember(id: number) {
  return teamData.find((member) => member.id === id)
}

export function getContactInfo(): ContactInfo {
  return contactData
}

export function getBlogPostsByCategory(category: string) {
  if (category === "all") {
    return blogData
  }
  return blogData.filter((post) => post.category === category)
}