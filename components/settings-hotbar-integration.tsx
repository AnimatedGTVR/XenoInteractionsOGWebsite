"use client"

import { useState } from "react"
import { SettingsModal } from "./settings-modal"
import { LoginModal } from "./login-modal"

export function SettingsHotbarIntegration() {
  const [showSettings, setShowSettings] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onShowLogin={() => {
          setShowSettings(false)
          setShowLogin(true)
        }}
      />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}
