import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GamepadIcon as GameController, Code, Rocket } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Xeno Interactions LLC
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Creating immersive gaming experiences and innovative projects
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/games">
                  <Button className="gap-2">
                    <GameController className="h-4 w-4" />
                    Our Games
                  </Button>
                </Link>
                <Link href="https://discord.gg/GBcuCSbktX">
                  <Button variant="outline" className="gap-2">
                    <Code className="h-4 w-4" />
                    Join Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Featured Game</h3>
                  <p className="text-sm text-muted-foreground">Our latest gaming experience</p>
                </div>
                <div className="p-6 pt-0">
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="h-full w-full flex items-center justify-center bg-slate-800 text-white">
                      Game Screenshot
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">Cosmic Explorers</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      An immersive space exploration game with procedurally generated worlds.
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Mod Community</h3>
                  <p className="text-sm text-muted-foreground">Extend your gaming experience</p>
                </div>
                <div className="p-6 pt-0">
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="h-full w-full flex items-center justify-center bg-slate-800 text-white">
                      Mods Preview
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">Create & Share Mods</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Use our LUA editor to create, save, and share mods for our games.
                    </p>
                    <Link href="https://discord.gg/GBcuCSbktX">
                      <Button className="mt-4 w-full">Join Tropik Discord</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Latest Project</h3>
                  <p className="text-sm text-muted-foreground">Innovative technology</p>
                </div>
                <div className="p-6 pt-0">
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="h-full w-full flex items-center justify-center bg-slate-800 text-white">
                      Project Preview
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">AI Game Companion</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Our new AI-powered tool that enhances gameplay through adaptive challenges.
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Xeno Interactions</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We're a passionate team of developers, artists, and designers creating unique interactive experiences.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Our Mission</h3>
                        <p className="text-muted-foreground">
                          To create innovative games that push the boundaries of interactive entertainment.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Community Focus</h3>
                        <p className="text-muted-foreground">
                          We believe in empowering our players through modding tools and community engagement.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Technology</h3>
                        <p className="text-muted-foreground">
                          Leveraging cutting-edge tech to create immersive, responsive gaming worlds.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="rounded-lg bg-slate-900 p-8 text-white w-full max-w-md aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <Rocket className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-xl font-bold">Xeno Interactions LLC</h3>
                      <p className="mt-2">Established 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
