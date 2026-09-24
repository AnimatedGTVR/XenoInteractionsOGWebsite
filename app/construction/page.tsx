"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Wrench, Hammer, Settings, Clock, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import BottomHotbar from "@/components/bottom-hotbar"
import ContactModal from "@/components/contact-modal"

export default function ConstructionPage() {
  const [showContact, setShowContact] = useState(false)

  const constructionIcons = [
    { icon: "🚧", delay: 0 },
    { icon: "🔧", delay: 0.2 },
    { icon: "🔨", delay: 0.4 },
    { icon: "⚠️", delay: 0.6 },
    { icon: "🏗️", delay: 0.8 },
    { icon: "⚙️", delay: 1.0 },
  ]

  const features = [
    { icon: Settings, title: "Enhanced Performance", description: "Optimizing speed and reliability" },
    { icon: Wrench, title: "New Features", description: "Adding exciting new functionality" },
    { icon: Hammer, title: "Better Design", description: "Improving user experience and visuals" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden pb-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {constructionIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl opacity-10"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 100, -100, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: 8,
              delay: item.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-8"
          >
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-300 font-semibold">Under Construction</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
          >
            We'll Be Right Back!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
          >
            Our team is working hard to bring you an amazing new experience. We're making improvements to serve you
            better!
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300"
              >
                <feature.icon className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Estimated Timeline</h3>
            </div>
            <p className="text-blue-200 text-lg">
              We expect to be back online within the next few days. Thank you for your patience!
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Need to contact us?</h3>
            <p className="text-gray-300 mb-6">Have urgent questions or need support? We're still here to help!</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setShowContact(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact.xeno.interaction.llc@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>animated_99245</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-12 text-center text-gray-500"
          >
            <p>© 2024 Xeno Interactions. We appreciate your patience!</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Hotbar */}
      <BottomHotbar />

      {/* Contact Modal */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  )
}
