"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({ src, alt, width, height, className, priority = false, sizes }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={cn("bg-gray-700 flex items-center justify-center", className)}>
        <div className="text-gray-400 text-sm">Image not found</div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        sizes={sizes}
        quality={85}
      />
    </div>
  )
}
