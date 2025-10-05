"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.7)

  useEffect(() => {
    setMounted(true)

    // Load background from local storage if available
    const savedBackground = localStorage.getItem("araiseBackground")
    const showWallpaper = localStorage.getItem("araise-show-wallpaper") !== "false"

    if (savedBackground && showWallpaper) {
      setBackgroundImage(savedBackground)
    }

    const savedOpacity = localStorage.getItem("araiseBackgroundOpacity")
    if (savedOpacity) {
      setBackgroundOpacity(Number.parseFloat(savedOpacity))
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto,1fr] flex-1 bg-transparent">
        <AppSidebar />
        <SidebarInset className="p-0 bg-transparent">
          <div className="relative flex flex-col min-h-screen">
            {backgroundImage && (
              <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  opacity: backgroundOpacity,
                }}
              />
            )}

            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 right-4 z-50 border-primary hover:bg-primary/10"
              onClick={() => router.push("/terminal")}
            >
              <Terminal className="h-5 w-5 text-primary" />
            </Button>

            <main className="flex-1 p-4 md:p-8 overflow-auto relative z-10">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

