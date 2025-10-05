"use client"

import type React from "react"
import { useEffect, useState, useRef, type ReactNode } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Terminal,
  HelpCircle,
  FolderGit,
  Mail,
  Github,
  GitBranch,
  GitPullRequest,
  Bug,
  Upload,
  ExternalLink,
  MessageSquare,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { themes, initializeTheme, applyTheme, getCurrentTheme } from "@/lib/theme-utils"
import { getProjects, getContactInfo } from "@/lib/data"

// First, add this type definition at the top of your file
type Project = {
  id: string
  title: string
  longDescription: string
  githubUrl: string
  features?: string[]  // Make it optional with ?
  mediumUrl: string
  // Add other project properties as needed
}

// ================ COMMAND OUTPUT ================

type CommandOutputProps = {
  children: ReactNode
}

const CommandOutput = ({ children }: CommandOutputProps) => {
  return <div className="pl-6">{children}</div>
}

// ================ COMMAND LINE ================

type CommandLineProps = {
  currentCommand: string
  setCurrentCommand: (command: string) => void
  executeCommand: (command: string) => void
  className?: string
}

const CommandLine = ({ currentCommand, setCurrentCommand, executeCommand, className = "" }: CommandLineProps) => {
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Blink cursor
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex items-center mt-4 cursor-text" onClick={handleClick}>
      <span className="text-blue-400 mr-2">guest@araise:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`bg-transparent outline-none flex-1 w-full ${className}`}
        autoFocus
      />
      <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} ml-0.5`}>█</span>
    </div>
  )
}

// ================ UH OH PAGE ================

type UhOhPageProps = {
  onReturn: () => void
}

const UhOhPage = ({ onReturn }: UhOhPageProps) => {
  return (
    <div className="w-full h-[80vh] bg-black rounded-md border border-primary/20 flex flex-col items-center justify-center p-4 font-mono text-red-500">
      <div className="text-center mb-8">
        <pre className="text-xl md:text-3xl font-bold mb-2 whitespace-pre-wrap">
          {`
██╗   ██╗██╗  ██╗     ██████╗ ██╗  ██╗
██║   ██║██║  ██║    ██╔═══██╗██║  ██║
██║   ██║███████║    ██║   ██║███████║
██║   ██║██╔══██║    ██║   ██║██╔══██║
╚██████╔╝██║  ██║    ╚██████╔╝██║  ██║
 ╚═════╝ ╚═╝  ╚═╝     ╚═════╝ ╚═╝  ╚═╝
