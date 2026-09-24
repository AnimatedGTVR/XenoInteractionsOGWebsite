"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, Volume2, Gamepad, Bell, Shield, Palmtree } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [gameUpdates, setGameUpdates] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [volume, setVolume] = useState([75])
  const [musicVolume, setMusicVolume] = useState([60])
  const [language, setLanguage] = useState("en")

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your Xeno Interactions experience</p>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the Xeno Interactions website looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Theme</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setTheme("light")}
                      className="flex-1 gap-2"
                    >
                      <Sun className="h-5 w-5" />
                      Light Mode
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setTheme("dark")}
                      className="flex-1 gap-2"
                    >
                      <Moon className="h-5 w-5" />
                      Dark Mode
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setTheme("system")}
                      className="flex-1 gap-2"
                    >
                      <Monitor className="h-5 w-5" />
                      System
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme. System will automatically match your device's theme.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Animations</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Enable or disable UI animations</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <Switch id="high-contrast" />
                  </div>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palmtree className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Tropik Theme</h3>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    The mod editor automatically adapts to your chosen theme for the best coding experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio">
            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>Adjust sound settings for the website and games</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="master-volume" className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Master Volume
                    </Label>
                    <span className="text-sm">{volume}%</span>
                  </div>
                  <Slider id="master-volume" value={volume} onValueChange={setVolume} max={100} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="music-volume">Music Volume</Label>
                    <span className="text-sm">{musicVolume}%</span>
                  </div>
                  <Slider id="music-volume" value={musicVolume} onValueChange={setMusicVolume} max={100} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-effects">Sound Effects</Label>
                    <Switch id="sound-effects" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mute-in-background">Mute When Tab Inactive</Label>
                    <Switch id="mute-in-background" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically mute audio when browser tab is not active
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your Xeno Interactions account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" placeholder="Your display name" defaultValue="Player1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Your email address" defaultValue="player@example.com" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch id="two-factor" />
                  </div>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Connected Accounts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        <span>Steam</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gamepad className="h-5 w-5" />
                        <span>Discord</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="all-notifications" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      All Notifications
                    </Label>
                    <Switch id="all-notifications" checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <p className="text-sm text-muted-foreground">Enable or disable all notifications</p>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-medium">Notification Types</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="game-updates">Tropik Development Updates</Label>
                      <Switch
                        id="game-updates"
                        checked={gameUpdates && notifications}
                        onCheckedChange={setGameUpdates}
                        disabled={!notifications}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about Tropik development progress and updates
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <Switch
                        id="newsletter"
                        checked={newsletter && notifications}
                        onCheckedChange={setNewsletter}
                        disabled={!notifications}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive our monthly newsletter with game development updates
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mod-updates">Mod Community Updates</Label>
                      <Switch id="mod-updates" defaultChecked disabled={!notifications} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about new Tropik mods and updates
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
