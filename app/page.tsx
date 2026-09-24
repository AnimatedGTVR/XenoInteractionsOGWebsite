"use client"

import { Card } from "@/components/ui/card"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  Settings,
  MessageSquare,
  Bell,
  Shield,
  LogOut,
  ChevronDown,
  Star,
  Trophy,
  Zap,
  Code2,
  FileCode,
  Wrench,
  ArrowRight,
  Menu,
  AlertTriangle,
  Sparkles,
  Play,
  Code,
} from "lucide-react"
import { useState, useEffect, useMemo } from "react" // useRef imported for AI Assistant
import React from "react" // Import React for React.useState and React.useEffect

const translations = {
  en: {
    xenoInteractions: "Xeno Tech",
    xenoTech: "Xeno Tech",
    subtitle: "Independent projects, owned and built with purpose",
    techSubtitle: "Software, systems, and open source projects",
    description:
      "Xeno Tech is the home for Animated's projects, from operating systems and developer tools to creative experiments.",
    techDescription: "We no longer do client development. We focus on building, owning, and supporting our own projects.",
    abora: "Abora OS",
    aboraDescription: "An approachable Linux distribution built on NixOS, designed to bring reliability, reproducibility, and powerful configuration to the everyday desktop.",
    aboraDetails: "Abora includes multiple desktop editions, ANIX, TinyPM, graphical setup tools, hardware support, Flathub integration, safe-mode concepts, and the wider Abora Cloud, Atlas, and Labs ecosystem.",
    games: "Games",
    theWakingSoul: "The Waking Soul",
    tropik: "Tropik",
    wakingSoulDesc: "A psychological horror experience that challenges reality",
    tropikDesc: "Tropical adventure with mind-bending puzzles and community coding",
    axo: "Axo",
    axoDesc: "Community coding system for Tropik",
    axoFull:
      "Axo is a powerful community coding system integrated into Tropik, supporting Lua and C# scripting. Designed specifically for Unity developers, Axo enables players to create custom game modes, mechanics, and experiences.",
    home: "Home",
    community: "Community",
    friends: "Friends",
    notifications: "Notifications",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    privacySafety: "Privacy & Safety",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signUp: "Sign Up",
    createAccount: "Create Account",
    welcomeBack: "Welcome back!",
    joinXeno: "Join Xeno",
    settings: "Settings",
    general: "General",
    audio: "Audio",
    appearance: "Appearance",
    privacy: "Privacy",
    advanced: "Advanced",
    account: "Account",
    security: "Security",
    editProfile: "Edit Profile",
    username: "Username",
    displayName: "Display Name",
    bio: "Bio",
    location: "Location",
    website: "Website",
    saveChanges: "Save Changes",
    xenoCode: "XENO Code",
    xenoCodeDesc: "Your unique code for cross-game authentication",
    copyCode: "Copy Code",
    regenerateCode: "Regenerate Code",
    searchFriends: "Search friends...",
    online: "Online",
    offline: "Offline",
    playing: "Playing",
    darkMode: "Dark Mode",
    darkModeDesc: "Use dark theme across the platform",
    autoLogin: "Auto Login",
    autoLoginDesc: "Automatically sign in with XENO code",
    showOnlineStatus: "Show Online Status",
    showOnlineDesc: "Let friends see when you're online",
    language: "Language",
    masterVolume: "Master Volume",
    soundEffects: "Sound Effects",
    music: "Music",
    voiceChat: "Voice Chat",
    communityTitle: "Community Hub",
    communityDesc: "Connect with other players and share your experiences",
    forums: "Forums",
    events: "Events",
    leaderboards: "Leaderboards",
    notificationsTitle: "Notifications",
    noNotifications: "No new notifications",
    markAllRead: "Mark all as read",
    privacyTitle: "Privacy & Safety",
    privacyDesc: "Your privacy and safety are our top priorities",
    dataCollection: "Data Collection",
    dataCollectionDesc: "We collect minimal data necessary for service functionality",
    accountSecurity: "Account Security",
    accountSecurityDesc: "Enable two-factor authentication and strong passwords",
    contentModeration: "Content Moderation",
    contentModerationDesc: "Report inappropriate content and behavior",
    parentalControls: "Parental Controls",
    parentalControlsDesc: "Manage content access and communication settings",
    getStarted: "Get Started",
    learnMore: "Learn More",
    viewProject: "View Project",
    inDevelopment: "In Development",
    comingSoon: "Coming Soon",
    axoScripting: "Axo Scripting", // Added for the new page
    contactUs: "Contact Us", // Added for the new page
  },
}

