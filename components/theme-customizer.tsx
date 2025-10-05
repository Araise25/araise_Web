"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [wallpaperOpacity, setWallpaperOpacity] = React.useState(0.5)
  const [showWallpaper, setShowWallpaper] = React.useState(true)
  const [userName, setUserName] = React.useState(() => localStorage.getItem("araise-username") || "")
  const [backgroundColor, setBackgroundColor] = React.useState(
    () => localStorage.getItem("araise-background-color") || "neon-green",
  )

  const backgroundColors = {
    deepBlue: "Deep Blue (#0a1929)",
    matrix: "Matrix Green (#001a00)",
    midnight: "Midnight Purple (#1a0033)",
    cyberpunk: "Cyberpunk Black (#0d0221)",
    warmDark: "Warm Dark (#1a1a1a)",
    oceanDark: "Ocean Dark (#001a2c)",
    forestDark: "Forest Dark (#0a1f0a)",
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setUserName(newName)
    localStorage.setItem("araise-username", newName)
    toast.success("Name updated")
  }

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color)
    localStorage.setItem("araise-background-color", color)
    document.documentElement.style.setProperty("--background", getBackgroundColorValue(color))
    toast.success("Background color updated")
  }

  const getBackgroundColorValue = (color: string) => {
    const colors = {
      deepBlue: "217 65% 10%",
      matrix: "120 100% 5%",
      midnight: "270 100% 10%",
      cyberpunk: "276 89% 9%",
      warmDark: "0 0% 10%",
      oceanDark: "200 100% 9%",
      forestDark: "120 50% 8%",
    }
    return colors[color as keyof typeof colors]
  }

  const handleOpacityChange = (value: number[]) => {
    setWallpaperOpacity(value[0])
    toast.success("Wallpaper opacity updated")
  }

  const handleWallpaperToggle = (checked: boolean) => {
    setShowWallpaper(checked)
    toast.success(checked ? "Wallpaper enabled" : "Wallpaper disabled")
  }

  return (
    <div>
      <div>
        <h3 className="mb-4 text-lg font-medium">Appearance Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Select value={backgroundColor} onValueChange={handleBackgroundColorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select background color" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(backgroundColors).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="wallpaper">Show Wallpaper</Label>
            <Switch id="wallpaper" checked={showWallpaper} onCheckedChange={handleWallpaperToggle} />
          </div>

          {showWallpaper && (
            <div className="space-y-2">
              <Label>Wallpaper Opacity</Label>
              <Slider
                defaultValue={[wallpaperOpacity]}
                max={1}
                min={0}
                step={0.1}
                onValueChange={handleOpacityChange}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Color Scheme</h3>
        <div className="grid gap-2">
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="w-full"
          >
            Dark
          </Button>
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="w-full"
          >
            Light
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            onClick={() => setTheme("system")}
            className="w-full"
          >
            System
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

