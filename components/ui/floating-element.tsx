"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  direction?: "vertical" | "horizontal" | "circular"
  duration?: number
}

export function FloatingElement({
  children,
  className,
  intensity = "medium",
  direction = "vertical",
  duration = 3,
}: FloatingElementProps) {
  const intensityValues = {
    subtle: "2px",
    medium: "6px",
    strong: "12px",
  }

  const animations = {
    vertical: `translateY(-${intensityValues[intensity]})`,
    horizontal: `translateX(${intensityValues[intensity]})`,
    circular: `rotate(5deg) translateY(-${intensityValues[intensity]})`,
  }

  return (
    <div
      className={cn("transition-transform ease-in-out", className)}
      style={{
        animation: `float-${direction} ${duration}s ease-in-out infinite`,
        animationFillMode: "both",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: ${animations.vertical}; }
        }
        @keyframes float-horizontal {
          0%, 100% { transform: translateX(0px); }
          50% { transform: ${animations.horizontal}; }
        }
        @keyframes float-circular {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-${intensityValues[intensity]}) rotate(2deg); }
          50% { transform: translateY(-${intensityValues[intensity]}) rotate(5deg); }
          75% { transform: translateY(-${intensityValues[intensity]}) rotate(2deg); }
        }
      `}</style>
    </div>
  )
}
