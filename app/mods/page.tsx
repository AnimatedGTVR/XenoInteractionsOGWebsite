"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Search,
  Download,
  Star,
  User,
  Calendar,
  Tag,
  ArrowRight,
  AlertTriangle,
  Github,
  ExternalLink,
} from "lucide-react"

interface GitHubMod {
  id: number
  name: string
  tag: string
  description: string
  published_at: string
  downloads: number
  assets: Array<{
    name: string
    size: number
    download_url: string
    download_count: number
  }>
}

interface RepoData {
  repository: {
    name: string
    description: string
    stars: number
    forks: number
    language: string
    updated_at: string
    html_url: string
  }
  mods: GitHubMod[]
  stats: {
    totalContributors: number
    totalMods: number
  }
}

export default function ModsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [repoData, setRepoData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = ["All", "Gameplay", "Visual", "Audio", "Utility", "Experimental"]

  useEffect(() => {
    async function fetchMods() {
      try {
        setLoading(true)
        const response = await fetch("/api/github/repo?repo=AnimatedGTVR/XLLCMS---Mod-System-Xeno")

        if (!response.ok) {
          throw new Error("Failed to fetch mods from GitHub")
        }

        const data = await response.json()
        setRepoData(data)
        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching mods:", err)
        setError("Unable to load mods from GitHub. Showing demo content.")
      } finally {
        setLoading(false)
      }
    }

    fetchMods()
  }, [])

  const demoMods = [
    {
      id: 1,
      name: "Enhanced Physics",
      description: "Improved physics simulation for more realistic interactions in VR environments.",
      category: "Gameplay",
      version: "2.1.0",
      downloads: 1250,
      rating: 4.8,
      author: "Anemunt",
      lastUpdated: "2024-01-15",
      tags: ["Physics", "Realism", "VR"],
      downloadUrl: "https://example.com/download/EnhancedPhysics",
      assets: [],
    },
    {
      id: 2,
      name: "Neon UI Pack",
      description: "Futuristic neon-themed UI elements and HUD components for VR games.",
      category: "Visual",
      version: "1.5.2",
      downloads: 890,
      rating: 4.6,
      author: "Slugmaster",
      lastUpdated: "2024-01-10",
      tags: ["UI", "Neon", "Futuristic"],
      downloadUrl: "https://example.com/download/NeonUIPack",
      assets: [],
    },
    {
      id: 3,
      name: "Spatial Audio Engine",
      description: "Advanced 3D audio processing for immersive soundscapes in virtual reality.",
      category: "Audio",
      version: "3.0.1",
      downloads: 2100,
      rating: 4.9,
      author: "Anemunt",
      lastUpdated: "2024-01-20",
      tags: ["Audio", "3D", "Immersive"],
      downloadUrl: "https://example.com/download/SpatialAudioEngine",
      assets: [],
    },
    {
      id: 4,
      name: "Debug Console Pro",
      description: "Professional debugging tools and console for VR development and testing.",
      category: "Utility",
      version: "1.8.0",
      downloads: 650,
      rating: 4.7,
      author: "Slugmaster",
      lastUpdated: "2024-01-08",
      tags: ["Debug", "Development", "Tools"],
      downloadUrl: "https://example.com/download/DebugConsolePro",
      assets: [],
    },
    {
      id: 5,
      name: "Quantum Shaders",
      description: "Experimental shader pack with quantum-inspired visual effects and materials.",
      category: "Experimental",
      version: "0.9.5",
      downloads: 420,
      rating: 4.3,
      author: "Anemunt",
      lastUpdated: "2024-01-12",
      tags: ["Shaders", "Experimental", "Quantum"],
      downloadUrl: "https://example.com/download/QuantumShaders",
      assets: [],
    },
    {
      id: 6,
      name: "Hand Tracking Plus",
      description: "Enhanced hand tracking with gesture recognition and improved accuracy.",
      category: "Gameplay",
      version: "2.3.1",
      downloads: 1800,
      rating: 4.8,
      author: "Slugmaster",
      lastUpdated: "2024-01-18",
      tags: ["Hand Tracking", "Gestures", "Accuracy"],
      downloadUrl: "https://example.com/download/HandTrackingPlus",
      assets: [],
    },
  ]

  const mods =
    repoData?.mods.map((mod) => ({
      id: mod.id,
      name: mod.name,
      description: mod.description || "No description available",
      category: "Gameplay",
      version: mod.tag,
      downloads: mod.downloads,
      rating: 4.5,
      author: "Community",
      lastUpdated: new Date(mod.published_at).toLocaleDateString(),
      tags: ["Mod", "Community"],
      downloadUrl: mod.assets[0]?.download_url,
      assets: mod.assets,
    })) || demoMods

  const filteredMods = mods.filter((mod) => {
    const matchesCategory = selectedCategory === "All" || mod.category === selectedCategory
    const matchesSearch =
      mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            animation: "grid-move-slow 30s linear infinite",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl floating-orb" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-orb"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 font-light">Community Content</p>
            <h1 className="text-6xl md:text-7xl font-light leading-tight">Mods Library</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Enhance your gaming experience with community-created modifications and tools
            </p>

            {repoData && (
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400 pt-4 font-light">
                <a
                  href={repoData.repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  {repoData.repository.stars} stars
                </span>
                <span>{repoData.stats.totalMods} mods available</span>
                <span>{repoData.stats.totalContributors} contributors</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card border border-yellow-500/30 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-light text-yellow-400 mb-2">Important Notice</h3>
                <p className="text-yellow-200/80 text-sm leading-relaxed font-light">
                  These mods are experimental and may affect game stability. Always backup your saves before
                  installation. Use at your own discretion and ensure compatibility with your setup. Xeno Interactions
                  is not responsible for issues caused by third-party modifications.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-light"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-light transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "glass-card border border-gray-800 text-gray-300 hover:border-cyan-400/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mods Grid Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
              <p className="text-gray-400 font-light">Loading mods from GitHub...</p>
            </div>
          )}

          {error && (
            <div className="glass-card border border-yellow-500/30 rounded-2xl p-6 mb-8">
              <p className="text-yellow-400 font-light">{error}</p>
            </div>
          )}

          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredMods.map((mod, index) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card border border-cyan-400/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-light group-hover:text-cyan-400 transition-colors">
                                {mod.name}
                              </h3>
                              <span className="px-3 py-1 glass-card border border-gray-800 text-gray-400 rounded-full text-sm font-light">
                                v{mod.version}
                              </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed font-light">{mod.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {mod.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 glass-card border border-cyan-400/20 text-gray-300 rounded-full text-sm flex items-center gap-1 font-light"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-light">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{mod.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{mod.lastUpdated}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>{mod.downloads.toLocaleString()} downloads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{mod.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Button
                          onClick={() => mod.downloadUrl && window.open(mod.downloadUrl, "_blank")}
                          className="bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-full flex items-center gap-2 whitespace-nowrap font-light transition-all duration-300 hover:scale-105"
                        >
                          <Download className="w-5 h-5" />
                          Download Mod
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filteredMods.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-light text-white mb-2">No mods found</h3>
              <p className="text-gray-400 font-light">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-white">Want to create your own mods?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Learn about the Axo coding system and start building custom content for Tropik
            </p>
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full inline-flex items-center gap-2 font-light transition-all duration-300 hover:scale-105">
              Learn About Axo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
