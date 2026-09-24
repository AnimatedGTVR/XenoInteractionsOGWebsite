"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  animation?: "pulse" | "bounce" | "glow" | "slide" | "scale"
  glowColor?: string
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animation = "scale", glowColor = "blue", children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const animationClasses = {
      pulse: "hover:animate-pulse",
      bounce: "hover:animate-bounce",
      glow: `hover:shadow-lg hover:shadow-${glowColor}-500/50 transition-all duration-300`,
      slide: "hover:translate-x-1 transition-transform duration-300",
      scale: "hover:scale-105 transition-transform duration-300 ease-in-out",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-in-out",
          animationClasses[animation],
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
