"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/[0.03]" />
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-orb" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-orb"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 font-light">Our Work</p>
            <h1 className="text-7xl md:text-8xl font-light tracking-tight text-white leading-tight">Projects</h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Independent software projects owned and supported by Xeno Tech
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-light">Owned and supported</p>
            <h2 className="text-5xl md:text-6xl font-light text-white">The project ecosystem</h2>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: "1",
                title: "The Waking Soul",
                category: "Horror Game",
                description:
                  "An immersive psychological horror experience that challenges players to navigate through terror and uncover dark secrets. Advanced mechanics and dynamic environments create an unforgettable experience.",
                progress: 11,
                features: [
                  "Psychological Horror",
                  "Immersive Storytelling",
                  "Advanced Mechanics",
                  "Dynamic Environment",
                ],
                technologies: ["Unity", "C#", "Spatial Audio"],
              },
              {
                number: "2",
                title: "Tropik",
                category: "Adventure Game",
                description:
                  "A vibrant tropical adventure featuring the Axo community coding system. Players explore beautiful landscapes while solving puzzles and creating custom content with Lua and C# support.",
                progress: 3,
                features: ["Open World", "Puzzle Solving", "Community Coding", "Beautiful Graphics"],
                technologies: ["Unity", "C#", "Axo System", "Lua"],
              },
              {
                number: "3",
                title: "Axo Coding System",
                category: "Development Tool",
                description:
                  "A powerful community coding platform integrated into Tropik, supporting both Lua and C# scripting. Designed for Unity developers to create custom game modes and experiences.",
                progress: 15,
                features: ["Lua Support", "C# Integration", "Unity Tools", "Community Platform"],
                technologies: ["C#", "Lua", "Unity SDK", "Custom Framework"],
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-none border border-white/15 hover:border-white/35 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="text-8xl font-light text-gray-800">{project.number}</div>
                    <div>
                      <h3 className="text-4xl font-light mb-2 text-white">{project.title}</h3>
                      <p className="text-white/70 uppercase tracking-wider text-sm font-light">{project.category}</p>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg font-light">{project.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 font-light">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/70 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-2 text-white/70 hover:gap-4 transition-all duration-300 mt-4 font-light">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-light">Key Features</h4>
                      <div className="space-y-2">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            <span className="text-gray-300 font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-light">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 border border-cyan-400/30 rounded-full text-sm text-gray-300 font-light hover:bg-white/5 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-5xl md:text-6xl font-light leading-tight text-white">Explore the ecosystem</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Browse Xeno Tech projects, visit Abora OS, or explore the work supported by Tareno Labs.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
