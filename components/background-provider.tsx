"use client"

import type React from "react"

import { useEffect } from "react"

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateBackground = () => {
      const background = localStorage.getItem("arAIse-background")
      const opacity = localStorage.getItem("arAIse-background-opacity") || "0.7"

      if (background) {
        document.body.style.backgroundImage = `url(${background})`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundAttachment = "fixed"
        document.body.style.opacity = opacity
      } else {
        document.body.style.backgroundImage = ""
        document.body.style.opacity = "1"
      }
    }

    // Initial load
    updateBackground()

    // Listen for background changes
    window.addEventListener("background-changed", updateBackground)

    return () => {
      window.removeEventListener("background-changed", updateBackground)
    }
  }, [])

  return <>{children}</>
}

