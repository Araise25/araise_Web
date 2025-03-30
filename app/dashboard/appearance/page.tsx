"use client"

import type React from "react"

import { useTheme } from "@/components/theme-provider"
import { predefinedThemes } from "./themes"
import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, AlertTriangle, Check, Sliders, Upload, Trash2, Image } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [opacity, setOpacity] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseFloat(localStorage.getItem("arAIse-background-opacity") || "0.7")
    }
    return 0.7
  })

  useEffect(() => {
    setMounted(true)
    // Check and clear any existing backgrounds
    const keysToCheck = ["arAIse-background", "arAIseBackground", "arAIse-wallpaper-url", "arAIse-show-wallpaper"]

    // Log existing values (for debugging)
    keysToCheck.forEach((key) => {
      const value = localStorage.getItem(key)
      if (value) {
        console.log(`Found existing background in ${key}`)
      }
    })
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size must be less than 2MB")
        toast.error("File size must be less than 2MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file")
        toast.error("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          localStorage.setItem("arAIse-background", event.target.result as string)
          window.dispatchEvent(new Event("background-changed"))
          toast.success("Background updated successfully")
        }
      }
      reader.onerror = () => {
        setError("Error reading file")
        toast.error("Error reading file")
      }
      reader.readAsDataURL(file)
    }
  }

  const removeBackground = () => {
    // Remove all possible background-related items
    localStorage.removeItem("arAIse-background")
    localStorage.removeItem("arAIseBackground")
    localStorage.removeItem("arAIse-wallpaper-url")
    localStorage.removeItem("arAIse-show-wallpaper")

    // Reset body styles
    document.body.style.backgroundImage = ""
    document.body.style.opacity = "1"

    window.dispatchEvent(new Event("background-changed"))
    toast.success("Background removed")
  }

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setOpacity(newOpacity)
    localStorage.setItem("arAIse-background-opacity", newOpacity.toString())
    document.body.style.opacity = newOpacity.toString()
    window.dispatchEvent(new Event("background-changed"))
    toast.success("Opacity updated")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8">
      <Card className="border border-primary/20 bg-black overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Palette className="mr-2 h-5 w-5" />
            Theme Selection
          </CardTitle>
          <CardDescription>Choose a theme to customize the appearance of arAIse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedThemes.map((themeOption) => (
              <div
                key={themeOption.id}
                className={`border rounded-md p-4 cursor-pointer transition-all ${
                  theme?.id === themeOption.id
                    ? "border-primary bg-primary/10"
                    : "border-primary/20 hover:border-primary/50"
                }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">{themeOption.name}</span>
                  {theme?.id === themeOption.id && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(themeOption.colors).map(([key, value]) => (
                    <div key={key} className="w-full h-6 rounded" style={{ backgroundColor: value }} title={key} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20 bg-black">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Image className="mr-2 h-5 w-5" />
            Background Image
          </CardTitle>
          <CardDescription>Customize your background wallpaper</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive" className="bg-yellow-500/10 border-yellow-500/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Custom backgrounds may affect readability with certain themes. Choose an image that maintains good
              contrast with the selected theme.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <Button variant="destructive" onClick={removeBackground}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="text-sm text-muted-foreground">
              Maximum file size: 2MB. Supported formats: JPG, PNG, GIF
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20 bg-black">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Sliders className="mr-2 h-5 w-5" />
            Background Opacity
          </CardTitle>
          <CardDescription>Adjust the opacity of the background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive" className="bg-yellow-500/10 border-yellow-500/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Adjusting opacity may affect text readability. Choose a value that maintains good contrast.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Background Opacity</Label>
            <Slider defaultValue={[opacity]} max={1} min={0} step={0.05} onValueChange={handleOpacityChange} />
            <div className="text-sm text-muted-foreground">{Math.round(opacity * 100)}%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

