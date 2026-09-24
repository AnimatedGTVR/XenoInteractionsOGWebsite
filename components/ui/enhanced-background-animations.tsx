"use client"

import { useEffect, useRef } from "react"

export default function EnhancedBackgroundAnimations() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Enhanced colorful particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      hue: number
      saturation: number
      lightness: number
      pulseSpeed: number
      trail: Array<{ x: number; y: number; opacity: number }>
    }> = []

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#ffeaa7",
      "#dda0dd",
      "#98d8c8",
      "#f7dc6f",
      "#bb8fce",
      "#85c1e9",
      "#f8c471",
      "#82e0aa",
      "#f1948a",
      "#85c1e9",
      "#d7bde2",
    ]

    // Create colorful particles
    for (let i = 0; i < 80; i++) {
      const hue = Math.random() * 360
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        hue: hue,
        saturation: 70 + Math.random() * 30,
        lightness: 50 + Math.random() * 30,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        trail: [],
      })
    }

    let time = 0

    const animate = () => {
      time += 0.01

      // Create colorful gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsla(${(time * 50) % 360}, 70%, 10%, 0.1)`)
      gradient.addColorStop(0.25, `hsla(${(time * 50 + 90) % 360}, 70%, 15%, 0.1)`)
      gradient.addColorStop(0.5, `hsla(${(time * 50 + 180) % 360}, 70%, 10%, 0.1)`)
      gradient.addColorStop(0.75, `hsla(${(time * 50 + 270) % 360}, 70%, 15%, 0.1)`)
      gradient.addColorStop(1, `hsla(${(time * 50) % 360}, 70%, 10%, 0.1)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles with trails
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add current position to trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 10) {
          particle.trail.shift()
        }

        // Wrap around edges with color change
        if (particle.x < 0) {
          particle.x = canvas.width
          particle.hue = (particle.hue + 60) % 360
        }
        if (particle.x > canvas.width) {
          particle.x = 0
          particle.hue = (particle.hue + 60) % 360
        }
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.hue = (particle.hue + 60) % 360
        }
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.hue = (particle.hue + 60) % 360
        }

        // Update color with time
        particle.hue = (particle.hue + particle.pulseSpeed * 50) % 360
        const dynamicColor = `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${particle.opacity})`

        // Draw trail
        particle.trail.forEach((point, trailIndex) => {
          const trailOpacity = (point.opacity * trailIndex) / particle.trail.length
          ctx.save()
          ctx.globalAlpha = trailOpacity * 0.5
          ctx.fillStyle = dynamicColor
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        // Draw main particle with pulsing effect
        const pulseSize = particle.size + Math.sin(time * 100 + index) * 1
        ctx.save()
        ctx.globalAlpha = particle.opacity

        // Create radial gradient for each particle
        const particleGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, pulseSize)
        particleGradient.addColorStop(0, dynamicColor)
        particleGradient.addColorStop(
          0.7,
          `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${particle.opacity * 0.5})`,
        )
        particleGradient.addColorStop(1, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`)

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw colorful connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const connectionOpacity = (1 - distance / 150) * 0.3
            const connectionHue = (particle.hue + otherParticle.hue) / 2

            ctx.save()
            ctx.globalAlpha = connectionOpacity
            ctx.strokeStyle = `hsla(${connectionHue}, 70%, 60%, ${connectionOpacity})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      // Add floating geometric shapes
      ctx.save()
      for (let i = 0; i < 5; i++) {
        const shapeX = (canvas.width / 6) * (i + 1) + Math.sin(time * 2 + i) * 50
        const shapeY = canvas.height / 2 + Math.cos(time * 1.5 + i) * 100
        const shapeSize = 20 + Math.sin(time * 3 + i) * 10
        const shapeHue = (time * 100 + i * 72) % 360

        ctx.globalAlpha = 0.1
        ctx.fillStyle = `hsla(${shapeHue}, 80%, 60%, 0.2)`
        ctx.strokeStyle = `hsla(${shapeHue}, 80%, 70%, 0.4)`
        ctx.lineWidth = 2

        if (i % 3 === 0) {
          // Triangle
          ctx.beginPath()
          ctx.moveTo(shapeX, shapeY - shapeSize)
          ctx.lineTo(shapeX - shapeSize, shapeY + shapeSize)
          ctx.lineTo(shapeX + shapeSize, shapeY + shapeSize)
          ctx.closePath()
        } else if (i % 3 === 1) {
          // Circle
          ctx.beginPath()
          ctx.arc(shapeX, shapeY, shapeSize, 0, Math.PI * 2)
        } else {
          // Square
          ctx.beginPath()
          ctx.rect(shapeX - shapeSize, shapeY - shapeSize, shapeSize * 2, shapeSize * 2)
        }

        ctx.fill()
        ctx.stroke()
      }
      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    />
  )
}
