"\"use client"

import type React from "react"

import { useEffect, useState, useRef, type ReactNode } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import {
  Terminal,
  HelpCircle,
  FolderGit,
  Mail,
  Users,
  Palette,
  Github,
  GitBranch,
  GitPullRequest,
  Bug,
  Upload,
  Sliders,
  ExternalLink,
  MessageSquare,
  Linkedin,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { themes, initializeTheme, applyTheme, getCurrentTheme } from "@/lib/theme-utils"
import { getProjects, getTeamMembers, getBlogPosts, getContactInfo } from "@/lib/data"

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
      <span className="text-blue-400 mr-2">guest@arAIse:~$</span>
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
          onClick={() => handleCommandClick("team")}
        >
          <Users className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">team</div>
            <div className="text-gray-400 text-sm">Show team member details</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("colors")}
        >
          <Palette className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">colors</div>
            <div className="text-gray-400 text-sm">Customize terminal theme</div>
          </div>
        </div>

        <div
          className="flex items-start space-x-2 p-2 rounded hover:bg-primary/10 cursor-pointer"
          onClick={() => handleCommandClick("blog")}
        >
          <BookOpen className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <div className="font-bold">blog</div>
            <div className="text-gray-400 text-sm">Read our latest blog posts</div>
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
        <p>We welcome contributions to the arAIse project! Here&apos;s how you can help:</p>

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
          <p className="mt-2">Thank you for helping make arAIse better!</p>
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
              @arAIse_app
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

// ================ COLORS SECTION ================

type ColorsProps = {
  currentTheme: string
  setTheme: (theme: string) => void
  backgroundOpacity: number
}

