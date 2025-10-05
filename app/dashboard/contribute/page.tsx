import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Github, GitPullRequest, GitBranch, Bug, Code, FileCode, AlertTriangle, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ContributePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight terminal-text">Contribute</h1>
        <p className="text-muted-foreground">Learn how to contribute to the araise project</p>
      </div>

      <Alert className="border-primary/30 bg-primary/5">
        <HelpCircle className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Getting Started</AlertTitle>
        <AlertDescription>
          We welcome contributions from developers of all skill levels. Follow the guidelines below to get started.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="guidelines" className="w-full">
        <TabsList className="grid grid-cols-4 bg-black border border-primary/20">
          <TabsTrigger
            value="guidelines"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="workflow" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Workflow
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Issues
          </TabsTrigger>
          <TabsTrigger value="code" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Code Style
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="mt-6">
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Github className="mr-2 h-5 w-5" />
                Contribution Guidelines
              </CardTitle>
              <CardDescription>Follow these steps to contribute to the araise project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Fork the Repository</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start by forking the repository on GitHub. This creates your own copy of the project where you can
                      make changes.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-primary/30 hover:bg-primary/10" asChild>
                      <Link href="https://github.com/araise25" target="_blank">
                        <Github className="mr-1 h-4 w-4" />
                        Fork on GitHub
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Clone Your Fork</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Clone your forked repository to your local machine.
                    </p>
                    <div className="font-mono text-xs text-muted-foreground bg-black p-3 rounded-md border border-primary/10 mt-2">
                      <pre>git clone https://github.com/YOUR-USERNAME/araise25.git</pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Create a Branch</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a new branch for your feature or bug fix.
                    </p>
                    <div className="font-mono text-xs text-muted-foreground bg-black p-3 rounded-md border border-primary/10 mt-2">
                      <pre>git checkout -b feature/your-feature-name</pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Make Changes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Make your changes to the codebase. Be sure to follow our code style guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Commit Changes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Commit your changes with a descriptive commit message.
                    </p>
                    <div className="font-mono text-xs text-muted-foreground bg-black p-3 rounded-md border border-primary/10 mt-2">
                      <pre>git commit -m "Add feature: your feature description"</pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Push Changes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Push your changes to your forked repository.</p>
                    <div className="font-mono text-xs text-muted-foreground bg-black p-3 rounded-md border border-primary/10 mt-2">
                      <pre>git push origin feature/your-feature-name</pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">Submit a Pull Request</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a pull request from your branch to the main araise repository.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-primary/30 hover:bg-primary/10" asChild>
                      <Link href="https://github.com/araise/araise/pulls" target="_blank">
                        <GitPullRequest className="mr-1 h-4 w-4" />
                        Create Pull Request
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <GitBranch className="mr-2 h-5 w-5" />
                Git Workflow
              </CardTitle>
              <CardDescription>Our recommended Git workflow for contributing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary">Branch Naming Convention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Feature Branches</h4>
                    <div className="font-mono text-xs text-muted-foreground">
                      <pre>feature/short-feature-description</pre>
                    </div>
                  </div>
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Bug Fix Branches</h4>
                    <div className="font-mono text-xs text-muted-foreground">
                      <pre>fix/short-bug-description</pre>
                    </div>
                  </div>
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Documentation Branches</h4>
                    <div className="font-mono text-xs text-muted-foreground">
                      <pre>docs/what-is-being-documented</pre>
                    </div>
                  </div>
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Refactoring Branches</h4>
                    <div className="font-mono text-xs text-muted-foreground">
                      <pre>refactor/what-is-being-refactored</pre>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-primary mt-6">Commit Message Format</h3>
                <div className="bg-black p-4 rounded-md border border-primary/10">
                  <div className="font-mono text-xs text-muted-foreground">
                    <pre>{`<type>(<scope>): <subject>

<body>

<footer>`}</pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Types</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>
                        <span className="text-primary">feat:</span> A new feature
                      </li>
                      <li>
                        <span className="text-primary">fix:</span> A bug fix
                      </li>
                      <li>
                        <span className="text-primary">docs:</span> Documentation changes
                      </li>
                      <li>
                        <span className="text-primary">style:</span> Code style changes
                      </li>
                      <li>
                        <span className="text-primary">refactor:</span> Code refactoring
                      </li>
                      <li>
                        <span className="text-primary">test:</span> Adding or updating tests
                      </li>
                      <li>
                        <span className="text-primary">chore:</span> Build process or tools
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black p-4 rounded-md border border-primary/10">
                    <h4 className="text-sm font-medium text-primary mb-2">Example</h4>
                    <div className="font-mono text-xs text-muted-foreground">
                      <pre>{`feat(games): add high score tracking

Implement high score tracking for Snake game.
Store scores in localStorage and display top 10.

Closes #123`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Bug className="mr-2 h-5 w-5" />
                Issues and Bug Reports
              </CardTitle>
              <CardDescription>How to report issues and bugs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Found a bug or have a feature request? Please create an issue on our GitHub repository.
                </p>

                <Button variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                  <Link href="https://github.com/araise/araise/issues/new" target="_blank">
                    <Bug className="mr-1 h-4 w-4" />
                    Create New Issue
                  </Link>
                </Button>

                <h3 className="text-lg font-medium text-primary mt-6">Issue Template</h3>
                <div className="bg-black p-4 rounded-md border border-primary/10">
                  <div className="font-mono text-xs text-muted-foreground">
                    <pre>{`## Description
A clear description of the issue or feature request.

## Steps to Reproduce (for bugs)
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots to help explain the issue.

## Environment
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

## Additional Context
Add any other context about the problem here.`}</pre>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-primary mt-6">Issue Labels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-black p-3 rounded-md border border-primary/10">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">bug: Something isn't working</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black p-3 rounded-md border border-primary/10">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">feature: New feature request</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black p-3 rounded-md border border-primary/10">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">documentation: Documentation updates</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black p-3 rounded-md border border-primary/10">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-sm">enhancement: Improvements to existing features</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Code className="mr-2 h-5 w-5" />
                Code Style Guidelines
              </CardTitle>
              <CardDescription>Follow these style guidelines when contributing code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary">Python Style Guide</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">We follow the PEP 8 style guide for Python code.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black p-4 rounded-md border border-primary/10">
                      <h4 className="text-sm font-medium text-primary mb-2">Do</h4>
                      <div className="font-mono text-xs text-green-500">
                        <pre>{`def calculate_total(items):
    """Calculate the total price of all items."""
    return sum(item.price for item in items)

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email`}</pre>
                      </div>
                    </div>
                    <div className="bg-black p-4 rounded-md border border-primary/10">
                      <h4 className="text-sm font-medium text-primary mb-2">Don't</h4>
                      <div className="font-mono text-xs text-red-500">
                        <pre>{`def calculateTotal(items):
    return sum([item.price for item in items]) # No docstring

class user:
    def __init__(self,name,email):
        self.name=name
        self.email=email`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-primary mt-6">JavaScript/TypeScript Style Guide</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We follow the Airbnb JavaScript Style Guide with some modifications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black p-4 rounded-md border border-primary/10">
                      <h4 className="text-sm font-medium text-primary mb-2">Do</h4>
                      <div className="font-mono text-xs text-green-500">
                        <pre>{`// Use const and let, not var
const PI = 3.14;
let count = 0;

// Use arrow functions
const multiply = (a, b) => a * b;

// Use template literals
const greeting = \`Hello, \${name}!\`;

// Use destructuring
const { id, name } = user;`}</pre>
                      </div>
                    </div>
                    <div className="bg-black p-4 rounded-md border border-primary/10">
                      <h4 className="text-sm font-medium text-primary mb-2">Don't</h4>
                      <div className="font-mono text-xs text-red-500">
                        <pre>{`// Don't use var
var PI = 3.14;

// Avoid traditional function syntax when possible
function multiply(a, b) {
  return a * b;
}

// Don't use string concatenation
var greeting = "Hello, " + name + "!";

// Don't access properties directly when destructuring is cleaner
const id = user.id;
const name = user.name;`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-primary mt-6">CSS/Tailwind Style Guide</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We use Tailwind CSS for styling. Follow these guidelines:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Use utility classes instead of custom CSS when possible</li>
                    <li>Group related utilities with consistent ordering</li>
                    <li>Extract components for reusable UI patterns</li>
                    <li>Use meaningful class names for custom components</li>
                    <li>Follow mobile-first responsive design principles</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <p className="text-sm font-medium">
                    We use ESLint, Prettier, and Black to enforce these style guidelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const firstIssues = [
  {
    id: 1,
    title: "Add dark mode toggle to settings",
    description: "Implement a toggle switch in the settings menu to switch between light and dark mode.",
    type: "enhancement",
    number: 42,
    url: "https://github.com/araise/araise/issues/42",
  },
  {
    id: 2,
    title: "Fix Snake game collision detection",
    description: "There's a bug in the Snake game where collisions with the wall aren't always detected correctly.",
    type: "bug",
    number: 57,
    url: "https://github.com/araise/araise/issues/57",
  },
  {
    id: 3,
    title: "Improve terminal command documentation",
    description: "Add more detailed help text for each terminal command.",
    type: "documentation",
    number: 63,
    url: "https://github.com/araise/araise/issues/63",
  },
  {
    id: 4,
    title: "Add keyboard shortcuts for common actions",
    description: "Implement keyboard shortcuts for navigating between sections and accessing features.",
    type: "feature",
    number: 78,
    url: "https://github.com/araise/araise/issues/78",
  },
]

const resources = [
  {
    id: 1,
    title: "Developer Documentation",
    description: "Comprehensive guide to the araise codebase and architecture.",
    icon: FileCode,
    url: "https://docs.araise.io/dev",
  },
  {
    id: 2,
    title: "API Reference",
    description: "Documentation for the araise API endpoints and data models.",
    icon: Code,
    url: "https://docs.araise.io/api",
  },
  {
    id: 3,
    title: "Style Guide",
    description: "Detailed style guide for code, design, and documentation.",
    icon: FileCode,
    url: "https://docs.araise.io/style",
  },
  {
    id: 4,
    title: "GitHub Repository",
    description: "Main repository for the araise project.",
    icon: Github,
    url: "https://github.com/araise/araise",
  },
]

