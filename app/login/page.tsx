"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  })

  // Mouse tracking for blob eyes
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.3 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.3 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex overflow-hidden bg-black relative">
      {/* Background grid pattern matching main site */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100, 100, 100, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 100, 100, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand - matching main site style */}
          <div className="mb-8">
            <Link href="/" className="inline-block mb-4 text-cyan-400 hover:text-cyan-300 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-light tracking-tight text-white mb-2">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Xeno</span>
            </h1>
            <p className="text-gray-400">Sign in to access your account</p>
          </div>

          {/* Toggle Sign In / Sign Up */}
          <div className="flex gap-2 mb-8 p-1 glass-card rounded-2xl">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                !isSignUp
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                isSignUp
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="username" className="text-gray-300 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-12 h-14 glass-card border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-14 glass-card border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 h-14 glass-card border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-700 bg-gray-800" />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300 text-white font-semibold rounded-xl text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 glass-card border-gray-800 hover:bg-gray-900 hover:shadow-md transition-all rounded-xl text-gray-300 bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 glass-card border-gray-800 hover:bg-gray-900 hover:shadow-md transition-all rounded-xl text-gray-300 bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating orbs for depth - matching main site */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-8 border-l border-gray-800/50">
        <BlobCharacters mouseX={smoothMouseX} mouseY={smoothMouseY} showPassword={showPassword} />
      </div>
    </div>
  )
}

