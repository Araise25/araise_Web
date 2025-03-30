"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Settings, HelpCircle, FolderGit, Users, Mail, FileText, TerminalSquare } from "lucide-react"
import { TerminalModal } from "@/components/terminal-modal"

const navItems = [
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderGit,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Contact",
    href: "/dashboard/contact",
    icon: Mail,
  },
  {
    title: "Contribute",
    href: "/dashboard/contribute",
    icon: FileText,
  },
  {
    title: "Colors",
    href: "/dashboard/colors",
    icon: HelpCircle,
  },
]

export function TopNav() {
  const pathname = usePathname()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  const handleTerminalHover = (isHovering: boolean) => {
    setIsTerminalOpen(isHovering)
  }

  return (
    <>
      <header className="border-b border-primary/10 bg-black">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="mr-6">
            <span className="text-lg font-bold text-primary">arAIse</span>
          </Link>

          <nav className="flex-1 flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                    "hover:bg-primary/10",
                    pathname === item.href ? "text-primary bg-primary/10" : "text-primary/60",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          <TooltipProvider>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/colors">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" size="icon" className="bg-primary/90 hover:bg-primary">
                      <Settings className="h-5 w-5 text-primary-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
              </Link>
              <div
                className="group relative"
                onMouseEnter={() => handleTerminalHover(true)}
                onMouseLeave={() => handleTerminalHover(false)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" size="icon" className="bg-primary/90 hover:bg-primary relative">
                      <span className="sr-only">Open Terminal</span>
                      <TerminalSquare className="h-5 w-5 text-primary-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Terminal</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </header>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  )
}