`}
        </pre>
        <p className="text-xl text-yellow-400 mb-4">You shouldn&apos;t have done that...</p>
        <button
          onClick={onReturn}
          className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded transition-colors"
        >
          Return to safety
        </button>
      </div>
    </div>
  )
}

// ================ THEME SWITCHER ================

type ThemeSwitcherProps = {
  currentTheme: string
  setTheme: (theme: string) => void
}

function ThemeSwitcher({ currentTheme, setTheme }: ThemeSwitcherProps) {
  // Initialize theme on component mount
  useEffect(() => {
    // Apply the current theme to the document
    applyTheme(currentTheme)
  }, [currentTheme])

  // Handle theme change
  const handleThemeChange = (themeName: string) => {
    setTheme(themeName)
    applyTheme(themeName)
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {themes.map((theme) => (
        <div
          key={theme.name}
          className={`p-3 rounded cursor-pointer border ${
            currentTheme === theme.name ? "border-blue-500" : "border-gray-700"
          }`}
          onClick={() => handleThemeChange(theme.name)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.color }}></div>
            <span>{theme.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ================ HELP SECTION ================

type HelpSectionProps = {
  executeCommand?: (command: string) => void
}

const HelpSection = ({ executeCommand }: HelpSectionProps) => {
  const handleCommandClick = (command: string) => {
    if (executeCommand) {
      executeCommand(command)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-2">Available Commands:</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("help")}
        >
          <HelpCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">help</div>
            <div className="text-gray-400 text-sm">Display available commands</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("projects")}
        >
          <FolderGit className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">projects</div>
            <div className="text-gray-400 text-sm">List available projects</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("contribute")}
        >
          <Terminal className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">contribute</div>
            <div className="text-gray-400 text-sm">View contribution guidelines</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("contact")}
        >
          <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">contact</div>
            <div className="text-gray-400 text-sm">Display contact information</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("dashboard")}
        >
          <Terminal className="w-5 h-5 text-red-400 mt-0.5" />
          <div>
            <div className="font-bold">dashboard</div>
            <div className="text-gray-400 text-sm">Return to Dashboard</div>
          </div>
        </div>
        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("install")}
        >
          <Upload className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">install</div>
            <div className="text-gray-400 text-sm">Show installation commands for your OS</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-yellow-400 font-bold mb-2">Navigation Keys:</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-purple-400">h</span> or <span className="text-purple-400">a</span> → Left
          </div>
          <div>
            <span className="text-purple-400">j</span> or <span className="text-purple-400">s</span> → Down
          </div>
          <div>
            <span className="text-purple-400">k</span> or <span className="text-purple-400">w</span> → Up
          </div>
          <div>
            <span className="text-purple-400">l</span> or <span className="text-purple-400">d</span> → Right
          </div>
        </div>
        <div className="mt-2 text-gray-400 text-sm">Mouse support is available for selecting options.</div>
      </div>
    </div>
  )
}

// ================ CONTRIBUTE SECTION ================

const ContributeSection = () => {
  return (
    <div className="space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-2">Contribution Guidelines</div>

      <div className="space-y-2">
        <p>We welcome contributions to the araise project! Here&apos;s how you can help:</p>

        <div className="bg-gray-800/50 p-4 rounded space-y-3 mt-4">
          <div className="flex items-start space-x-3">
            <Github className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="font-bold">GitHub Repository</div>
              <div className="text-gray-300">
                <a
                  href="https://github.com/araise/araise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  https://github.com/araise/araise
                  <Github className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <GitBranch className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="font-bold">Branching Strategy</div>
              <div className="text-gray-300">
                Create a new branch for each feature or bugfix using the format:
                <code className="block bg-black/50 p-2 rounded mt-1 text-sm">
                  feature/your-feature-name
                  <br />
                  bugfix/issue-you-are-fixing
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <GitPullRequest className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="font-bold">Pull Requests</div>
              <div className="text-gray-300">
                Submit a pull request with a clear description of the changes and any relevant issue numbers. Make sure
                all tests pass before submitting.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Bug className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="font-bold">Reporting Issues</div>
              <div className="text-gray-300">
                Use the GitHub issue tracker to report bugs or suggest features. Please provide detailed steps to
                reproduce any bugs.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-gray-300">
          <p>
            We follow a code of conduct to ensure a welcoming and inclusive environment for all contributors. By
            participating, you agree to uphold these standards.
          </p>
          <p className="mt-2">Thank you for helping make araise better!</p>
        </div>
      </div>
    </div>
  )
}

// ================ CONTACT SECTION ================

const ContactSection = () => {
  const contactInfo = getContactInfo()

  return (
    <div className="space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-2">Contact Information</div>

      <div className="bg-gray-800/50 p-4 rounded space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-400" />
          <div>
            <div className="font-bold">Email</div>
            <a href={`mailto:${contactInfo.email}`} className="text-blue-400 hover:underline">
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <div>
            <div className="font-bold">Twitter</div>
            <a
              href={contactInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center"
            >
              @araise_app
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 text-gray-300">
        <p>{contactInfo.responseTime}</p>
      </div>

      <div className="mt-4 p-3 border border-yellow-500/30 rounded bg-yellow-500/10">
        <div className="flex items-start">
          <div className="text-yellow-400 font-mono mr-2">!</div>
          <div className="text-yellow-200">{contactInfo.urgentNote}</div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-yellow-400 font-bold mb-2">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {contactInfo.faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/30 p-3 rounded">
              <h4 className="text-blue-400 font-medium">{faq.question}</h4>
              <p className="text-gray-300 text-sm mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ================ PROJECTS SECTION ================

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = getProjects();
  const router = useRouter();
  
  // Add platform detection
  const userAgent = window.navigator.userAgent.toLowerCase();
  const currentPlatform = userAgent.indexOf("win") !== -1 
    ? "windows" 
    : userAgent.indexOf("mac") !== -1 
    ? "mac" 
    : userAgent.indexOf("linux") !== -1 
    ? "linux" 
    : null;

  if (selectedProject) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedProject(null)}
            className="text-blue-400 hover:underline"
          >
            ← Back to projects
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-yellow-400">{selectedProject.title}</h3>
          <p>{selectedProject.longDescription}</p>
          
          {selectedProject.features && (
            <div className="space-y-2">
              <div className="text-blue-400 font-bold">Features:</div>
              <ul className="list-disc list-inside space-y-1">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedProject.installCommands && selectedProject.installCommands.length > 0 ? (
            <div className="space-y-2">
              <div className="text-blue-400 font-bold">Installation Commands:</div>
              {selectedProject.installCommands
                .filter(cmd => cmd.os.toLowerCase() === currentPlatform)
                .map((cmd, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-sm text-gray-400">{cmd.description}</div>
                    <div className="flex items-center space-x-2 bg-black/40 p-2 rounded-md">
                      <code className="font-mono">{cmd.command}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(cmd.command)}
                        className="px-2 py-1 text-xs bg-primary/20 rounded hover:bg-primary/30"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-yellow-400">
              No installation commands available for this project.
            </div>
          )}

          <div className="space-y-2">
            <div className="text-blue-400 font-bold">Links:</div>
            <div className="flex space-x-4">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center"
              >
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/dashboard/blog?post=${selectedProject.blogPostId}`);
                }}
                className="text-blue-400 hover:underline flex items-center cursor-pointer"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-2">Available Projects:</div>
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-center space-x-2">
              <FolderGit className="w-5 h-5 text-blue-400" />
              <span>{project.title}</span>
            </div>
            <div className="flex space-x-2">
              <a 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  e.preventDefault();
                  router.push(`/dashboard/blog?post=${project.blogPostId}`);
                }}
                className="text-primary hover:text-primary/80 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80"
                onClick={(e) => e.stopPropagation()} // Prevent triggering the parent onClick
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================ TEAM SECTION ================

