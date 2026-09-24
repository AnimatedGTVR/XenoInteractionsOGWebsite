"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  animation?: "fade-up" | "fade-in" | "slide-left" | "scale-in"
}

export function StaggeredAnimation({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-up",
}: StaggeredAnimationProps) {
  const [visibleItems, setVisibleItems] = React.useState<boolean[]>(new Array(children.length).fill(false))
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * staggerDelay)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [children.length, staggerDelay])

  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-in": "opacity-0",
    "slide-left": "opacity-0 translate-x-8",
    "scale-in": "opacity-0 scale-95",
  }

  const visibleClasses = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-in": "opacity-100",
    "slide-left": "opacity-100 translate-x-0",
    "scale-in": "opacity-100 scale-100",
  }

  return (
    <div ref={containerRef} className={cn("space-y-4", className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-700 ease-out transform",
            visibleItems[index] ? visibleClasses[animation] : animationClasses[animation],
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
