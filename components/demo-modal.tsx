"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string // Changed from demoUrl to videoUrl
  title: string
}

export function DemoModal({ isOpen, onClose, videoUrl, title }: DemoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <div className="flex justify-between items-center p-4 border-b border-primary/10">
          <h2 className="text-lg font-semibold text-primary">{title} Demo</h2>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative w-full h-full">
          <video className="w-full h-[calc(80vh-60px)] object-contain" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  )
}