// ================ BLOG SECTION ================

// ================ TERMINAL COMPONENT ================

type TerminalProps = {
  setShowUhOh: (show: boolean) => void
  saveBackground: (image: string, opacity: number) => void
}

export type CommandHistory = {
  command: string
  output: React.ReactNode
}[]

const TerminalComponent = ({ setShowUhOh, saveBackground }: TerminalProps) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistory>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const router = useRouter()

  const hasExecutedHelp = useRef(false)

  // Execute help command on mount
  useEffect(() => {
    if (!hasExecutedHelp.current) {
      hasExecutedHelp.current = true
      executeCommand("help")
    }
  }, [])

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeGame) {
        setActiveGame(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeGame])

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output: React.ReactNode

    if (command === "sudo") {
      setShowUhOh(true)
      return
    }

    switch (command) {
      case "dashboard":
        router.push("/dashboard")
        output = <CommandOutput>Redirecting to dashboard...</CommandOutput>
        break

      case "help":
        output = <HelpSection executeCommand={executeCommand} />
        break
      case "projects":
        output = <ProjectsSection />
        break
      case "contribute":
        output = <ContributeSection />
        break
      case "contact":
        output = <ContactSection />
        break
      case "exit":
        output = (
          <div className="text-red-400 font-bold">
            Looks like you tried to escape, but there&apos;s no escape in the Shadow Monarch&apos;s realm.
          </div>
        )
        break
      case "clear":
        setCommandHistory([])
        setCurrentCommand("")
        return
      case "website":
        router.push("/dashboard")
        output = <CommandOutput>Redirecting to dashboard...</CommandOutput>
        break
      case "install":
        if (!selectedProject?.installCommands || selectedProject.installCommands.length === 0) {
          output = (
            <CommandOutput>
              <div className="text-yellow-400">
                No installation commands available for this project.
              </div>
            </CommandOutput>
          );
          break;
        }

        const userAgent = window.navigator.userAgent.toLowerCase();
        const currentPlatform = userAgent.indexOf("win") !== -1 
          ? "windows" 
          : userAgent.indexOf("mac") !== -1 
          ? "mac" 
          : userAgent.indexOf("linux") !== -1 
          ? "linux" 
          : null;
        
        const commands = [
          {
            id: "windows",
            os: "Windows",
            command: '$script = Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/araise25/araise_PM/main/windows/install.ps1"; $script.Content | Out-File -FilePath "$env:TEMP\\araise_install.ps1"; & "$env:TEMP\\araise_install.ps1"',
          },
          {
            id: "mac",
            os: "macOS",
            command: "curl -fsSL https://raw.githubusercontent.com/araise25/araise_PM/main/unix/install.sh | bash",
          },
          {
            id: "linux",
            os: "Linux",
            command: "curl -fsSL https://raw.githubusercontent.com/araise25/araise_PM/main/unix/install.sh | bash",
          },
        ];

        output = (
          <CommandOutput>
            <div className="space-y-4">
              <div className="text-yellow-400 text-lg font-bold">Installation Command for your system:</div>
              {currentPlatform && commands
                .filter((cmd) => cmd.id === currentPlatform)
                .map((cmd) => (
                  <div key={cmd.id} className="space-y-2">
                    <div className="text-blue-400">{cmd.os} Installation</div>
                    <div className="flex items-center space-x-2 bg-black/40 p-2 rounded-md">
                      <code className="font-mono">{cmd.command}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(cmd.command)}
                        className="px-2 py-1 text-xs bg-primary/20 rounded hover:bg-primary/30"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              {!currentPlatform && (
                <div className="text-red-400">
                  Could not detect your operating system. Please use the dashboard to view all available commands.
                </div>
              )}
            </div>
          </CommandOutput>
        );
        break;
      case "":
        output = <div></div>
        break
      default:
        output = (
          <div className="text-red-400">
            Command not found: {command}. Type &apos;help&apos; to see available commands.
          </div>
        )
    }

    setCommandHistory((prev) => [...prev, { command, output }])
    setCurrentCommand("")
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        // If it's a printable character, focus the input and add it
        if (e.key.length === 1) {
          e.preventDefault() // Prevent default to avoid double input
          const inputElement = document.querySelector(".terminal-input") as HTMLInputElement
          if (inputElement) {
            inputElement.focus()
            setCurrentCommand((prev) => prev + e.key)
            setIsInputFocused(true)
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  })

  return (
    <div
      ref={terminalRef}
      className={cn(
        "w-full h-[80vh] rounded-md border border-primary/20 overflow-y-auto p-4",
        "font-mono text-green-400 shadow-lg relative",
      )}
      style={{
        backgroundColor: "rgba(0, 0, 0, 1)",
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {/* Close Button */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group relative"
              aria-label="Close terminal and return to dashboard"
            >
              <svg
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Maximize Button */}
            <div
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 cursor-not-allowed flex items-center justify-center group relative"
              aria-label="Maximize (disabled)"
            >
              <svg
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z" />
              </svg>
            </div>

            {/* Minimize Button */}
            <div
              className="w-3.5 h-3.5 rounded-full bg-green-500 cursor-not-allowed flex items-center justify-center group relative"
              aria-label="Minimize (disabled)"
            >
              <svg
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 12H4" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-gray-400">araise Terminal</div>
        </div>

        <div className="space-y-2">
          {commandHistory.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex">
                <span className="text-blue-400 mr-2">guest@araise:~$</span>
                <span>{item.command}</span>
              </div>
              <CommandOutput>{item.output}</CommandOutput>
            </div>
          ))}
        </div>

        <CommandLine
          currentCommand={currentCommand}
          setCurrentCommand={setCurrentCommand}
          executeCommand={executeCommand}
          className="terminal-input"
        />
      </div>
    </div>
  )
}

// ================ MAIN COMPONENT ================

export default function Home() {
  const [showUhOh, setShowUhOh] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.7)
  const [currentTheme, setCurrentTheme] = useState("dark")

  useEffect(() => {
    // Initialize theme
    initializeTheme()
    setCurrentTheme(getCurrentTheme())

    // Load background from local storage if available
    const savedBackground = localStorage.getItem("araiseBackground")
    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }

    const savedOpacity = localStorage.getItem("araiseBackgroundOpacity")
    if (savedOpacity) {
      setBackgroundOpacity(Number.parseFloat(savedOpacity))
    }

    // Handle window events to trigger UhOh page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      setShowUhOh(true)
      e.returnValue = ""
      return ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const saveBackground = (image: string, opacity: number) => {
    setBackgroundImage(image)
    setBackgroundOpacity(opacity)
    localStorage.setItem("araiseBackground", image)
    localStorage.setItem("araiseBackgroundOpacity", opacity.toString())
  }

  if (showUhOh) {
    return <UhOhPage onReturn={() => setShowUhOh(false)} />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
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
        <TerminalComponent setShowUhOh={setShowUhOh} saveBackground={saveBackground} />
      </div>
    </main>
  )
}

