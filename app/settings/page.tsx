"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "dark",
    animations: true,
    notifications: true,
    autoSave: true,
    language: "en",
    quality: "high",
    volume: 75,
    brightness: 80,
  })

  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("xenoSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem("xenoSettings", JSON.stringify(settings))
    setHasChanges(false)
    // Show success message or toast
  }

  const resetSettings = () => {
    const defaultSettings = {
      theme: "dark",
      animations: true,
      notifications: true,
      autoSave: true,
      language: "en",
      quality: "high",
      volume: 75,
      brightness: 80,
    }
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  const settingSections = [
    {
      title: "Appearance",
      icon: "🎨",
      settings: [
        {
          key: "theme",
          label: "Theme",
          type: "select",
          options: [
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
            { value: "auto", label: "Auto" },
          ],
        },
        {
          key: "animations",
          label: "Enable Animations",
          type: "toggle",
          description: "Enable smooth animations and transitions",
        },
        {
          key: "brightness",
          label: "Brightness",
          type: "slider",
          min: 0,
          max: 100,
          unit: "%",
        },
      ],
    },
    {
      title: "Audio & Video",
      icon: "🔊",
      settings: [
        {
          key: "volume",
          label: "Master Volume",
          type: "slider",
          min: 0,
          max: 100,
          unit: "%",
        },
        {
          key: "quality",
          label: "Video Quality",
          type: "select",
          options: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "ultra", label: "Ultra" },
          ],
        },
      ],
    },
    {
      title: "General",
      icon: "⚙️",
      settings: [
        {
          key: "notifications",
          label: "Enable Notifications",
          type: "toggle",
          description: "Receive updates about new projects and features",
        },
        {
          key: "autoSave",
          label: "Auto Save",
          type: "toggle",
          description: "Automatically save your preferences",
        },
        {
          key: "language",
          label: "Language",
          type: "select",
          options: [
            { value: "en", label: "English" },
            { value: "es", label: "Español" },
            { value: "fr", label: "Français" },
            { value: "de", label: "Deutsch" },
            { value: "ja", label: "日本語" },
          ],
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Customize your Xeno Interactions experience with these preferences and settings.
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.1 + settingIndex * 0.05 }}
                    className="flex items-center justify-between py-4 border-b border-gray-700/30 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{setting.label}</h3>
                      {setting.description && <p className="text-gray-400 text-sm">{setting.description}</p>}
                    </div>

                    <div className="ml-6">
                      {setting.type === "toggle" && (
                        <motion.button
                          onClick={() =>
                            handleSettingChange(setting.key, !settings[setting.key as keyof typeof settings])
                          }
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            settings[setting.key as keyof typeof settings] ? "bg-blue-500" : "bg-gray-600"
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                            animate={{
                              x: settings[setting.key as keyof typeof settings] ? 24 : 2,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      )}

                      {setting.type === "select" && (
                        <select
                          value={settings[setting.key as keyof typeof settings] as string}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {setting.type === "slider" && (
                        <div className="flex items-center gap-4 min-w-[200px]">
                          <input
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            value={settings[setting.key as keyof typeof settings] as number}
                            onChange={(e) => handleSettingChange(setting.key, Number.parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <span className="text-white font-mono text-sm min-w-[3rem] text-right">
                            {settings[setting.key as keyof typeof settings]}
                            {setting.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <motion.button
            onClick={saveSettings}
            disabled={!hasChanges}
            whileHover={{ scale: hasChanges ? 1.05 : 1 }}
            whileTap={{ scale: hasChanges ? 0.95 : 1 }}
            className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 ${
              hasChanges
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </motion.button>

          <motion.button
            onClick={resetSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-full hover:border-gray-400 hover:text-white transition-all duration-300"
          >
            Reset to Defaults
          </motion.button>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-blue-400">Settings Info</h3>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Your settings are automatically saved to your browser's local storage. Changes will persist across sessions,
            but may be lost if you clear your browser data.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
