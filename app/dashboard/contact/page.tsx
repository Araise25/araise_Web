"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Contact, Mail, MessageSquare, Github, Twitter, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getContactInfo } from "@/lib/data"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate for demo
        setFormStatus("success")
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setFormStatus("error")
      }
    }, 1500)
  }

  const contactInfo = getContactInfo()

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight terminal-text">Contact</h1>
        <p className="text-muted-foreground">Get in touch with the arAIse team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send a Message
              </CardTitle>
              <CardDescription>Fill out the form below to get in touch with us</CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus === "success" && (
                <Alert className="mb-6 bg-green-900/20 border-green-500/50">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-500">Message Sent!</AlertTitle>
                  <AlertDescription className="text-green-300">
                    Thank you for your message. We'll get back to you as soon as possible.
                  </AlertDescription>
                </Alert>
              )}

              {formStatus === "error" && (
                <Alert className="mb-6 bg-red-900/20 border-red-500/50">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle className="text-red-500">Error</AlertTitle>
                  <AlertDescription className="text-red-300">
                    There was an error sending your message. Please try again later.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-primary">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-black border-primary/30 focus:border-primary"
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-primary">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-black border-primary/30 focus:border-primary"
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm text-primary">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="bg-black border-primary/30 focus:border-primary"
                    disabled={formStatus === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-primary">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-black border-primary/30 focus:border-primary resize-none"
                    disabled={formStatus === "submitting"}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-primary/20 bg-black">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Contact className="mr-2 h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Other ways to reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-primary">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      araise.solutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Github className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-primary">GitHub</h3>
                    <a
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      github.com/arAIse
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Twitter className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-primary">Twitter</h3>
                    <a
                      href={contactInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      @arAIse_app
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <h3 className="text-sm font-medium text-primary mb-2">Office Hours</h3>
                <p className="text-sm text-muted-foreground">{contactInfo.officeHours}</p>
                <p className="text-sm text-muted-foreground">{contactInfo.responseTime}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-primary/10 pt-4">
              <div className="w-full text-center">
                <p className="text-xs text-muted-foreground">{contactInfo.urgentNote}</p>
              </div>
            </CardFooter>
          </Card>

          <Card className="border border-primary/20 bg-black mt-6">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <MessageSquare className="mr-2 h-5 w-5" />
                FAQ
              </CardTitle>
              <CardDescription>Frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.faqs.map((faq, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">{faq.question}</h3>
                  <p className="text-xs text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How do I report a bug?",
    answer: "You can report bugs by creating an issue on our GitHub repository or by contacting us directly via email.",
  },
  {
    question: "Is arAIse open source?",
    answer:
      "Yes, arAIse is fully open source under the MIT license. You can find the source code on our GitHub repository.",
  },
  {
    question: "How can I contribute to the project?",
    answer: "Check out our Contribute page for detailed information on how to contribute to arAIse.",
  },
  {
    question: "Are there any system requirements?",
    answer: "For the web version, any modern browser will work. For the CLI version, you need Python 3.8+ installed.",
  },
]

