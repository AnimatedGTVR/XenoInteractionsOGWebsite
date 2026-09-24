import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GamepadIcon as GameController,
  Users,
  MapPin,
  Sparkles,
  Clock,
  Ghost,
  Rocket,
  Palmtree,
  Building,
  SpaceIcon as Planet,
  HandHeart,
} from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Our Games & Projects</h1>
            <p className="text-muted-foreground">Explore our games and collaborative projects</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Based in Indiana, USA</span>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm">
            <strong>Tropik</strong> is our flagship VR game in development. We also collaborate with other developers on
            exciting projects like The Waking Souls and Lurking within Shadows.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="our-games">Our Games</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-8">
              {/* Tropik - Our Game */}
              <Card className="overflow-hidden border-2 border-emerald-500/20">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-emerald-500 to-teal-700 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Palmtree className="h-16 w-16 mx-auto mb-4 text-white" />
                      <h2 className="text-2xl font-bold text-white">Tropik</h2>
                      <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">VR Adventure</Badge>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Tropik</h3>
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Our Game</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        A vibrant VR adventure where you and your friends become agile axolotl explorers across four
                        dynamic tropikal islands.
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-emerald-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-2 ml-6 list-disc text-sm text-muted-foreground">
                          <li>
                            <span className="font-medium text-foreground">Physics-Driven Locomotion:</span> Gorilla
                            Tag–style arm-powered movement, Fish Game–inspired swimming, and speed-boosting ziplines.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Four Unique Realms:</span> Main Island Hub,
                            Exploration Island, City Island, and Space Island.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Smooth Multiplayer:</span> Powered by
                            LinkStream and Firebase by Anemunt.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Charming Characters:</span> Hot-spring
                            dwellers, cute animal companions, and more.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4 text-emerald-500" />
                          Development Team
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">CEO</Badge>
                            <span>Animated</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">S.I.C.</Badge>
                            <span>Slugmaster447</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Developer</Badge>
                            <span>Anémunt</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Manager of Management</Badge>
                            <span>Dxsired</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardFooter className="bg-muted/50 px-6 py-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5% Complete - In Development</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Link href="https://discord.gg/GBcuCSbktX">
                      <Button size="sm">Join Discord</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              {/* Collaboration Projects */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <HandHeart className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">Collaboration Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lurking within Shadows */}
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-br from-slate-700 to-purple-900 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <Ghost className="h-12 w-12 mx-auto mb-2 text-white" />
                        <h3 className="text-xl font-bold text-white">Lurking within Shadows</h3>
                        <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">Mystery</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Project Collaboration</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Helping Out
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          A mysterious project we're collaborating on. More details coming soon...
                        </p>

                        <div>
                          <h5 className="font-medium text-sm mb-2">Project Team</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                Owner
                              </Badge>
                              <span>Dxsired</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                Head Developer
                              </Badge>
                              <span>Anémunt</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                Developer
                              </Badge>
                              <span>Animated</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>2% Complete</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* The Waking Souls */}
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-br from-amber-500 to-red-700 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <Rocket className="h-12 w-12 mx-auto mb-2 text-white" />
                        <h3 className="text-xl font-bold text-white">The Waking Souls</h3>
                        <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">Adventure</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Project Collaboration</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Helping Out
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          An ambitious project with a large team that we're proud to collaborate on.
                        </p>

                        <div>
                          <h5 className="font-medium text-sm mb-2">Project Team</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                Owner
                              </Badge>
                              <span>Anémunt - アネムント</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" size="sm">
                                Game Producer
                              </Badge>
                              <span>Animated</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              + Artists, Developers, and Beta Testers
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>8% Complete</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-muted rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Join Our Community</h2>
                  <p className="text-muted-foreground max-w-md">
                    Interested in following our projects or collaborating with us? Join our Discord community to stay
                    updated on all our developments.
                  </p>
                  <Link href="https://discord.gg/GBcuCSbktX">
                    <Button className="gap-2">
                      <Users className="h-4 w-4" />
                      Join Discord
                    </Button>
                  </Link>
                </div>
                <div className="bg-background rounded-lg p-6 w-full max-w-sm">
                  <h3 className="font-semibold mb-4">Current Focus</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Tropik Development</span>
                      <Badge>Primary</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>The Waking Souls</span>
                      <Badge variant="outline">Collaboration</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Lurking within Shadows</span>
                      <Badge variant="outline">Collaboration</Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="our-games">
            <div className="grid gap-8 mt-6">
              {/* Only Tropik */}
              <Card className="overflow-hidden border-2 border-emerald-500/20">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-emerald-500 to-teal-700 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Palmtree className="h-16 w-16 mx-auto mb-4 text-white" />
                      <h2 className="text-2xl font-bold text-white">Tropik</h2>
                      <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">VR Adventure</Badge>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold">Tropik</h3>
                        <p className="text-muted-foreground">
                          A vibrant VR adventure where you and your friends become agile axolotl explorers across four
                          dynamic tropikal islands.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-emerald-500" />
                          Development Progress
                        </h4>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">5% Complete - Early development phase</p>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <Palmtree className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                          <p className="text-xs font-medium">Main Island</p>
                          <p className="text-xs text-muted-foreground">Concept</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <GameController className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                          <p className="text-xs font-medium">Exploration</p>
                          <p className="text-xs text-muted-foreground">Planning</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <Building className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                          <p className="text-xs font-medium">City Island</p>
                          <p className="text-xs text-muted-foreground">Concept</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <Planet className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                          <p className="text-xs font-medium">Space Island</p>
                          <p className="text-xs text-muted-foreground">Concept</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardFooter className="bg-muted/50 px-6 py-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">In Active Development</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Development Updates</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaborations">
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-2">
                <HandHeart className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Projects We're Helping With</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lurking within Shadows */}
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-700 to-purple-900 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Ghost className="h-12 w-12 mx-auto mb-2 text-white" />
                      <h3 className="text-xl font-bold text-white">Lurking within Shadows</h3>
                      <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">Mystery</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        A mysterious project we're collaborating on. More details coming soon...
                      </p>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Project Team</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              Owner
                            </Badge>
                            <span>Dxsired</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              Head Developer
                            </Badge>
                            <span>Anémunt</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              Developer
                            </Badge>
                            <span>Animated</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>2% Complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Get Updates
                    </Button>
                  </CardFooter>
                </Card>

                {/* The Waking Souls */}
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-amber-500 to-red-700 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Rocket className="h-12 w-12 mx-auto mb-2 text-white" />
                      <h3 className="text-xl font-bold text-white">The Waking Souls</h3>
                      <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white">Adventure</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        An ambitious project with a large team that we're proud to collaborate on.
                      </p>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Project Team</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              Owner
                            </Badge>
                            <span>Anémunt - アネムント</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">
                              Game Producer
                            </Badge>
                            <span>Animated</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            + Mini Developers, Artists, and Beta Testers
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>8% Complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