export default function XenoInteractionsWebsite() {
  console.log("[v0] XenoInteractionsWebsite component rendering")
  const [mode, setMode] = useState<"interactions" | "tech">("interactions")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState("en")

  const [user, setUser] = useState({
    username: "Player123",
    displayName: "John Doe",
    email: "john@example.com",
    bio: "Gaming enthusiast and developer",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    xenoCode: "XENO-2024-ABC123",
    avatar: "https://images.unsplash.com/photo-153571387500-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  })

  const [settings, setSettings] = useState({
    darkMode: true,
    autoLogin: false,
    showOnlineStatus: true,
    masterVolume: 80,
    soundEffects: 70,
    music: 60,
    voiceChat: 90,
    language: "en",
  })

  const t = (key: string) => {
    return (
      translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] ||
      translations.en[key as keyof typeof translations.en] ||
      key
    )
  }

  useEffect(() => {
    const savedSettings = localStorage.getItem("xenoSettings")
    const savedUser = localStorage.getItem("xenoUser")
    const savedAuth = localStorage.getItem("xenoAuth")

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      setLanguage(parsed.language || "en")
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedAuth) {
      setIsLoggedIn(JSON.parse(savedAuth))
    }
  }, [])

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings)
    setLanguage(newSettings.language)
    localStorage.setItem("xenoSettings", JSON.stringify(newSettings))
  }

  const saveUser = (newUser: typeof user) => {
    setUser(newUser)
    localStorage.setItem("xenoUser", JSON.stringify(newUser))
  }

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    localStorage.setItem("xenoAuth", "true")
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("xenoAuth")
    setShowUserDropdown(false)
  }

  const generateXenoCode = () => {
    const newCode = `XENO-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const newUser = { ...user, xenoCode: newCode }
    saveUser(newUser)
  }

  const copyXenoCode = () => {
    navigator.clipboard.writeText(user.xenoCode)
  }

  const toggleMode = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setMode(mode === "interactions" ? "tech" : "interactions")
      setTimeout(() => setIsTransitioning(false), 300)
    }, 300)
  }

  const HomePage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section - Modern, eye-catching design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-white/5 to-purple-500/5" />

          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              animation: "grid-move-slow 30s linear infinite",
            }}
          />

          {/* Floating orbs for depth */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-orb" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-orb"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-light mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]">
              Xeno Tech
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8 drop-shadow-lg">
              Independent projects, owned and built with purpose
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => setCurrentPage("games")}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-light hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => setCurrentPage("axo-scripting")}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-light hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <span className="relative z-10">Visit Abora OS</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Numbered layout inspired by Avencio */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Our Projects</p>
            <h2 className="text-5xl md:text-6xl font-light text-black">
              {mode === "interactions" ? "Projects we own" : "Systems and tools"}
            </h2>
          </motion.div>

          {mode === "interactions" ? (
            <div className="grid md:grid-cols-2 gap-16">
              {/* Project 1 - The Waking Soul */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="text-8xl font-light text-gray-300">1</div>
                <h3 className="text-3xl font-light">{t("theWakingSoul")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("wakingSoulDesc")}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Development Progress</span>
                    <span>11%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: "11%" }} />
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage("waking-soul")}
                  className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all duration-300"
                >
                  {t("viewProject")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Project 2 - Tropik */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="text-8xl font-light text-gray-300">2</div>
                <h3 className="text-3xl font-light">{t("tropik")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("tropikDesc")}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Development Progress</span>
                    <span>3%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: "3%" }} />
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage("tropik")}
                  className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all duration-300"
                >
                  {t("viewProject")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="text-6xl font-light text-gray-300">1</div>
                <h3 className="text-2xl font-light">Development SDKs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced frameworks and tools for game development with Unity integration
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="text-6xl font-light text-gray-300">2</div>
                <h3 className="text-2xl font-light">Axo Coding System</h3>
                <p className="text-gray-600 leading-relaxed">
                  Community-driven development platform supporting C# for custom content creation
                </p>
                <button
                  onClick={() => setCurrentPage("axo")}
                  className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all duration-300"
                >
                  {t("learnMore")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-6xl font-light text-gray-300">3</div>
                <h3 className="text-2xl font-light">Unity Tools</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seamless integration with Unity Engine for professional game development workflows
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Abora OS feature */}
      <section className="py-32 px-6 bg-black text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Flagship project</p>
            <h2 className="text-5xl md:text-6xl font-light mb-8">{t("abora")}</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">{t("aboraDescription")}</p>
            <p className="text-gray-500 leading-relaxed mb-8">{t("aboraDetails")}</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://aboraos.org/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white px-5 py-3 hover:bg-white hover:text-black transition-colors">
                Visit aboraos.org <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/AboraOS-Project" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-gray-300 hover:border-white hover:text-white transition-colors">
                Abora on GitHub
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-white/15 p-8 bg-white/[0.03]"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">The Abora ecosystem</p>
            <div className="mb-8 border-b border-white/10 pb-6">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Supported by</p>
              <h3 className="text-xl font-light text-white mb-2">Tareno Labs</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Anemunt&apos;s team and the creators of Modularity, an engine project supporting the wider Xeno Tech ecosystem.</p>
              <a href="https://moduengine.xyz" target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm text-gray-300 hover:text-white underline underline-offset-4">Visit moduengine.xyz</a>
            </div>
            <div className="space-y-5 text-gray-300">
              <div><strong className="text-white">ANIX</strong><p className="text-sm text-gray-500 mt-1">A friendlier layer for Nix and Abora configuration.</p></div>
              <div><strong className="text-white">TinyPM</strong><p className="text-sm text-gray-500 mt-1">A focused package-management project for the Abora experience.</p></div>
              <div><strong className="text-white">Cloud, Atlas, and Labs</strong><p className="text-sm text-gray-500 mt-1">Projects extending Abora from personal desktops to servers, infrastructure, and experimentation.</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Our Team</p>
            <h2 className="text-5xl md:text-6xl font-light">The People Behind Xeno</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                name: "Animated",
                role: "Founder",
                specialty: "Xeno Tech owner and project director",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4baf8e7da557f1ac29dcb30dff9c1e67-JcCR3YTUHaA6XP0iorpPrZkHP6vSLa.jpg",
              },
              {
                name: "Anemunt",
                role: "Partner",
                specialty: "Tareno Labs owner and Modularity lead",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled71_20250919224056-boz9YiY62ILTzu0TpBa643E7nUCGwG.png",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="aspect-square bg-gray-900 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-light">{member.name}</h3>
                <p className="text-cyan-400">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-light leading-tight">Ready to join the adventure?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated on our latest projects and be the first to experience our games
            </p>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              {t("getStarted")}
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )

  const WakingSoulPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentPage("home")}
          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mb-12"
        >
          ← Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-light text-white mb-2">{t("theWakingSoul")}</h1>
                <p className="text-xl text-gray-400">{t("wakingSoulDesc")}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm border border-red-500/20">
                Horror
              </span>
              <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                Psychological
              </span>
              <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                Single Player
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Development Progress</span>
              <span className="text-cyan-400">11%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "11%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Story & Design", desc: "Core narrative and game mechanics in development" },
              { title: "Art & Audio", desc: "Concept art and atmospheric sound design underway" },
              { title: "Programming", desc: "Core systems and gameplay mechanics being built" },
              { title: "Testing", desc: "Early prototyping and concept validation" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-medium text-cyan-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gray-900/30 border border-gray-800 rounded-xl p-8"
          >
            <h2 className="text-2xl font-light text-white mb-4">About The Game</h2>
            <p className="text-gray-400 leading-relaxed">
              The Waking Soul is a psychological horror experience that blurs the line between reality and nightmare.
              Players will navigate through a haunting narrative where every choice matters and nothing is as it seems.
              With atmospheric environments, mind-bending puzzles, and a story that challenges perception, The Waking
              Soul promises to deliver an unforgettable horror experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )

  const TropikPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentPage("home")}
          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mb-12"
        >
          ← Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-light text-white mb-2">{t("tropik")}</h1>
                <p className="text-xl text-gray-400">{t("tropikDesc")}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
                Adventure
              </span>
              <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-full text-sm border border-yellow-500/20">
                Puzzle
              </span>
              <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                Multiplayer
              </span>
              <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                Moddable
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Development Progress</span>
              <span className="text-cyan-400">3%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              />
            </div>
          </div>

          {/* Axo System Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-light text-purple-400">{t("axo")} Community Coding System</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{t("axoFull")}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Lua Support
                </h4>
                <p className="text-gray-400 text-sm">Lightweight scripting for quick prototypes and simple mods</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  C# Support
                </h4>
                <p className="text-gray-400 text-sm">Full Unity integration for advanced game mechanics and systems</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage("axo")}
              className="mt-6 inline-flex items-center gap-2 text-purple-400 hover:gap-4 transition-all duration-300"
            >
              Learn more about Axo
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-900/30 border border-gray-800 rounded-xl p-8"
          >
            <h2 className="text-2xl font-light text-white mb-4">About The Game</h2>
            <p className="text-gray-400 leading-relaxed">
              Tropik is a vibrant tropical adventure that combines exploration, puzzle-solving, and community
              creativity. With the integrated Axo coding system, players can create and share their own content, making
              every playthrough unique. Whether you're solving intricate puzzles or building custom game modes, Tropik
              offers endless possibilities for creativity and fun.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )

  const AxoPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentPage("home")}
          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mb-12"
        >
          ← Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <FileCode className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-light text-white mb-2">{t("axo")} Coding System</h1>
                <p className="text-xl text-gray-400">Community-driven game development for Tropik</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/30 border border-gray-800 rounded-xl p-8"
          >
            <h2 className="text-2xl font-light text-white mb-4">What is Axo?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{t("axoFull")}</p>
            <p className="text-gray-400 leading-relaxed">
              Axo provides a safe, sandboxed environment for community-created content, with built-in moderation tools
              and version control to ensure quality and security.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-8"
            >
              <Code2 className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-light text-blue-400 mb-4">Lua Scripting</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Perfect for beginners and quick prototypes. Lua offers a simple, lightweight scripting language ideal
                for creating basic mods and game modes.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Easy to learn syntax</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Fast iteration and testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Great for simple mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Community tutorials available</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-8"
            >
              <FileCode className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-light text-purple-400 mb-4">C# Integration</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Full Unity Engine integration for advanced developers. Create complex systems, custom mechanics, and
                professional-grade content.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Complete Unity API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Advanced gameplay systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Professional development tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Performance optimization</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-900/30 border border-gray-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-light text-white mb-6">Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Wrench, title: "Built-in Editor", desc: "In-game code editor with syntax highlighting" },
                { icon: Users, title: "Community Hub", desc: "Share and discover community creations" },
                { icon: Shield, title: "Safe Sandbox", desc: "Secure execution environment" },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-300 mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )

  const PrivacySafetyPage = () => {
    const [activeSection, setActiveSection] = React.useState("overview")

    const sections = [
      { id: "overview", label: "Overview" },
      { id: "data", label: "Data Collection" },
      { id: "security", label: "Account Security" },
      { id: "moderation", label: "Content Moderation" },
      { id: "parental", label: "Parental Controls" },
      { id: "rights", label: "Data Rights" },
    ]

    return (
      <div className="min-h-screen">
        <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light text-white">Privacy &amp; Policies</h2>
              <div className="flex items-center gap-2 overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                      activeSection === section.id
                        ? "bg-cyan-400 text-black font-medium"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section id="overview" className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
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

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">Legal & Safety</p>
              <h1 className="text-6xl md:text-7xl font-light text-white leading-tight">Privacy &amp; Policies</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your privacy and safety are fundamental to everything we do at Xeno Interactions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Data Collection Section */}
        <section id="data" className="py-32 px-6 bg-white text-black">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="text-8xl font-light text-gray-300">1</div>
                <h2 className="text-4xl md:text-5xl font-light">Data Collection & Usage</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We believe in transparency about what data we collect and how we use it
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-light">What We Collect</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Account Information",
                        items: [
                          "Email address and username",
                          "Profile information you provide",
                          "Account preferences and settings",
                          "XENO authentication codes",
                        ],
                      },
                      {
                        title: "Game Data",
                        items: [
                          "Game progress and achievements",
                          "In-game statistics and performance",
                          "Custom content and mods created",
                          "Multiplayer interactions and chat",
                        ],
                      },
                      {
                        title: "Technical Data",
                        items: [
                          "Device and hardware information",
                          "Operating system and version",
                          "Performance metrics and crash reports",
                          "Network and connection data",
                        ],
                      },
                      {
                        title: "Usage Analytics",
                        items: [
                          "Feature usage and engagement",
                          "Session duration and frequency",
                          "Navigation patterns",
                          "Error logs and diagnostics",
                        ],
                      },
                    ].map((category, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h4 className="font-medium text-lg mb-4">{category.title}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <span className="text-black mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
                  <h4 className="font-medium text-lg mb-3">How We Use Your Data</h4>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      <strong className="text-black">Service Delivery:</strong> To provide, maintain, and improve our
                      games and services
                    </p>
                    <p>
                      <strong className="text-black">Personalization:</strong> To customize your experience and provide
                      relevant content
                    </p>
                    <p>
                      <strong className="text-black">Communication:</strong> To send updates, notifications, and respond
                      to your inquiries
                    </p>
                    <p>
                      <strong className="text-black">Security:</strong> To protect against fraud, abuse, and
                      unauthorized access
                    </p>
                    <p>
                      <strong className="text-black">Analytics:</strong> To understand usage patterns and improve our
                      products
                    </p>
                  </div>
                </div>

                <div className="bg-black text-white rounded-xl p-8">
                  <h4 className="font-medium text-lg mb-3 text-cyan-400">What We Never Do</h4>
                  <ul className="space-y-2">
                    {[
                      "Sell your personal data to third parties",
                      "Share your data without your explicit consent",
                      "Use your data for purposes not disclosed to you",
                      "Access your private messages or content without legal requirement",
                      "Track you across other websites or services",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Account Security Section */}
        <section id="security" className="py-32 px-6 bg-black text-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="text-8xl font-light text-gray-800">2</div>
                <h2 className="text-4xl md:text-5xl font-light">Account Security</h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Multiple layers of protection to keep your account secure
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Two-Factor Authentication",
                    desc: "Add an extra layer of security with 2FA using authenticator apps or SMS codes",
                    features: [
                      "Support for Google Authenticator, Authy, and more",
                      "Backup codes for account recovery",
                      "Trusted device management",
                      "Login notifications and alerts",
                    ],
                  },
                  {
                    title: "Password Security",
                    desc: "Strong password requirements and secure password management",
                    features: [
                      "Minimum 12 characters with complexity requirements",
                      "Password strength indicator",
                      "Secure password reset process",
                      "Password breach monitoring",
                    ],
                  },
                  {
                    title: "Session Management",
                    desc: "Monitor and control active sessions across all your devices",
                    features: [
                      "View all active login sessions",
                      "Remote logout from any device",
                      "Session timeout after inactivity",
                      "Suspicious activity detection",
                    ],
                  },
                  {
                    title: "Login Protection",
                    desc: "Advanced security measures to prevent unauthorized access",
                    features: [
                      "Rate limiting on login attempts",
                      "IP-based access controls",
                      "Device fingerprinting",
                      "Automatic account lockout after failed attempts",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-light mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-6">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-light mb-4">XENO Code Security</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your XENO code is a unique identifier that allows you to authenticate across all Xeno games and
                  services. It's encrypted, regularly rotated, and never shared with third parties. You can regenerate
                  your code at any time from your account settings.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Encrypted Storage", desc: "AES-256 encryption" },
                    { label: "Regular Rotation", desc: "Auto-refresh every 90 days" },
                    { label: "Instant Revocation", desc: "Regenerate anytime" },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                      <p className="font-medium text-cyan-400 mb-1">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Moderation Section */}
        <section id="moderation" className="py-32 px-6 bg-white text-black">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="text-8xl font-light text-gray-300">3</div>
                <h2 className="text-4xl md:text-5xl font-light">Content Moderation</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Creating a safe and welcoming community for all players
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Report System",
                      desc: "Easy-to-use reporting tools for inappropriate content, harassment, or violations",
                      icon: "🚨",
                    },
                    {
                      title: "24/7 Moderation",
                      desc: "Dedicated team reviewing reports around the clock to maintain community standards",
                      icon: "👥",
                    },
                    {
                      title: "AI Protection",
                      desc: "Automated systems detect and filter harmful content before it reaches players",
                      icon: "🤖",
                    },
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
                  <h3 className="text-2xl font-light mb-6">Community Guidelines</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Respect Others",
                        desc: "Treat all community members with respect. No harassment, hate speech, or discrimination.",
                      },
                      {
                        title: "No Cheating",
                        desc: "Use of hacks, exploits, or unauthorized modifications is strictly prohibited.",
                      },
                      {
                        title: "Appropriate Content",
                        desc: "Keep content family-friendly. No explicit, violent, or disturbing material.",
                      },
                      {
                        title: "Privacy Protection",
                        desc: "Don't share personal information of yourself or others without consent.",
                      },
                      {
                        title: "Fair Play",
                        desc: "Play fairly and don't engage in griefing, trolling, or disruptive behavior.",
                      },
                      {
                        title: "Intellectual Property",
                        desc: "Respect copyrights and trademarks. Don't use unauthorized content.",
                      },
                    ].map((rule, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{rule.title}</h4>
                          <p className="text-gray-600 text-sm">{rule.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-lg mb-4">Enforcement Actions</h4>
                    <ul className="space-y-3 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">1.</span>
                        <span>
                          <strong className="text-black">Warning:</strong> First-time minor violations receive a warning
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">2.</span>
                        <span>
                          <strong className="text-black">Temporary Suspension:</strong> Repeated or moderate violations
                          result in temporary bans
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">3.</span>
                        <span>
                          <strong className="text-black">Permanent Ban:</strong> Severe or repeated violations lead to
                          permanent account termination
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-lg mb-4">Appeal Process</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      If you believe a moderation action was taken in error, you can appeal through our support system.
                    </p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
                        <span>Submit appeal within 30 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
                        <span>Review by senior moderation team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
                        <span>Response within 5 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Parental Controls Section */}
        <section id="parental" className="py-32 px-6 bg-black text-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="text-8xl font-light text-gray-800">4</div>
                <h2 className="text-4xl md:text-5xl font-light">Parental Controls</h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Tools to help parents manage their children's gaming experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Content Filters",
                    desc: "Control what content is accessible based on age ratings and categories",
                    features: [
                      "Age-appropriate content filtering",
                      "Custom content restrictions",
                      "Mod and user-generated content controls",
                      "Chat and communication filters",
                    ],
                  },
                  {
                    title: "Communication Management",
                    desc: "Manage who can communicate with your child and how",
                    features: [
                      "Friend request approval system",
                      "Whitelist/blacklist for contacts",
                      "Voice and text chat restrictions",
                      "Block strangers from messaging",
                    ],
                  },
                  {
                    title: "Play Time Limits",
                    desc: "Set healthy boundaries for gaming sessions",
                    features: [
                      "Daily and weekly time limits",
                      "Scheduled play times",
                      "Break reminders",
                      "Bedtime enforcement",
                    ],
                  },
                  {
                    title: "Activity Monitoring",
                    desc: "Stay informed about your child's gaming activity",
                    features: [
                      "Detailed activity reports",
                      "Friend list monitoring",
                      "Purchase history and spending limits",
                      "Real-time notifications",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-light mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-6">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-light mb-4">Setting Up Parental Controls</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Create Account", desc: "Set up a parent account" },
                    { step: "2", title: "Link Child", desc: "Connect child's account" },
                    { step: "3", title: "Configure", desc: "Set restrictions and limits" },
                    { step: "4", title: "Monitor", desc: "Review activity reports" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-medium mx-auto mb-3">
                        {item.step}
                      </div>
                      <h4 className="font-medium mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Data Rights Section */}
        <section id="rights" className="py-32 px-6 bg-white text-black">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="text-8xl font-light text-gray-300">5</div>
                <h2 className="text-4xl md:text-5xl font-light">Your Data Rights</h2>
                <p className="text-xl text-gray-600 leading-relaxed">You have full control over your personal data</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Access Your Data",
                    desc: "Request a complete copy of all data we have about you",
                    action: "Download your data archive anytime from account settings",
                  },
                  {
                    title: "Correct Your Data",
                    desc: "Update or correct any inaccurate personal information",
                    action: "Edit your profile and account information directly",
                  },
                  {
                    title: "Delete Your Data",
                    desc: "Request permanent deletion of your account and associated data",
                    action: "Account deletion is processed within 30 days",
                  },
                  {
                    title: "Export Your Data",
                    desc: "Download your data in a portable, machine-readable format",
                    action: "Export includes all game progress, settings, and content",
                  },
                  {
                    title: "Restrict Processing",
                    desc: "Limit how we use your data while keeping your account active",
                    action: "Configure data processing preferences in settings",
                  },
                  {
                    title: "Object to Processing",
                    desc: "Opt out of specific data processing activities",
                    action: "Manage consent preferences for analytics and marketing",
                  },
                ].map((right, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-3">{right.title}</h3>
                    <p className="text-gray-600 mb-4">{right.desc}</p>
                    <p className="text-sm text-gray-500 italic">{right.action}</p>
                  </div>
                ))}
              </div>

              <div className="bg-black text-white rounded-xl p-8">
                <h3 className="text-2xl font-light mb-4">GDPR & CCPA Compliance</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We comply with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act
                  (CCPA), ensuring your data rights are protected regardless of your location.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Right to be informed",
                    "Right to access",
                    "Right to rectification",
                    "Right to erasure",
                    "Right to restrict processing",
                    "Right to data portability",
                  ].map((right, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-cyan-400">✓</span>
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact & Support Section */}
        <section className="py-32 px-6 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-light">Questions or Concerns?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Our privacy and safety team is here to help. Contact us anytime with questions about your data, privacy,
                or security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
                  Contact Support
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full">
                  Privacy Policy
                </Button>
              </div>
              <p className="text-gray-500 text-sm">Last updated: January 2024 • Email: privacy@xenointeractions.com</p>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  const GamesPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Our Games</p>
          <h1 className="text-6xl font-light text-white mb-6">Explore Our Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the immersive gaming experiences we're creating
          </p>
        </motion.div>

        <div className="space-y-12">
          {[
            {
              title: t("theWakingSoul"),
              desc: t("wakingSoulDesc"),
              progress: 11,
              icon: Zap,
              gradient: "from-cyan-400 to-blue-500",
              tags: ["Horror", "Psychological", "Single Player"],
              page: "waking-soul",
            },
            {
              title: t("tropik"),
              desc: t("tropikDesc"),
              progress: 3,
              icon: Trophy,
              gradient: "from-green-400 to-emerald-500",
              tags: ["Adventure", "Puzzle", "Multiplayer", "Moddable"],
              page: "tropik",
            },
          ].map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setCurrentPage(game.page)}
              className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${game.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}
                >
                  <game.icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-light text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-gray-400 mb-4 leading-relaxed">{game.desc}</p>
                  <div className="flex gap-2 mb-6">
                    {game.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Development Progress</span>
                      <span className="text-cyan-400">{game.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${game.gradient} rounded-full`}
                        style={{ width: `${game.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  // CommunityPage component updated with new content and layout
  const CommunityPage = () => {
    const floatingOrbs = useMemo(
      () =>
        [...Array(6)].map((_, i) => ({
          id: i,
          background:
            i === 0 || i === 3
              ? "rgba(255, 255, 255, 0.08)"
              : i === 1 || i === 4
                ? "rgba(6, 182, 212, 0.15)"
                : "rgba(168, 85, 247, 0.12)",
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          duration: 25 + i * 3,
        })),
      [],
    )

    const [activeMembersOnline, setActiveMembersOnline] = useState(2847)

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-white/5 to-purple-500/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-[grid-move_20s_linear_infinite]" />
          {floatingOrbs.map((orb) => (
            <motion.div
              key={orb.id}
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: orb.background,
                left: orb.left,
                top: orb.top,
              }}
              animate={{
                x: [0, 80, -80, 0],
                y: [0, -80, 80, 0],
                scale: [1, 1.2, 0.9, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <section className="relative z-10 min-h-[80vh] flex items-center justify-center">
          <div className="text-center px-6 max-w-6xl mx-auto py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-white via-cyan-300 to-purple-400 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(255,255,255,0.5)] animate-pulse">
                <Users className="w-12 h-12 text-black" />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.4em] text-white/90 font-light"
              >
                Join 15,000+ Members
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-8xl md:text-9xl font-light tracking-tight leading-none"
              >
                <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                  Community
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed"
              >
                Where gamers, modders, and creators unite
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/30 rounded-full"
              >
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                <span className="text-green-300 text-lg font-light">
                  {activeMembersOnline.toLocaleString()} Members Online
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6">
                Connect Everywhere
              </h2>
              <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
                Choose your preferred platform to join the conversation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="group relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border-indigo-400/20 p-10 hover:border-indigo-400/50 transition-all duration-500 overflow-hidden h-full cursor-pointer hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(129,140,248,0.5)] group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-light text-white">12.5K+</p>
                        <p className="text-sm text-white/60 font-light">Active Members</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-4xl font-light text-white mb-3 group-hover:text-indigo-200 transition-colors">
                        Discord Server
                      </h3>
                      <p className="text-xl text-white/70 font-light leading-relaxed mb-6">
                        Real-time chat, voice channels, and exclusive developer updates
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Text Channels", value: "45+" },
                        { label: "Voice Rooms", value: "12" },
                        { label: "Active Daily", value: "2.8K" },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/10"
                        >
                          <span className="text-white/70 font-light">{stat.label}</span>
                          <span className="text-white font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(129,140,248,0.4)] font-light py-6 text-lg">
                      Join Discord Server
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border-orange-400/20 p-10 hover:border-orange-400/50 transition-all duration-500 overflow-hidden h-full cursor-pointer hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(251,146,60,0.5)] group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-light text-white">8.3K+</p>
                        <p className="text-sm text-white/60 font-light">Topics</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-4xl font-light text-white mb-3 group-hover:text-orange-200 transition-colors">
                        Community Forums
                      </h3>
                      <p className="text-xl text-white/70 font-light leading-relaxed mb-6">
                        In-depth discussions, guides, and long-form content
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Categories", value: "24" },
                        { label: "Total Posts", value: "45K+" },
                        { label: "Daily Posts", value: "320" },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/10"
                        >
                          <span className="text-white/70 font-light">{stat.label}</span>
                          <span className="text-white font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(251,146,60,0.4)] font-light py-6 text-lg">
                      Visit Forums
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-6 mb-20"
            >
              {[
                { platform: "Twitter", followers: "8.5K", color: "from-blue-400 to-cyan-500", icon: Star },
                { platform: "Reddit", subscribers: "5.2K", color: "from-orange-400 to-red-500", icon: MessageSquare },
                { platform: "YouTube", subscribers: "12.3K", color: "from-red-500 to-pink-500", icon: Play },
                { platform: "Twitch", followers: "3.8K", color: "from-purple-500 to-indigo-500", icon: Users },
              ].map((social, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 bg-gray-900/30 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer hover:scale-105"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <social.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-white text-center mb-2">{social.platform}</h3>
                  <p className="text-2xl font-medium text-white text-center mb-1">{social.followers}</p>
                  <p className="text-sm text-white/60 text-center font-light">Followers</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-light bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6">
                  Active Game Rooms
                </h2>
                <p className="text-xl text-white/70 font-light">Join or create private game sessions</p>
              </div>

              <Card className="bg-gray-900/30 backdrop-blur-xl border-white/10 p-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      code: "XENO-2024",
                      game: "Tropik Beta",
                      players: "12/32",
                      status: "Active",
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      code: "SOUL-ALPHA",
                      game: "The Waking Soul",
                      players: "2/2",
                      status: "Full",
                      color: "from-red-400 to-orange-500",
                    },
                    {
                      code: "COMM-HUB1",
                      game: "Community Hub",
                      players: "48/50",
                      status: "Live",
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      code: "TEST-ENV",
                      game: "Testing Arena",
                      players: "5/16",
                      status: "Dev",
                      color: "from-white to-gray-400",
                    },
                    {
                      code: "MOD-LOBBY",
                      game: "Mod Showcase",
                      players: "18/30",
                      status: "Active",
                      color: "from-green-400 to-emerald-500",
                    },
                    {
                      code: "VIP-ROOM",
                      game: "VIP Access",
                      players: "8/10",
                      status: "Private",
                      color: "from-yellow-400 to-amber-500",
                    },
                  ].map((room, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative p-6 bg-gray-900/40 border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-4 py-1 bg-gradient-to-r ${room.color} rounded-full`}>
                          <span className="text-black text-xs font-medium">{room.status}</span>
                        </div>
                        <span className="text-white/60 text-sm font-light">{room.players}</span>
                      </div>
                      <p className="text-2xl font-mono font-medium text-white mb-2 tracking-wider">{room.code}</p>
                      <p className="text-white/70 font-light text-sm mb-4">{room.game}</p>
                      <Button
                        size="sm"
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white border-white/20"
                      >
                        Join Room
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)] font-light py-6 text-lg">
                  Create New Room
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 py-32 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-light bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-white/70 font-light">Join tournaments, game nights, and developer Q&As</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Weekend Tournament",
                  date: "This Saturday",
                  time: "3:00 PM EST",
                  game: "Tropik Beta",
                  participants: "64 Players",
                  prize: "$500 Prize Pool",
                  icon: Trophy,
                },
                {
                  title: "Developer Q&A",
                  date: "Next Wednesday",
                  time: "7:00 PM EST",
                  game: "The Waking Soul",
                  participants: "Live Stream",
                  prize: "Exclusive Insights",
                  icon: Sparkles,
                },
                {
                  title: "Modding Workshop",
                  date: "Next Friday",
                  time: "5:00 PM EST",
                  game: "AXO Scripting",
                  participants: "Learn & Create",
                  prize: "Free Access",
                  icon: Code,
                },
              ].map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 bg-gray-900/30 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
                    <event.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">{event.title}</h3>
                  <p className="text-cyan-400 font-light mb-4">{event.game}</p>
                  <div className="space-y-2 mb-6">
                    <p className="text-white/70 text-sm font-light">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-white/60 text-sm font-light">{event.participants}</p>
                    <p className="text-white/80 font-medium">{event.prize}</p>
                  </div>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-light">
                    Register Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-32 px-6 border-t border-white/10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-6xl md:text-7xl font-light leading-tight bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Ready to Join?
              </h2>
              <p className="text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                Become part of our thriving community today
              </p>
              <Button className="px-12 py-8 bg-gradient-to-r from-white via-cyan-300 to-white text-black rounded-full hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,255,255,0.7)] font-light text-xl">
                Join Discord
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  const NotificationsPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-light text-white mb-12">{t("notificationsTitle")}</h1>
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{t("noNotifications")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const AxoScriptingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-[grid-move_20s_linear_infinite]" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background:
                i === 0 ? "rgba(6, 182, 212, 0.1)" : i === 1 ? "rgba(59, 130, 246, 0.1)" : "rgba(168, 85, 247, 0.1)",
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6">
              <span className="text-cyan-400 text-sm font-light">AXO Scripting Platform</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-light mb-6 tracking-tight">
              Build Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Own Mods
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
              Create custom gameplay experiences with our powerful AXO scripting system. Get AI assistance, test your
              code, and learn from comprehensive documentation.
            </p>
          </motion.div>
        </div>

        {/* AI Assistant Featured Card */}
        <div className="max-w-4xl mx-auto px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Link href="/axo">
              <div className="glass-card p-12 cursor-pointer group relative overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400/60">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 mb-8 mx-auto group-hover:scale-110 transition-transform">
                    <Sparkles className="w-12 h-12 text-black" />
                  </div>
                  <h3 className="text-5xl font-light text-white mb-4">AI Assistant</h3>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
                    Get instant help with C# scripting, Unity integration, debugging, and best practices. Powered by
                    Claude AI for intelligent code assistance.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-cyan-400 group-hover:gap-4 transition-all">
                    <span className="text-lg font-light">Launch AI Assistant</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* IMPORTANT WARNING SECTION */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-red-500/10 border-2 border-red-500 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-light text-red-500 mb-4">Important Warning - Alpha Status</h2>
                <p className="text-lg text-white mb-6 leading-relaxed font-light">
                  AXO is currently in <span className="font-semibold text-red-400">ALPHA</span>. We ONLY allow specific
                  sections of the game to be modded. Attempting to mod the full game will result in the following
                  punishments:
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-12">
              <div className="flex items-start gap-4 bg-black/50 p-4 rounded-xl border border-red-500/30">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">First Offense</h3>
                  <p className="text-gray-400 font-light">Official Warning - Your account will be flagged</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/50 p-4 rounded-xl border border-red-500/30">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">Second Offense</h3>
                  <p className="text-gray-400 font-light">Suspension from Voice Chat and Rooms</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/50 p-4 rounded-xl border border-red-500/30">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">Third Offense</h3>
                  <p className="text-gray-400 font-light">Account Ban - Permanent removal from the platform</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/50 p-4 rounded-xl border border-red-500/30">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">Fourth Offense (Alt Accounts)</h3>
                  <p className="text-gray-400 font-light">
                    Permanent Headset Ban - Hardware-level ban if alternate accounts are used
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 ml-12 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-400 text-sm leading-relaxed font-light">
                <span className="font-semibold">Please Note:</span> Only mod the approved sections of the game. Full
                documentation on allowed modding areas is available in the SDK documentation. Respect the rules to keep
                the community safe and fair for everyone.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick Start Guide */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-4xl font-light mb-12">Quick Start Guide</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  num: "1",
                  title: "Install AXO SDK",
                  desc: "Download and install the AXO Software Development Kit from our developer portal to get started.",
                },
                {
                  num: "2",
                  title: "Choose C# for Unity",
                  desc: "Use C# for full Unity integration and professional-grade development capabilities.",
                },
                {
                  num: "3",
                  title: "Ask the AI Assistant",
                  desc: "Get instant help with scripting, debugging, and best practices from our AI assistant.",
                },
                {
                  num: "4",
                  title: "Build & Deploy",
                  desc: "Create your mod and deploy it to share with the community.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">{item.num}</span>
                    </div>
                    <h3 className="text-xl font-light">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )

  const ContactPage = () => (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Get In Touch</p>
          <h1 className="text-6xl font-light text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or a business inquiry? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-medium">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Community Forums</p>
                    <a href="#" className="text-cyan-400 hover:underline">
                      Discuss with other players
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <Bell className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Support Tickets</p>
                    <a href="#" className="text-cyan-400 hover:underline">
                      Submit a support request
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg"
                      alt="Discord"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Discord</p>
                    <a href="#" className="text-cyan-400 hover:underline">
                      Join our server
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case "games":
        return <GamesPage />
      case "community":
        return <CommunityPage />
      case "notifications":
        return <NotificationsPage />
      case "waking-soul":
        return <WakingSoulPage />
      case "tropik":
        return <TropikPage />
      case "axo":
        return <AxoPage />
      case "privacy":
        return <PrivacySafetyPage />
      case "axo-scripting":
        return <AxoScriptingPage />
      case "contact": // Added contact page to navigation
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3">
            <img src="/images/design-mode/image.png" alt="Xeno Logo" className="w-8 h-8" />
            <span className="text-xl font-light">Xeno</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`text-sm transition-colors ${currentPage === "home" ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
            >
              Home
            </button>
            <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/wiki" className="text-sm text-gray-400 hover:text-white transition-colors">
              Wiki
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy &amp; Policies
            </Link>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt="Avatar" className="w-8 h-8 rounded-full" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl p-2 min-w-48"
                    >
                      <div className="px-3 py-2 border-b border-gray-800">
                        <p className="font-medium text-white">{user.displayName}</p>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                      </div>

                      <button
                        onClick={() => {
                          setShowSettingsModal(true)
                          setShowUserDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        {t("settings")}
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t("logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-white text-black hover:bg-gray-200 px-6 py-2 text-sm rounded-full">
                  {t("login")}
                </Button>
              </Link>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 pt-16">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </div>
    </div>
  )
}
