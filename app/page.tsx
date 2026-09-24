"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Code2, Cpu, Gamepad2, Layers3, MonitorCog, Package } from "lucide-react"
import BottomHotbar from "@/components/bottom-hotbar"

const projects = [
  { name: "Abora OS", type: "Linux distribution", desc: "A NixOS-based desktop distribution focused on making reproducible Linux approachable, with ANIX, TinyPM, graphical tools, hardware support, and multiple desktop editions.", href: "https://github.com/AnimatedGTVR/Abora-OS", icon: MonitorCog },
  { name: "Pippin", type: "Operating system", desc: "An experimental x86_64 operating system with a Rust kernel and compositor, a native C++ desktop shell, and ELF64 application work.", href: "https://github.com/AnimatedGTVR/Pippin", icon: Cpu },
  { name: "Vanta", type: "Programming language", desc: "A systems-focused language exploring ideas from C++, Rust, Zig, C#, Ada, Go, and functional languages with an emphasis on explicit, readable low-level code.", href: "https://github.com/AnimatedGTVR/Vanta", icon: Code2 },
  { name: "LuminaIDE", type: "Developer tooling", desc: "A polyglot development environment built around a fast editor experience and support for modern development workflows.", href: "https://github.com/AnimatedGTVR/LuminaIDE", icon: Layers3 },
  { name: "TinyPM", type: "Package manager", desc: "A small package-management project developed alongside the Abora ecosystem.", href: "https://github.com/AnimatedGTVR/TinyPM", icon: Package },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030811] text-white pb-32 overflow-hidden">
      <section className="relative min-h-[92vh] flex items-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,.3),transparent_34%),radial-gradient(circle_at_82%_60%,rgba(14,165,233,.13),transparent_28%),linear-gradient(145deg,#050b16,#071a31_50%,#030811)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(96,165,250,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="relative z-10 mx-auto max-w-6xl w-full">
          <p className="text-sm uppercase tracking-[.28em] text-blue-300/70 mb-6">Independent software & interactive projects</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[-.055em] max-w-5xl">Xeno <span className="text-blue-400">Tech</span></h1>
          <p className="mt-8 max-w-2xl text-xl md:text-2xl text-slate-300 font-light leading-relaxed">Building operating systems, developer tools, programming languages, and interactive projects without pretending everything needs to be one product.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-blue-500 px-7 py-3.5 font-medium hover:bg-blue-400 transition">Explore projects</Link>
            <Link href="/about" className="rounded-full border border-blue-200/20 bg-white/5 px-7 py-3.5 text-slate-200 backdrop-blur-xl hover:bg-white/10 transition">About Xeno</Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-28 bg-gradient-to-b from-[#f7fbff] to-white text-slate-950">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[.25em] text-blue-600 mb-4">Current work</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">What we&apos;re building</h2>
            <Link href="/projects" className="text-blue-700 inline-flex items-center gap-2">All projects <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, i) => {
              const Icon=project.icon
              return <motion.a key={project.name} href={project.href} target="_blank" rel="noreferrer" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} className="group rounded-[2rem] border border-blue-100 bg-white p-8 shadow-[0_20px_70px_rgba(37,99,235,.08)] hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_80px_rgba(37,99,235,.14)] transition-all">
                <Icon className="w-7 h-7 text-blue-600 mb-8"/>
                <p className="text-xs uppercase tracking-[.2em] text-blue-600/70">{project.type}</p>
                <h3 className="text-3xl font-medium mt-2">{project.name}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{project.desc}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-blue-700 group-hover:gap-3 transition-all">Open project <ArrowRight className="w-4 h-4"/></span>
              </motion.a>
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 bg-gradient-to-br from-[#020712] via-[#07182d] to-[#062340]">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-blue-200/15 bg-blue-950/25 p-9 md:p-12 backdrop-blur-xl">
            <Gamepad2 className="w-8 h-8 text-cyan-300"/>
            <p className="mt-8 text-sm uppercase tracking-[.24em] text-blue-300/60">Xeno Interactions</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-light">Games still have a home here.</h2>
            <p className="mt-6 text-slate-300 leading-relaxed">Tropik and The Waking Soul represent the interactive side of Xeno. Game work sits beside the systems and software projects instead of defining the whole company.</p>
          </div>
          <div className="rounded-[2rem] border border-blue-200/15 bg-white/[.04] p-9 md:p-12">
            <Layers3 className="w-8 h-8 text-blue-300"/>
            <p className="mt-8 text-sm uppercase tracking-[.24em] text-blue-300/60">Wider ecosystem</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-light">Abora reaches beyond the desktop.</h2>
            <p className="mt-6 text-slate-300 leading-relaxed">Abora OS is joined by Abora Cloud, Abora Atlas, and Abora Labs—separate directions for infrastructure, specialized work, and experimentation.</p>
            <a href="https://aboraos.org/" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-cyan-300">Visit Abora OS <ArrowRight className="w-4 h-4"/></a>
          </div>
        </div>
      </section>
      <BottomHotbar/>
    </main>
  )
}
