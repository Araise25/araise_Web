"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  Mail,
  Code,
  Command,
  Shield,
  Badge,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [os, setOs] = useState<"windows" | "macos" | "linux" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("win") !== -1) setOs("windows");
    else if (userAgent.indexOf("mac") !== -1) setOs("macos");
    else if (userAgent.indexOf("linux") !== -1) setOs("linux");
    else setOs(null);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    {
      id: "windows",
      os: "Windows",
      command:
        '$script = Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/Araise25/arAIse_PM/main/windows/install.ps1"; $script.Content | Out-File -FilePath "$env:TEMP\\araise_install.ps1"; & "$env:TEMP\\araise_install.ps1"',
      icon: Shield,
    },
    {
      id: "macos",
      os: "macOS",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Araise25/arAIse_PM/main/unix/install.sh | bash",
      icon: Shield,
    },
    {
      id: "linux",
      os: "Linux",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Araise25/arAIse_PM/main/unix/install.sh | bash",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight terminal-text">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to arAIse. Select a section to explore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card
            key={section.title}
            className="border border-primary/20 bg-black/60 pixel-corners overflow-hidden hover:border-primary/50 transition-all"
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-primary">
                <section.icon className="mr-2 h-5 w-5" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={section.href}>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 group"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4">
        <div className="p-4 border border-dashed border-primary/30 rounded-md bg-black/60">
          <div className="flex items-start space-x-2">
            <Command className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-primary">Quick Help</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Navigate through the sidebar or use the cards above to explore
                different sections. Click the terminal icon in the top right to
                switch to Terminal Mode.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border border-dashed border-primary/30 rounded-md bg-black/60">
          <div className="flex items-start space-x-2">
            <Command className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-primary">
                Quick Commands
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try our applications using the package manager for your
                operating system. Visit the Projects section or use the Terminal
                Mode for more details.
              </p>
              <div className="mt-4 space-y-2">
                {os
                  ? // Show only the command for the detected OS
                    commands
                      .filter((cmd) => cmd.id === os)
                      .map((cmd) => (
                        <div
                          key={cmd.id}
                          className="flex items-center justify-between bg-black/40 p-3 rounded-md border border-primary/20"
                        >
                          <div className="flex items-center space-x-2">
                            <cmd.icon className="h-4 w-4 text-primary" />
                            <code className="font-mono text-primary text-sm">
                              {cmd.command}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{cmd.os}</Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-primary hover:text-primary/80"
                              onClick={() =>
                                copyToClipboard(cmd.command, cmd.id)
                              }
                            >
                              {copied === cmd.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="sr-only">Copy command</span>
                            </Button>
                          </div>
                        </div>
                      ))
                  : // If OS detection failed, show all commands
                    commands.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="flex items-center justify-between bg-black/40 p-3 rounded-md border border-primary/20"
                      >
                        <div className="flex items-center space-x-2">
                          <cmd.icon className="h-4 w-4 text-primary" />
                          <code className="font-mono text-primary text-sm">
                            {cmd.command}
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{cmd.os}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:text-primary/80"
                            onClick={() => copyToClipboard(cmd.command, cmd.id)}
                          >
                            {copied === cmd.id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            <span className="sr-only">Copy command</span>
                          </Button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "Projects",
    description: "Explore available projects with descriptions and links",
    icon: Code,
    href: "/dashboard/projects",
  },
  {
    title: "Blog",
    description: "Read the latest updates, tutorials and insights",
    icon: BookOpen,
    href: "/dashboard/blog",
  },
  {
    title: "Contribute",
    description: "Learn how to contribute to arAIse",
    icon: ArrowRight,
    href: "/dashboard/contribute",
  },
  {
    title: "Contact",
    description: "Get in touch with the arAIse team",
    icon: Mail,
    href: "/dashboard/contact",
  },
  {
    title: "Team",
    description: "Meet the team behind arAIse",
    icon: Users,
    href: "/dashboard/team",
  },
];
