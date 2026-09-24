"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-white/[0.03]" />

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

        {/* Floating orbs */}
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
            <p className="text-sm uppercase tracking-widest text-gray-500 font-light">About Us</p>
            <h1 className="text-7xl md:text-8xl font-light tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Xeno Tech
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Owning and supporting independent software projects through focus and curiosity
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
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-light">Our Team</p>
            <h2 className="text-5xl md:text-6xl font-light text-white">The People Behind Xeno</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                name: "Animated",
                role: "Founder",
                description: "Game & Company Director leading strategic vision and innovation",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4baf8e7da557f1ac29dcb30dff9c1e67-JcCR3YTUHaA6XP0iorpPrZkHP6vSLa.jpg",
              },
              {
                number: "4",
                name: "Anemunt",
                role: "Partner",
                description: "Xeno Tech Manager & Gameplay Systems Lead ensuring quality experiences",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled71_20250919224056-boz9YiY62ILTzu0TpBa643E7nUCGwG.png",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-white/15 hover:border-white/35 transition-all duration-300 group"
              >
                <div className="relative w-full aspect-square mx-auto mb-6 overflow-hidden rounded-xl">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="text-6xl font-light text-gray-800 mb-4">{member.number}</div>
                <h3 className="text-2xl font-light text-white mb-2">{member.name}</h3>
                <p className="text-cyan-400 mb-3 font-light">{member.role}</p>
                <p className="text-gray-400 leading-relaxed text-sm font-light">{member.description}</p>
              </motion.div>
            ))}
          </div>
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
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-light">Our Values</p>
            <h2 className="text-5xl md:text-6xl font-light text-white">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: "1",
                title: "Passion-Driven",
                description: "Every project is crafted with genuine love and dedication to interactive entertainment",
              },
              {
                number: "2",
                title: "Innovation First",
                description: "We push boundaries and explore new possibilities in gaming and interactive media",
              },
              {
                number: "3",
                title: "Community Focused",
                description:
                  "Our community is at the heart of everything we do, driving us to create better experiences",
              },
              {
                number: "4",
                title: "Quality Excellence",
                description: "We never compromise on quality, ensuring every release meets our high standards",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="text-6xl font-light text-gray-800 mb-4">{value.number}</div>
                <h3 className="text-2xl font-light text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed font-light">{value.description}</p>
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
            <h2 className="text-5xl md:text-6xl font-light leading-tight text-white">Join our journey</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Explore our projects and be part of something extraordinary
            </p>
            <Link href="/projects">
              <Button className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20">
                View Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
