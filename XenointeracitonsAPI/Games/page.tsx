import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GamepadIcon as GameController, Users, Sparkles, Clock } from "lucide-react"
import { Palmtree, Building, SpaceIcon as Planet } from "lucide-react"

export default function GamesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Our Games</h1>
          <p className="text-muted-foreground">Explore Tropik, our flagship VR adventure game</p>
        </div>

        {/* Featured Game - Tropik */}
        <div className="relative">
          <Card className="overflow-hidden border-2 border-emerald-500/20 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <div className="absolute top-4 right-4">
              <Badge className="bg-emerald-500 hover:bg-emerald-600">Our Game</Badge>
            </div>
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-emerald-500 to-teal-700 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Palmtree className="h-20 w-20 mx-auto mb-4 text-white" />
                  <h2 className="text-3xl font-bold text-white">Tropik</h2>
                  <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">VR Adventure</Badge>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Tropik</h3>
                    <p className="text-muted-foreground text-lg">
                      A vibrant VR adventure where you and your friends become agile axolotl explorers across four
                      dynamic tropikal islands.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-emerald-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Physics-driven locomotion</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Four unique realms</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Smooth multiplayer</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Charming characters</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-emerald-500" />
                      Development Progress
                    </h4>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">5% Complete - Early development phase</p>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
                      <Palmtree className="h-6 w-6 mx-auto mb-1 text-emerald-500" />
                      <p className="text-xs font-medium">Main Island</p>
                      <p className="text-xs text-muted-foreground">Concept</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
                      <GameController className="h-6 w-6 mx-auto mb-1 text-emerald-500" />
                      <p className="text-xs font-medium">Exploration</p>
                      <p className="text-xs text-muted-foreground">Planning</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
                      <Building className="h-6 w-6 mx-auto mb-1 text-emerald-500" />
                      <p className="text-xs font-medium">City Island</p>
                      <p className="text-xs text-muted-foreground">Concept</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-center">
                      <Planet className="h-6 w-6 mx-auto mb-1 text-emerald-500" />
                      <p className="text-xs font-medium">Space Island</p>
                      <p className="text-xs text-muted-foreground">Concept</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-emerald-500" />
                      Development Team
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">CEO: Animated</Badge>
                      <Badge variant="outline">S.I.C.: Slugmaster447</Badge>
                      <Badge variant="outline">Developer: Anémunt</Badge>
                      <Badge variant="outline">Manager: Dxsired</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardFooter className="bg-emerald-50/50 dark:bg-emerald-950/20 px-8 py-6 flex justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">In Active Development</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/projects">View Details</Link>
                </Button>
                <Link href="https://discord.gg/GBcuCSbktX">
                  <Button className="gap-2">
                    <Users className="h-4 w-4" />
                    Join Discord
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Follow Tropik's Development</h2>
              <p className="text-muted-foreground max-w-md">
                Stay updated on Tropik's development progress, get early access to beta tests, and join our community of
                VR enthusiasts.
              </p>
              <div className="flex gap-3">
                <Link href="https://discord.gg/GBcuCSbktX">
                  <Button className="gap-2">
                    <GameController className="h-4 w-4" />
                    Join Discord
                  </Button>
                </Link>
                <Button variant="outline" asChild>
                  <Link href="/projects">View Development Updates</Link>
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg p-6 w-full max-w-sm">
              <h3 className="font-semibold mb-4">Development Milestones</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>Core Mechanics</span>
                  <Badge variant="outline">In Progress</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span>Main Island Hub</span>
                  <Badge variant="outline">Planning</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <span>Multiplayer Testing</span>
                  <Badge variant="outline">Q4 2024</Badge>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
