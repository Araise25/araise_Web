import type React from "react";
import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { BackgroundProvider } from "@/components/background-provider";
import { ThemeProvider } from "@/components/theme-provider";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "araise | Bringing AI closer",
  description:
    "A retro-style CLI & Web interactive experience inspired by Solo Leveling",
  icons: {
    icon: [
      {
        url: "favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <BackgroundProvider>{children}</BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
