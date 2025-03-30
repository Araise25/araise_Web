"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, Image } from "lucide-react"
import { toast } from "sonner"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

export function BackgroundCustomizer() {
  const [opacity, setOpacity] = useState(() => {
    const saved = localStorage.getItem("arAIse-background-opacity")
    return saved ? Number.parseFloat(saved) : 0.7
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

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

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setOpacity(newOpacity)
    localStorage.setItem("arAIse-background-opacity", newOpacity.toString())
    window.dispatchEvent(new Event("background-changed"))
    toast.success("Opacity updated")
  }

  const removeBackground = () => {
    localStorage.removeItem("arAIse-background")
    localStorage.removeItem("arAIse-background-opacity")
    window.dispatchEvent(new Event("background-changed"))
    toast.success("Background removed")
  }

  return (
    <Card className="border border-primary/20 bg-black">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <Image className="mr-2 h-5 w-5" />
          Background Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <div className="text-sm text-muted-foreground">Maximum file size: 2MB. Supported formats: JPG, PNG, GIF</div>
        </div>

        <div className="space-y-2">
          <Label>Background Opacity</Label>
          <Slider defaultValue={[opacity]} max={1} min={0} step={0.05} onValueChange={handleOpacityChange} />
          <div className="text-sm text-muted-foreground">{Math.round(opacity * 100)}%</div>
        </div>
      </CardContent>
    </Card>
  )
}

