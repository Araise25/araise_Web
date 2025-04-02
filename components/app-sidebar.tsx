"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Briefcase, Contact, Github, Home, Palette, Users, BookOpen, Terminal } from "lucide-react"

type ColorTheme = {
  id: string
  name: string
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    border: string
    muted?: string
    "muted-foreground"?: string
  }
}

const predefinedThemes: ColorTheme[] = [
  {
    id: "default",
    name: "Default Green",
    colors: {
      background: "#241b2f",
      foreground: "#f8f8f2",
      primary: "#ff79c6",
      secondary: "#2d1b40",
      accent: "#3b2954",
      border: "#3b2954",
    },
  },
  {
    id: "blue",
    name: "Cyberpunk Blue",
    colors: {
      background: "#0f172a",
      foreground: "#e2e8f0",
      primary: "#3b82f6",
      secondary: "#1e293b",
      accent: "#334155",
      border: "#334155",
    },
  },
  {
    id: "amber",
    name: "Retro Amber",
    colors: {
      background: "#000000",
      foreground: "#ffb000",
      primary: "#ff9800",
      secondary: "#2c2c2c",
      accent: "#3d3d3d",
      border: "#3d3d3d",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    colors: {
      background: "#0c0c0c",
      foreground: "#33ff33",
      primary: "#00cc00",
      secondary: "#1a1a1a",
      accent: "#2a2a2a",
      border: "#2a2a2a",
    },
  },
  {
    id: "synthwave",
    name: "Synthwave",
    colors: {
      background: "#241b2f",
      foreground: "#f8f8f2",
      primary: "#ff79c6",
      secondary: "#2d1b40",
      accent: "#3b2954",
      border: "#3b2954",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    colors: {
      background: "#0f0f23",
      foreground: "#cccccc",
      primary: "#ffff66",
      secondary: "#1a1a34",
      accent: "#252550",
      border: "#252550",
    },
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">("left")
  const [currentTheme, setCurrentTheme] = useState<string>("default")

  useEffect(() => {
    const savedPosition = localStorage.getItem("arAIse-sidebar-position")
    if (savedPosition === "left" || savedPosition === "right") {
      setSidebarPosition(savedPosition)
    }

    const savedTheme = localStorage.getItem("arAIse-theme")
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (themeId: string) => {
    const theme = predefinedThemes.find((t) => t.id === themeId)
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
      localStorage.setItem("arAIse-theme", themeId)
      setCurrentTheme(themeId)
    }
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="transition-all duration-300 bg-black/80 border-border/50 backdrop-blur-sm"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              {localStorage.getItem("arAIse-username") || "arAIse"}
            </span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip="Dashboard"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/projects"}
                  tooltip="Projects"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard/projects">
                    <Briefcase className="h-5 w-5" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/blog"}
                  tooltip="Blog"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard/blog">
                    <BookOpen className="h-5 w-5" />
                    <span>Blog</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/contribute"}
                  tooltip="Contribute"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard/contribute">
                    <Github className="h-5 w-5" />
                    <span>Contribute</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/contact"}
                  tooltip="Contact"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard/contact">
                    <Contact className="h-5 w-5" />
                    <span>Contact</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/team"}
                  tooltip="Team"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/dashboard/team">
                    <Users className="h-5 w-5" />
                    <span>Team</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/terminal"}
                  tooltip="Terminal"
                  className="hover:translate-x-1 hover:scale-105"
                >
                  <Link href="/terminal">
                    <Terminal className="h-5 w-5" />
                    <span>Terminal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Customize</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/appearance"} tooltip="Appearance">
                  <Link href="/dashboard/appearance">
                    <Palette className="h-5 w-5" />
                    <span>Appearance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}

