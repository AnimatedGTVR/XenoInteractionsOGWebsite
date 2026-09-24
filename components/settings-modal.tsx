"use client"

import { useState, useEffect } from "react"
import { X, SettingsIcon, Volume2, Palette, Shield, Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion, AnimatePresence } from "framer-motion"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AppSettings {
  theme: string
  language: string
  notifications: boolean
  soundEnabled: boolean
  soundVolume: number
  autoSave: boolean
  analytics: boolean
  betaFeatures: boolean
}

const defaultSettings: AppSettings = {
  theme: "dark",
  language: "en",
  notifications: true,
  soundEnabled: true,
  soundVolume: 70,
  autoSave: true,
  analytics: false,
  betaFeatures: false,
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  useEffect(() => {
    if (isOpen) {
      loadSettings()
    }
  }, [isOpen])

  const loadSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      const savedSettings = localStorage.getItem("xeno-settings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
      setIsLoading(false)
    }, 500)
  }

  const saveSettings = async () => {
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem("xeno-settings", JSON.stringify(settings))
      setHasChanges(false)
      setIsSaving(false)
    }, 800)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  const updateSetting = (key: keyof AppSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const testSound = () => {
    if (settings.soundEnabled) {
      // Play a test sound
      const audio = new Audio("/sounds/click.mp3")
      audio.volume = settings.soundVolume / 100
      audio.play().catch(() => {
        // Handle audio play failure silently
      })
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Settings</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-gray-400">Loading settings...</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gray-700/50">
                  <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
                    General
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="data-[state=active]:bg-blue-600">
                    Audio
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600">
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-600">
                    Advanced
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 max-h-96 overflow-y-auto">
                  <TabsContent value="general" className="space-y-6">
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white">General Preferences</CardTitle>
                        <CardDescription>Configure your basic settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="language" className="text-white">
                            Language
                          </Label>
                          <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                            <SelectTrigger className="w-32 bg-gray-600 border-gray-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notifications" className="text-white">
                            Enable Notifications
                          </Label>
                          <Switch
                            id="notifications"
                            checked={settings.notifications}
                            onCheckedChange={(checked) => updateSetting("notifications", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="autosave" className="text-white">
                            Auto-save Settings
                          </Label>
                          <Switch
                            id="autosave"
                            checked={settings.autoSave}
                            onCheckedChange={(checked) => updateSetting("autoSave", checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="audio" className="space-y-6">
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Volume2 className="h-5 w-5" />
                          Audio Settings
                        </CardTitle>
                        <CardDescription>Control sound and audio preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sound" className="text-white">
                            Enable Sound Effects
                          </Label>
                          <Switch
                            id="sound"
                            checked={settings.soundEnabled}
                            onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">Volume</Label>
                            <span className="text-gray-400 text-sm">{settings.soundVolume}%</span>
                          </div>
                          <Slider
                            value={[settings.soundVolume]}
                            onValueChange={(value) => updateSetting("soundVolume", value[0])}
                            max={100}
                            step={5}
                            disabled={!settings.soundEnabled}
                            className="w-full"
                          />
                        </div>
                        <Button
                          onClick={testSound}
                          disabled={!settings.soundEnabled}
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                        >
                          Test Sound
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-6">
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          Appearance
                        </CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="theme" className="text-white">
                            Theme
                          </Label>
                          <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                            <SelectTrigger className="w-32 bg-gray-600 border-gray-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6">
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Advanced Settings
                        </CardTitle>
                        <CardDescription>Developer and privacy options</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="analytics" className="text-white">
                            Enable Analytics
                          </Label>
                          <Switch
                            id="analytics"
                            checked={settings.analytics}
                            onCheckedChange={(checked) => updateSetting("analytics", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="beta" className="text-white">
                            Beta Features
                          </Label>
                          <Switch
                            id="beta"
                            checked={settings.betaFeatures}
                            onCheckedChange={(checked) => updateSetting("betaFeatures", checked)}
                          />
                        </div>
                        <Button
                          onClick={resetSettings}
                          variant="outline"
                          size="sm"
                          className="w-full text-red-400 border-red-400 hover:bg-red-400/10 bg-transparent"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset to Defaults
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>

              {hasChanges && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                  <Button onClick={saveSettings} disabled={isSaving} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    {isSaving ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      loadSettings()
                      setHasChanges(false)
                    }}
                    variant="outline"
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
