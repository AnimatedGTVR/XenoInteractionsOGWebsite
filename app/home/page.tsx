"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Users, Code, Gamepad2, Star, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectCardSkeleton } from "@/components/ui/project-card-skeleton"
import { TeamCardSkeleton } from "@/components/ui/team-card-skeleton"
import { OptimizedImage } from "@/components/optimized-image"
import BottomHotbar from "@/components/bottom-hotbar"

export default function HomePage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [teamLoading, setTeamLoading] = useState(true)

  // Simulate loading states
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    const projectsTimer = setTimeout(() => {
      setProjectsLoading(false)
    }, 1200)

    const teamTimer = setTimeout(() => {
      setTeamLoading(false)
    }, 1600)

    return () => {
      clearTimeout(timer)
      clearTimeout(projectsTimer)
      clearTimeout(teamTimer)
    }
  }, [])

  const projects = [
    {
      id: "waking-soul",
      title: "The Waking Soul",
      description: "An immersive adventure game that explores consciousness and reality",
      status: "In Development",
      image: "/images/the-waking-soul-logo.png",
      tags: ["Adventure", "Indie", "Story-Rich"],
      progress: 65,
    },
    {
      id: "panda-paradise",
      title: "Panda Paradise",
      description: "A relaxing simulation game about caring for pandas",
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300&text=Panda+Paradise",
      tags: ["Simulation", "Casual", "Family"],
      progress: 30,
    },
    {
      id: "mod-tools",
      title: "Mod Creation Tools",
      description: "Powerful tools for creating and sharing game modifications",
      status: "Beta",
      image: "/placeholder.svg?height=200&width=300&text=Mod+Tools",
      tags: ["Tools", "Modding", "Community"],
      progress: 80,
    },
  ]

  const teamMembers = [
    {
      name: "Animated",
      role: "CEO & Founder",
      avatar: "/images/animated-avatar.png",
      description: "Leading the vision and development of Xeno Interactions",
    },
    {
      name: "Anemunt",
      role: "Lead Voice Actor & Head of Gameplay",
      avatar: "/images/anemunt-avatar.png",
      description: "Third in Command, bringing characters to life through voice",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading Xeno Interactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-32">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Xeno Interactions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Creating immersive gaming experiences that push the boundaries of interactive entertainment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Explore Our Games
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-xl font-semibold bg-transparent transition-all duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Projects</h2>
            <p className="text-gray-400 text-lg">Discover what we're building</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading
              ? Array.from({ length: 3 }).map((_, index) => <ProjectCardSkeleton key={index} />)
              : projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <Card className="bg-gray-800/50 border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <OptimizedImage
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={200}
                          className="w-full h-48"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-500/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white">{project.title}</CardTitle>
                        <CardDescription className="text-gray-400">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span key={tag} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Learn More
                          </Button>
                          {project.status === "Beta" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 bg-transparent hover:bg-gray-700 transition-colors duration-300"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400 text-lg">The creative minds behind Xeno Interactions</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamLoading
              ? Array.from({ length: 3 }).map((_, index) => <TeamCardSkeleton key={index} />)
              : teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="bg-gray-800/50 border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 text-center">
                      <CardHeader>
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-600">
                          <OptimizedImage
                            src={member.avatar}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-full h-full"
                            priority={index === 0}
                          />
                        </div>
                        <CardTitle className="text-white">{member.name}</CardTitle>
                        <CardDescription className="text-blue-400 font-semibold">{member.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm">{member.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Projects", value: "3", icon: Code },
              { label: "Team Members", value: "3", icon: Users },
              { label: "Community Members", value: "150+", icon: Star },
              { label: "Games Released", value: "1", icon: Gamepad2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Hotbar */}
      <BottomHotbar />
    </div>
  )
}
