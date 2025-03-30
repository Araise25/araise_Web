"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function WallpaperContainer() {
  const [wallpaperStyle, setWallpaperStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const wallpaperUrl = localStorage.getItem("arAIse-wallpaper-url")
    const showWallpaper = localStorage.getItem("arAIse-show-wallpaper") === "true"
    const opacity = localStorage.getItem("arAIse-wallpaper-opacity") || "0.7"

    if (showWallpaper && wallpaperUrl) {
      setWallpaperStyle({
        backgroundImage: `url(${wallpaperUrl})`,
        opacity: Number(opacity),
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0" style={wallpaperStyle} />
  )
}

