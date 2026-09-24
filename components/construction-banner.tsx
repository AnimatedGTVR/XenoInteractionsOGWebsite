"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const dismissed = localStorage.getItem("construction-banner-dismissed")
    if (dismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("construction-banner-dismissed", "true")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm border-b border-yellow-500/30"
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-200" />
                  <Wrench className="h-4 w-4 text-yellow-200" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">We'll Be Right Back!</h3>
                  <p className="text-yellow-100 text-xs">
                    This is a beta version. Some features may not work perfectly yet.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-yellow-200 hover:text-white hover:bg-yellow-600/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
