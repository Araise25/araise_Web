"use client"

import TerminalComponent from "@/components/terminal-modal"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

export default function TerminalPage() {
  const [showUhOh, setShowUhOh] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.7)
  const router = useRouter()

  useEffect(() => {
    // Load background from local storage if available
    const savedBackground = localStorage.getItem("araiseBackground")
    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }

    const savedOpacity = localStorage.getItem("araiseBackgroundOpacity")
    if (savedOpacity) {
      setBackgroundOpacity(Number.parseFloat(savedOpacity))
    }
  }, [])

  const saveBackground = (image: string, opacity: number) => {
    setBackgroundImage(image)
    setBackgroundOpacity(opacity)
    if (image) {
      localStorage.setItem("araiseBackground", image)
      localStorage.setItem("araiseBackgroundOpacity", opacity.toString())
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent">
        <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-transparent">
          {backgroundImage && (
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: backgroundOpacity,
              }}
            />
          )}
          <div className="z-10 w-full max-w-5xl">
            <TerminalComponent
              setShowUhOh={setShowUhOh}
              saveBackground={saveBackground}
              backgroundOpacity={backgroundOpacity}
              onBookClick={() => router.push("/dashboard/blog")}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