const ColorsSection = ({ currentTheme, setTheme, backgroundOpacity }: ColorsProps) => {
  const [opacity, setOpacity] = useState(backgroundOpacity)

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number.parseFloat(e.target.value)
    setOpacity(newOpacity)
    localStorage.setItem("arAIse-background-opacity", newOpacity.toString())
    document.body.style.opacity = newOpacity.toString()
    window.dispatchEvent(new Event("background-changed"))
  }

  return (
    <div className="space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-2">Customize Terminal</div>

      <div className="bg-gray-800/50 p-4 rounded">
        <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />

        <div className="mt-6">
          <div className="font-bold mb-2 flex items-center space-x-2">
            <Sliders className="w-4 h-4" />
            <span>Background Opacity: {Math.round(opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full"
          />
        </div>

        <div className="mt-4 text-gray-300 text-sm">
          <p>
            To customize your background wallpaper, use the <code className="text-yellow-400">dashboard</code> command
            and navigate to the Appearance section. Any changes made to the opacity here will sync with the dashboard
            and vice versa.
          </p>
        </div>
      </div>
    </div>
  )
}

// ================ PROJECTS SECTION ================

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = getProjects()

  return (
    <div>
      {!selectedProject ? (
        <div className="space-y-4">
          <div className="text-yellow-400 text-lg font-bold mb-2">Available Projects:</div>
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <FolderGit className="w-5 h-5 text-blue-400" />
                <span>{project.title}</span>
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-sm mt-2">Click on a project to view details.</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-lg font-bold">{selectedProject.title}</div>
            <button className="text-gray-400 hover:text-white text-sm" onClick={() => setSelectedProject(null)}>
              Back to projects
            </button>
          </div>

          <div>
            <div className="text-gray-300 mb-2">{selectedProject.longDescription}</div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-white" />
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-white" />
                <a
                  href={selectedProject.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  Live Demo
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <FolderGit className="w-4 h-4 text-white" />
                <a
                  href={selectedProject.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  Documentation
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ================ TEAM SECTION ================

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const teamMembers = getTeamMembers()

  return (
    <div>
      {!selectedMember ? (
        <div className="space-y-4">
          <div className="text-yellow-400 text-lg font-bold mb-2">Team Members</div>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-gray-400 text-sm">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-sm mt-2">Click on a team member to view their profile.</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-lg font-bold">{selectedMember.name}</div>
            <button className="text-gray-400 hover:text-white text-sm" onClick={() => setSelectedMember(null)}>
              Back to team
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <div className="rounded-md overflow-hidden bg-gray-800">
                <img
                  src={selectedMember.avatar || "/placeholder.svg"}
                  alt={selectedMember.name}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <div className="text-xl font-bold">{selectedMember.name}</div>
                <div className="text-blue-400">{selectedMember.role}</div>
              </div>

              <div className="text-gray-300">{selectedMember.bio}</div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 text-white" />
                  <a
                    href={selectedMember.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    GitHub Profile
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-white" />
                  <a
                    href={selectedMember.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    LinkedIn
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4 text-white" />
                  <a
                    href={selectedMember.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    Personal Website
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ================ BLOG SECTION ================

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const blogPosts = getBlogPosts()

  return (
    <div>
      {!selectedPost ? (
        <div className="space-y-4">
          <div className="text-yellow-400 text-lg font-bold mb-2">Latest Blog Posts</div>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => setSelectedPost(post)}
              >
                <div className="font-bold text-blue-400 mb-1">{post.title}</div>
                <div className="text-gray-400 text-xs mb-2">
                  {post.date} • by {post.author}
                </div>
                <div className="text-gray-300 text-sm mb-3">{post.excerpt}</div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-lg font-bold">{selectedPost.title}</div>
            <button className="text-gray-400 hover:text-white text-sm" onClick={() => setSelectedPost(null)}>
              Back to blog
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              <img
                src={selectedPost.authorImage || "/placeholder.svg"}
                alt={selectedPost.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold">{selectedPost.author}</div>
              <div className="text-gray-400 text-xs">{selectedPost.authorRole}</div>
            </div>
            <div className="text-gray-400 text-xs">•</div>
            <div className="text-gray-400 text-xs">{selectedPost.date}</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPost.tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-blue-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            {selectedPost.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl font-bold text-blue-400 mt-6 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              } else if (paragraph.startsWith("- **")) {
                return (
                  <ul key={index} className="list-disc pl-5 my-3">
                    <li>
                      <span className="font-bold">{paragraph.match(/\*\*(.*?)\*\*/)?.[1]}: </span>
                      {paragraph.replace(/- \*\*(.*?)\*\*: /, "")}
                    </li>
                  </ul>
                )
              } else {
                return (
                  <p key={index} className="text-gray-300 mb-4">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ================ TERMINAL COMPONENT ================

type TerminalProps = {
  setShowUhOh: (show: boolean) => void
  saveBackground: (image: string, opacity: number) => void
  backgroundOpacity: number
}

export type CommandHistory = {
  command: string
  output: React.ReactNode
}[]

const TerminalComponent = ({ setShowUhOh, saveBackground, backgroundOpacity }: TerminalProps) => {
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
      case "team":
        output = <TeamSection />
        break
      case "colors":
        output = (
          <ColorsSection currentTheme={theme || "dark"} setTheme={setTheme} backgroundOpacity={backgroundOpacity} />
        )
        break
      case "blog":
        output = <BlogSection />
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
        const platform = navigator.platform.toLowerCase()
        const os = platform.includes("win") ? "windows" : platform.includes("mac") ? "mac" : "linux"

        const projects = getProjects()
        const installCommands = projects.flatMap((p) => p.installCommands.filter((cmd) => cmd.os === os))

        output = (
          <CommandOutput>
            <div className="space-y-4">
              <div className="text-yellow-400 text-lg font-bold">Available Installation Commands:</div>
              {installCommands.map((cmd, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-blue-400">{cmd.description}</div>
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
          </CommandOutput>
        )
        break
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
            opacity: backgroundOpacity,
          }}
        />
      )}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {/* Close Button */}
            <button
              onClick={() => router.push('/dashboard')}
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
          <div className="text-xs text-gray-400">arAIse Terminal</div>
        </div>

        <div className="space-y-2">
          {commandHistory.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex">
                <span className="text-blue-400 mr-2">guest@arAIse:~$</span>
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
    const savedBackground = localStorage.getItem("arAIseBackground")
    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }

    const savedOpacity = localStorage.getItem("arAIseBackgroundOpacity")
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
    localStorage.setItem("arAIseBackground", image)
    localStorage.setItem("arAIseBackgroundOpacity", opacity.toString())
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
        <TerminalComponent
          setShowUhOh={setShowUhOh}
          saveBackground={saveBackground}
          backgroundOpacity={backgroundOpacity}
        />
      </div>
    </main>
  )
}

