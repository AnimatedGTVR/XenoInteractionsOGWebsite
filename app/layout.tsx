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
  console.log("[v0] RootLayout rendering")

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Xeno Tech — Projects and software</title>
        <meta
          name="description"
          content="Xeno Tech owns and supports independent projects including Abora OS, with support from Tareno Labs and Anemunt's Modularity engine."
        />
        <meta name="keywords" content="Xeno Tech, Abora OS, NixOS, Tareno Labs, Modularity, open source" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