function BlobCharacters({
  mouseX,
  mouseY,
  showPassword,
}: {
  mouseX: any
  mouseY: any
  showPassword: boolean
}) {
  return (
    <div className="relative w-full h-full grid grid-cols-2 gap-8 place-items-center px-8">
      {/* Blob 1 - Cyan - Happy */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <Blob
          color="from-cyan-400 to-cyan-600"
          size={120}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={0}
          shape="round"
          eyeConfig={{
            type: "two-big",
            leftEyeSize: 35,
            rightEyeSize: 35,
            gap: 15,
            pupilSize: 18,
          }}
          emotion="happy"
        />
      </motion.div>

      {/* Blob 2 - Purple - Shy */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
      >
        <Blob
          color="from-purple-400 to-purple-600"
          size={110}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={0.2}
          shape="tall"
          eyeConfig={{
            type: "two-small",
            leftEyeSize: 22,
            rightEyeSize: 22,
            gap: 6,
            pupilSize: 11,
          }}
          emotion="shy"
        />
      </motion.div>

      {/* Blob 3 - Blue - Surprised */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
      >
        <Blob
          color="from-blue-400 to-blue-600"
          size={115}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={0.4}
          shape="wide"
          eyeConfig={{
            type: "cyclops",
            leftEyeSize: 42,
            rightEyeSize: 0,
            gap: 0,
            pupilSize: 22,
          }}
          emotion="surprised"
        />
      </motion.div>

      {/* Blob 4 - Pink - Curious */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
      >
        <Blob
          color="from-pink-400 to-pink-600"
          size={105}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={0.6}
          shape="squished"
          eyeConfig={{
            type: "three",
            leftEyeSize: 26,
            rightEyeSize: 26,
            gap: 10,
            pupilSize: 13,
            thirdEyeSize: 22,
          }}
          emotion="curious"
        />
      </motion.div>

      {/* Blob 5 - Orange - Sleepy */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.4 }}
      >
        <Blob
          color="from-orange-400 to-orange-600"
          size={100}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={0.8}
          shape="round"
          eyeConfig={{
            type: "two-small",
            leftEyeSize: 28,
            rightEyeSize: 28,
            gap: 12,
            pupilSize: 14,
          }}
          emotion="sleepy"
        />
      </motion.div>

      {/* Blob 6 - Green - Excited */}
      <motion.div
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.5 }}
      >
        <Blob
          color="from-green-400 to-green-600"
          size={108}
          mouseX={mouseX}
          mouseY={mouseY}
          showPassword={showPassword}
          delay={1}
          shape="tall"
          eyeConfig={{
            type: "two-big",
            leftEyeSize: 38,
            rightEyeSize: 38,
            gap: 18,
            pupilSize: 20,
          }}
          emotion="excited"
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400/20 rounded-full"
          initial={{
            x: Math.random() * 400,
            y: Math.random() * 600,
          }}
          animate={{
            y: [null, Math.random() * 600],
            x: [null, Math.random() * 400],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

function Blob({
  color,
  size,
  mouseX,
  mouseY,
  showPassword,
  delay,
  shape = "round",
  eyeConfig,
  emotion = "neutral",
}: {
  color: string
  size: number
  mouseX: any
  mouseY: any
  showPassword: boolean
  delay: number
  shape?: "round" | "tall" | "wide" | "squished"
  eyeConfig: {
    type: "two-big" | "two-small" | "cyclops" | "three"
    leftEyeSize: number
    rightEyeSize: number
    gap: number
    pupilSize: number
    thirdEyeSize?: number
  }
  emotion?: "happy" | "shy" | "surprised" | "curious" | "sleepy" | "excited" | "neutral"
}) {
  const blobRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const thirdEyeRef = useRef<HTMLDivElement>(null)

  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 })
  const [thirdPupilPos, setThirdPupilPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePupilPosition = () => {
      if (!leftEyeRef.current) return

      const leftEyeRect = leftEyeRef.current.getBoundingClientRect()
      const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2
      const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2

      const currentMouseX = mouseX.get()
      const currentMouseY = mouseY.get()

      if (showPassword) {
        const topRightAngle = -Math.PI / 4
        const maxOffset = eyeConfig.pupilSize * 0.35
        const shyPos = {
          x: Math.cos(topRightAngle) * maxOffset,
          y: Math.sin(topRightAngle) * maxOffset,
        }
        setLeftPupilPos(shyPos)
        setRightPupilPos(shyPos)
        setThirdPupilPos(shyPos)
        return
      }

      const maxPupilOffset = eyeConfig.pupilSize * 0.35
      const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      const normalizeDistance = screenDiagonal * 0.4

      const calculatePupilPos = (eyeCenterX: number, eyeCenterY: number) => {
        const deltaX = currentMouseX - eyeCenterX
        const deltaY = currentMouseY - eyeCenterY
        const angle = Math.atan2(deltaY, deltaX)
        const rawDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const normalizedDistance = Math.min(1, rawDistance / normalizeDistance)
        const constrainedDistance = normalizedDistance * maxPupilOffset

        return {
          x: Math.cos(angle) * constrainedDistance,
          y: Math.sin(angle) * constrainedDistance,
        }
      }

      setLeftPupilPos(calculatePupilPos(leftEyeCenterX, leftEyeCenterY))

      if (rightEyeRef.current) {
        const rightEyeRect = rightEyeRef.current.getBoundingClientRect()
        const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2
        const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2
        setRightPupilPos(calculatePupilPos(rightEyeCenterX, rightEyeCenterY))
      }

      if (thirdEyeRef.current) {
        const thirdEyeRect = thirdEyeRef.current.getBoundingClientRect()
        const thirdEyeCenterX = thirdEyeRect.left + thirdEyeRect.width / 2
        const thirdEyeCenterY = thirdEyeRect.top + thirdEyeRect.height / 2
        setThirdPupilPos(calculatePupilPos(thirdEyeCenterX, thirdEyeCenterY))
      }
    }

    const unsubscribeX = mouseX.on("change", updatePupilPosition)
    const unsubscribeY = mouseY.on("change", updatePupilPosition)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, showPassword, eyeConfig.pupilSize])

  const shapeStyles = {
    round: { width: size, height: size, borderRadius: "50%" },
    tall: { width: size * 0.75, height: size * 1.3, borderRadius: "50% 50% 45% 45%" },
    wide: { width: size * 1.2, height: size * 0.7, borderRadius: "45% 45% 50% 50%" },
    squished: { width: size * 0.9, height: size * 0.9, borderRadius: "60% 40% 55% 45%" },
  }

  const renderMouth = () => {
    const mouthStyles = {
      happy: {
        bottom: "18%",
        width: "40%",
        height: "20%",
        borderRadius: "0 0 50% 50%",
        border: "3px solid rgba(255,255,255,0.6)",
        borderTop: "none",
      },
      shy: {
        bottom: "22%",
        width: "25%",
        height: "8%",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.4)",
      },
      surprised: {
        bottom: "18%",
        width: "30%",
        height: "30%",
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.6)",
      },
      curious: {
        bottom: "20%",
        width: "30%",
        height: "12%",
        borderRadius: "50% 50% 50% 0",
        border: "3px solid rgba(255,255,255,0.5)",
        borderTop: "none",
        borderLeft: "none",
      },
      sleepy: {
        bottom: "22%",
        width: "35%",
        height: "6%",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.4)",
      },
      excited: {
        bottom: "15%",
        width: "45%",
        height: "25%",
        borderRadius: "50%",
        border: "4px solid rgba(255,255,255,0.7)",
      },
      neutral: {
        bottom: "20%",
        width: "30%",
        height: "8%",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.4)",
      },
    }

    return (
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={mouthStyles[emotion]}
        animate={showPassword ? { scaleX: 0.5, scaleY: 0.8 } : { scaleX: 1, scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  const renderEyebrows = () => {
    if (eyeConfig.type === "cyclops") {
      return <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-16 h-1 bg-white/50 rounded-full" />
    }

    const eyebrowStyles = {
      happy: "rotate-12",
      shy: "-rotate-6",
      surprised: "-rotate-12",
      curious: "rotate-6",
      sleepy: "rotate-0",
      excited: "-rotate-12",
      neutral: "rotate-0",
    }

    return (
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 flex gap-4">
        <div className={`w-8 h-1 bg-white/50 rounded-full ${eyebrowStyles[emotion]}`} />
        <div className={`w-8 h-1 bg-white/50 rounded-full ${eyebrowStyles[emotion]}`} />
      </div>
    )
  }

  const renderEyes = () => {
    const eyeHeight = emotion === "sleepy" ? eyeConfig.leftEyeSize * 0.4 : eyeConfig.leftEyeSize

    if (eyeConfig.type === "cyclops") {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={leftEyeRef}
            className="relative bg-white rounded-full shadow-inner"
            style={{ width: eyeConfig.leftEyeSize, height: eyeHeight }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
              <motion.div
                className="bg-gray-900 rounded-full relative"
                style={{ width: eyeConfig.pupilSize, height: eyeConfig.pupilSize }}
                animate={{
                  x: leftPupilPos.x,
                  y: leftPupilPos.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 0.4,
                }}
              >
                <div
                  className="absolute bg-white rounded-full opacity-60"
                  style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      )
    }

    if (eyeConfig.type === "three") {
      return (
        <>
          <div className="absolute inset-0 flex items-center justify-center" style={{ gap: eyeConfig.gap }}>
            <div
              ref={leftEyeRef}
              className="relative bg-white rounded-full shadow-inner"
              style={{ width: eyeConfig.leftEyeSize, height: eyeHeight }}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                <motion.div
                  className="bg-gray-900 rounded-full relative"
                  style={{ width: eyeConfig.pupilSize, height: eyeConfig.pupilSize }}
                  animate={{
                    x: leftPupilPos.x,
                    y: leftPupilPos.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.4,
                  }}
                >
                  <div
                    className="absolute bg-white rounded-full opacity-60"
                    style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
                  />
                </motion.div>
              </div>
            </div>

            <div
              ref={rightEyeRef}
              className="relative bg-white rounded-full shadow-inner"
              style={{ width: eyeConfig.rightEyeSize, height: eyeHeight }}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                <motion.div
                  className="bg-gray-900 rounded-full relative"
                  style={{ width: eyeConfig.pupilSize, height: eyeConfig.pupilSize }}
                  animate={{
                    x: rightPupilPos.x,
                    y: rightPupilPos.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.4,
                  }}
                >
                  <div
                    className="absolute bg-white rounded-full opacity-60"
                    style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Third eye on top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div
              ref={thirdEyeRef}
              className="relative bg-white rounded-full shadow-inner"
              style={{ width: eyeConfig.thirdEyeSize, height: eyeConfig.thirdEyeSize }}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                <motion.div
                  className="bg-gray-900 rounded-full relative"
                  style={{ width: eyeConfig.pupilSize * 0.9, height: eyeConfig.pupilSize * 0.9 }}
                  animate={{
                    x: thirdPupilPos.x,
                    y: thirdPupilPos.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.4,
                  }}
                >
                  <div
                    className="absolute bg-white rounded-full opacity-60"
                    style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </>
      )
    }

    // Default two eyes (big or small)
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ gap: eyeConfig.gap }}>
        <div
          ref={leftEyeRef}
          className="relative bg-white rounded-full shadow-inner"
          style={{ width: eyeConfig.leftEyeSize, height: eyeHeight }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
            <motion.div
              className="bg-gray-900 rounded-full relative"
              style={{ width: eyeConfig.pupilSize, height: eyeConfig.pupilSize }}
              animate={{
                x: leftPupilPos.x,
                y: leftPupilPos.y,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.4,
              }}
            >
              <div
                className="absolute bg-white rounded-full opacity-60"
                style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
              />
            </motion.div>
          </div>
        </div>

        <div
          ref={rightEyeRef}
          className="relative bg-white rounded-full shadow-inner"
          style={{ width: eyeConfig.rightEyeSize, height: eyeHeight }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
            <motion.div
              className="bg-gray-900 rounded-full relative"
              style={{ width: eyeConfig.pupilSize, height: eyeConfig.pupilSize }}
              animate={{
                x: rightPupilPos.x,
                y: rightPupilPos.y,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.4,
              }}
            >
              <div
                className="absolute bg-white rounded-full opacity-60"
                style={{ top: "15%", left: "15%", width: "35%", height: "35%" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={blobRef}
      className="relative"
      animate={{
        y: [0, -15, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 3 + delay,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
      }}
    >
      <div
        className={`bg-gradient-to-br ${color} shadow-2xl relative`}
        style={{
          ...shapeStyles[shape],
          filter: "blur(0.5px)",
        }}
      >
        {renderEyebrows()}
        {renderEyes()}
        {renderMouth()}
      </div>
    </motion.div>
  )
}
