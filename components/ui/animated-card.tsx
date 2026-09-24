"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface AnimatedCardProps extends CardProps {
  hoverEffect?: "lift" | "glow" | "tilt" | "scale" | "border-glow"
  animationDelay?: number
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverEffect = "lift", animationDelay = 0, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const cardRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), animationDelay)
          }
        },
        { threshold: 0.1 },
      )

      if (cardRef.current) {
        observer.observe(cardRef.current)
      }

      return () => observer.disconnect()
    }, [animationDelay])

    const hoverEffects = {
      lift: "hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/20",
      glow: "hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-500/50",
      tilt: "hover:rotate-1 hover:scale-105",
      scale: "hover:scale-105",
      "border-glow": "hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25",
    }

    return (
      <Card
        ref={cardRef}
        className={cn(
          "transition-all duration-500 ease-out",
          hoverEffects[hoverEffect],
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transform-gpu", // Enable hardware acceleration
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    )
  },
)

AnimatedCard.displayName = "AnimatedCard"
