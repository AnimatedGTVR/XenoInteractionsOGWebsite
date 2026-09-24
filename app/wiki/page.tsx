import Link from "next/link"

const entries = [
  {
    title: "Abora OS",
    description: "An approachable Linux distribution built on NixOS, with reproducible configuration, desktop editions, ANIX, TinyPM, and a growing ecosystem.",
    href: "https://aboraos.org/",
  },
  {
    title: "Projects",
    description: "A directory of projects owned and supported by Xeno Tech, including Abora OS, Vanta, Pippin, and TinyPM.",
    href: "https://github.com/AnimatedGTVR",
  },
  {
    title: "Modularity",
    description: "An engine project from Tareno Labs, owned by Anemunt and supporting the wider Xeno Tech ecosystem.",
    href: "https://moduengine.xyz",
  },
]

export default function WikiPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">← Back to Xeno Tech</Link>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Xeno Tech reference</p>
          <h1 className="mt-5 text-6xl font-light tracking-tight">Wiki</h1>
          <p className="mt-6 text-xl leading-relaxed text-gray-400">A starting point for the projects, systems, and people behind Xeno Tech.</p>
        </div>
        <div className="mt-20 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {entries.map((entry) => (
            <a key={entry.title} href={entry.href} target="_blank" rel="noreferrer" className="bg-black p-7 transition-colors hover:bg-white hover:text-black">
              <h2 className="text-2xl font-light">{entry.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-500 group-hover:text-gray-700">{entry.description}</p>
              <span className="mt-8 inline-block text-sm underline underline-offset-4">Open reference →</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
