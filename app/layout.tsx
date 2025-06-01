import type React from "react"
import type { Metadata } from "next"
import { Poppins, MuseoModerno } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { ThemeProvider } from "@/context/theme-context"
import { AIRecommendationsProvider } from "@/context/ai-recommendations-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["800"],
  style: ["italic"],
  variable: "--font-museo-moderno",
})

export const metadata: Metadata = {
  title: "EVOKE",
  description: "Flash journaling and mood tracker",
  manifest: "/manifest.json",
  themeColor: "#6d28d9",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EVOKE",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${poppins.variable} ${museoModerno.variable} font-sans bg-white dark:bg-gray-900`}>
        <AuthProvider>
          <ThemeProvider>
            <AIRecommendationsProvider>{children}</AIRecommendationsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
