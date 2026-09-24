import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../Componets/theme-provider"
import { MainNav } from "../Componets/main-nav"
import { SiteFooter } from "../Componets/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Xeno Interactions LLC",
  description: "Games and interactive projects by Xeno Interactions LLC",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
