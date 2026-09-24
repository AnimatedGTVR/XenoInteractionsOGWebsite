import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Xeno Tech — Projects and software</title>
        <meta
          name="description"
          content="Xeno Tech builds independent systems software, developer tools, programming languages, Linux projects, and interactive experiences."
        />
        <meta name="keywords" content="Xeno Tech, Abora OS, Pippin, Vanta, LuminaIDE, TinyPM, Linux, open source, software development" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

