"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { predefinedThemes } from "@/app/dashboard/appearance/themes"

type Theme = {
  id: string
  name: string
  colors: {
    [key: string]: string
  }
}

type ThemeContextType = {
  theme: Theme | null
  setTheme: (themeId: string) => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: null, setTheme: () => {} })

export function ThemeProvider({
  children,
  defaultTheme = "neon-green",
  suppressHydrationWarning = false,
}: {
  children: React.ReactNode
  defaultTheme?: string
  suppressHydrationWarning?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<Theme | null>(() => {
    if (typeof window !== 'undefined') {
      const savedThemeId = localStorage.getItem("arAIse-theme")
      if (savedThemeId) {
        const savedTheme = predefinedThemes.find((t) => t.id === savedThemeId)
        if (savedTheme) return savedTheme
      }
    }
    return predefinedThemes.find((t) => t.id === defaultTheme) || predefinedThemes[0]
  })

  useEffect(() => {
    setMounted(true)
    const savedThemeId = localStorage.getItem("arAIse-theme")
    if (savedThemeId) {
      const savedTheme = predefinedThemes.find((t) => t.id === savedThemeId)
      if (savedTheme) {
        setThemeState(savedTheme)
        applyTheme(savedTheme)
      }
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    if (!mounted) return
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      const rgb = hexToRgb(value)
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
        root.style.setProperty(`--${key}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      }
    })
    localStorage.setItem("arAIse-theme", theme.id)
  }

  const setTheme = (themeId: string) => {
    if (!mounted) return
    const newTheme = predefinedThemes.find((t) => t.id === themeId)
    if (newTheme) {
      setThemeState(newTheme)
      localStorage.setItem("arAIse-theme", themeId)
      applyTheme(newTheme)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted && !suppressHydrationWarning) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Helper functions
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

