"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push("/dashboard")
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight glitch-text">Welcome to araise</h1>
        <p className="text-xl md:text-2xl animate-pulse">Bringing AI closer!!</p>
        <div className="mt-12 animate-bounce">
          <Button
            variant="outline"
            className="text-lg border-green-500 hover:bg-green-900/20 group"
            onClick={() => router.push("/dashboard")}
          >
            Enter the Dungeon
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <p className="text-sm mt-4 animate-pulse">Press Enter or click the button to continue</p>
      </div>

      {/* ASCII Art Background */}
      <div className="fixed inset-0 z-[-1] opacity-10 text-xs overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {Array.from({ length: 200 }).map((_, j) => (
              <span key={j}>{String.fromCharCode(Math.floor(Math.random() * 93) + 33)}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

