"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Shield, Trophy, Star, Edit3, Save, X } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { updateUserProfile, signOutUser } from "@/lib/auth"
import { playSound } from "@/lib/sounds"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, userProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editData, setEditData] = useState({
    displayName: "",
    email: "",
  })

  useEffect(() => {
    if (userProfile) {
      setEditData({
        displayName: userProfile.displayName,
        email: userProfile.email,
      })
    }
  }, [userProfile])

  const handleSave = async () => {
    if (!user || !userProfile) return

    setIsLoading(true)
    playSound("click")

    try {
      await updateUserProfile(user.uid, {
        displayName: editData.displayName,
        email: editData.email,
      })
      setIsEditing(false)
      playSound("success")
    } catch (error) {
      console.error("Failed to update profile:", error)
      playSound("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    playSound("click")
    try {
      await signOutUser()
      onClose()
      playSound("success")
    } catch (error) {
      console.error("Sign out error:", error)
      playSound("error")
    }
  }

  if (!user || !userProfile) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card animate-scale-in">
        <DialogHeader className="text-center border-b border-blue-500/20 pb-6">
          <DialogTitle className="text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Avatar className="h-20 w-20 ring-4 ring-blue-500/30">
              <AvatarImage src={userProfile.photoURL || "/placeholder.svg"} alt={userProfile.displayName} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {userProfile.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editData.displayName}
                    onChange={(e) => setEditData((prev) => ({ ...prev, displayName: e.target.value }))}
                    className="glass-card border-blue-500/20"
                    placeholder="Display Name"
                  />
                  <Input
                    value={editData.email}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    className="glass-card border-blue-500/20"
                    placeholder="Email"
                    type="email"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white">{userProfile.displayName}</h3>
                  <p className="text-blue-300">{userProfile.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {userProfile.provider}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="btn-neon"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false)
                      playSound("click")
                    }}
                    variant="outline"
                    className="glass-card border-red-500/20 hover:bg-red-500/10"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsEditing(true)
                    playSound("click")
                  }}
                  variant="outline"
                  className="glass-card border-blue-500/20 hover:bg-blue-500/10"
                  onMouseEnter={() => playSound("hover")}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="overview" onClick={() => playSound("hover")}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" onClick={() => playSound("hover")}>
                Activity
              </TabsTrigger>
              <TabsTrigger value="achievements" onClick={() => playSound("hover")}>
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card border-blue-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-300">Member Since</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>{userProfile.createdAt.toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-purple-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-purple-300">Last Login</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-400" />
                      <span>{userProfile.lastLogin.toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-300">Account Status</CardTitle>
                  <CardDescription>Your account is in good standing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span>Account Type: Premium Explorer</span>
                    <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="glass-card border-blue-500/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <span>Logged in via {userProfile.provider}</span>
                      <span className="text-sm text-muted-foreground ml-auto">Just now</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10">
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                      <span>Updated profile settings</span>
                      <span className="text-sm text-muted-foreground ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span>Joined Xeno Universe</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {userProfile.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card border-yellow-500/20">
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-yellow-300">Early Explorer</h3>
                    <p className="text-sm text-muted-foreground">Joined during beta</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-blue-500/20">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-blue-300">Community Member</h3>
                    <p className="text-sm text-muted-foreground">Active participant</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-4 border-t border-blue-500/20">
            <Button
              onClick={onClose}
              variant="outline"
              className="glass-card border-blue-500/20 hover:bg-blue-500/10 bg-transparent"
              onMouseEnter={() => playSound("hover")}
            >
              Close
            </Button>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="bg-red-500/20 border-red-500/20 hover:bg-red-500/30 text-red-300"
              onMouseEnter={() => playSound("hover")}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
