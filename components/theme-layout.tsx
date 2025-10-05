"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"

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
      background: "#000000",
      foreground: "#ffffff",
      primary: "#10b981",
      secondary: "#1f2937",
      accent: "#374151",
      border: "#374151",
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

export function ThemeLayout({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<string>("default")

  useEffect(() => {
    const savedTheme = localStorage.getItem("araise-theme")
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
      localStorage.setItem("araise-theme", themeId)
      setCurrentTheme(themeId)
    }
  }

  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto,1fr] flex-1">
        <AppSidebar />
        <SidebarInset className="p-0">
          <div className="relative flex flex-col min-h-screen">
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 right-4 z-50 border-green-500 hover:bg-green-900/20"
            >
              <Terminal className="h-5 w-5 text-green-500" />
            </Button>

            <main className="flex-1 p-4 md:p-8 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {predefinedThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentTheme === theme.id
                        ? "border-2 border-primary"
                        : "border border-border hover:border-primary/50"
                    }`}
                    onClick={() => applyTheme(theme.id)}
                    style={{
                      background: theme.colors.background,
                      color: theme.colors.foreground,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{theme.name}</span>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(theme.colors)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: value }}
                            title={key}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

