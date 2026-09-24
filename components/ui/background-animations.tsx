"use client"

import { useEffect, useState } from "react"

export default function BackgroundAnimations() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-500/12 to-blue-500/12 rounded-full blur-2xl animate-float-diagonal" />

        {/* Small floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float-particle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-grid-move" />
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 animate-gradient-shift" />
      </div>

      {/* Subtle scanlines effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-scanlines" />
      </div>

      {/* Corner accent lights */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent blur-3xl animate-pulse-glow-slow pointer-events-none z-0" />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-500/5 to-transparent blur-3xl animate-pulse-glow-slow pointer-events-none z-0"
        style={{ animationDelay: "2s" }}
      />
    </>
  )
}
