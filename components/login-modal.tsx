"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Zap,
  Heart,
  Shield,
  MessageCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react"
import { signInWithGoogle, signInWithDiscord } from "@/lib/auth"
import { playSound } from "@/lib/sounds"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleGmailLogin = async () => {
    setIsLoading(true)
    setError(null)
    playSound("click")

    try {
      const userProfile = await signInWithGoogle()
      if (userProfile) {
        playSound("success")
        onClose()
      }
    } catch (error: any) {
      console.error("Gmail login error:", error)
      setError(error.message || "Failed to sign in with Google")
      playSound("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscordLogin = async () => {
    setIsLoading(true)
    setError(null)
    playSound("click")

    try {
      const userProfile = await signInWithDiscord()
      if (userProfile) {
        playSound("success")
        onClose()
      }
    } catch (error: any) {
      console.error("Discord login error:", error)
      setError(error.message || "Failed to sign in with Discord")
      playSound("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    playSound("click")

    // Simulate email login (would implement actual email auth here)
    setTimeout(() => {
      setIsLoading(false)
      playSound("success")
      onClose()
    }, 2000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    playSound("click")

    // Simulate registration (would implement actual email registration here)
    setTimeout(() => {
      setIsLoading(false)
      playSound("success")
      onClose()
    }, 2000)
  }

  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-card animate-scale-in">
        <DialogHeader className="text-center border-b border-blue-500/20 pb-6">
          <DialogTitle className="text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Xeno Universe
          </DialogTitle>
          <p className="text-muted-foreground mt-2">Join our community of creators and explorers</p>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* OAuth Login Buttons */}
        <div className="space-y-4 mb-6">
          <Button
            onClick={handleGmailLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            onMouseEnter={() => playSound("hover")}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loading-spinner" />
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6" />
                <span>Continue with Gmail</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
          </Button>

          <Button
            onClick={handleDiscordLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            onMouseEnter={() => playSound("hover")}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loading-spinner" />
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                <span>Continue with Discord</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-blue-500/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-purple-500/20"
              onClick={() => playSound("hover")}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20"
              onClick={() => playSound("hover")}
            >
              Join Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="neon-card animate-slide-in-left">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Sign In
                </CardTitle>
                <CardDescription>Welcome back, explorer!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-base font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-12 h-12 glass-card border-blue-500/20 focus:border-blue-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-base font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-12 pr-12 h-12 glass-card border-blue-500/20 focus:border-blue-500/50"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowPassword(!showPassword)
                          playSound("click")
                        }}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-blue-400 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 btn-neon hover-lift"
                    disabled={isLoading}
                    onMouseEnter={() => playSound("hover")}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="loading-spinner" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="shadow-card animate-slide-in-right">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-purple-400" />
                  Join the Universe
                </CardTitle>
                <CardDescription>Create your explorer account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-base font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Choose a unique username"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="pl-12 h-12 glass-card border-purple-500/20 focus:border-purple-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-base font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-12 h-12 glass-card border-purple-500/20 focus:border-purple-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-base font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-12 pr-12 h-12 glass-card border-purple-500/20 focus:border-purple-500/50"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowPassword(!showPassword)
                          playSound("click")
                        }}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-purple-400 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-base font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-12 h-12 glass-card border-purple-500/20 focus:border-purple-500/50"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 btn-neon hover-lift"
                    disabled={isLoading}
                    onMouseEnter={() => playSound("hover")}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="loading-spinner" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Create Account</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-blue-500/20">
          By joining, you agree to our{" "}
          <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
