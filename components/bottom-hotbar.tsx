"use client"

import { useState } from "react"
import { Home, User, Settings, Mail, Gamepad2, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsModal } from "@/components/settings-modal"
import { ContactModal } from "@/components/contact-modal"
import { motion } from "framer-motion"

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: User, label: "About", id: "about" },
  { icon: Gamepad2, label: "Games", id: "games" },
  { icon: Code, label: "Mods", id: "mods" },
  { icon: Mail, label: "Contact", id: "contact" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export default function BottomHotbar() {
  const [activeItem, setActiveItem] = useState("home")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleItemClick = (id: string) => {
    setActiveItem(id)

    if (id === "settings") {
      setIsSettingsOpen(true)
    } else if (id === "contact") {
      setIsContactOpen(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <Button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  variant="ghost"
                  size="sm"
                  className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </motion.div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
