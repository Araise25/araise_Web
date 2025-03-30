import projectsData from "@/data/projects.json"
import teamData from "@/data/team.json"
import blogData from "@/data/blog.json"
import contactData from "@/data/contact.json"

export type Project = (typeof projectsData)[0]
export type TeamMember = (typeof teamData)[0]
export type BlogPost = (typeof blogData)[0]
export type ContactInfo = typeof contactData

export function getProjects() {
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

export function getBlogPosts() {
  return blogData
}

export function getBlogPost(id: number) {
  return blogData.find((post) => post.id === id)
}

export function getBlogPostsByCategory(category: string) {
  if (category === "all") {
    return blogData
  }
  return blogData.filter((post) => post.category === category)
}

export function getContactInfo() {
  return contactData
}

