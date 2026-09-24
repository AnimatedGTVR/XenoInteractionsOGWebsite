"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import BottomHotbar from "@/components/bottom-hotbar"

const groups = [
  { title: "Systems", items: [
    ["Abora OS","NixOS-based Linux distribution","Desktop Linux made more approachable while keeping reproducibility and declarative configuration.","https://github.com/AnimatedGTVR/Abora-OS"],
    ["Pippin","Experimental operating system","x86_64 OS work spanning a Rust kernel/compositor, native C++ shell, and ELF64 applications.","https://github.com/AnimatedGTVR/Pippin"],
    ["Pancake","Desktop / compositor research","Experiments around a minimal, flexible Linux desktop and compositor experience.","https://github.com/AnimatedGTVR/Pancake"],
  ]},
  { title: "Languages & developer tools", items: [
    ["Vanta","Programming language","A systems language project focused on explicit low-level programming and modern language design.","https://github.com/AnimatedGTVR/Vanta"],
    ["LuminaIDE","IDE","A polyglot development environment for modern programming workflows.","https://github.com/AnimatedGTVR/LuminaIDE"],
    ["TinyPM","Package manager","A compact package-management project developed alongside Abora.","https://github.com/AnimatedGTVR/TinyPM"],
    ["BASIC-X","Retro language tooling","Compiler work targeting classic Macintosh / 68K-style development experiments.","https://github.com/AnimatedGTVR/BASIC-X"],
  ]},
  { title: "Interactive", items: [
    ["Tropik","Game","A sandbox/adventure project and the main home for Xeno Interactions game development.",null],
    ["The Waking Soul","Game","A psychological horror project within Xeno's interactive work.",null],
  ]},
]

export default function ProjectsPage(){
 return <main className="min-h-screen bg-[#030811] text-white pb-32">
  <section className="px-6 pt-28 pb-20 bg-[radial-gradient(circle_at_30%_0%,rgba(37,99,235,.25),transparent_35%)]">
   <div className="max-w-6xl mx-auto"><Link href="/" className="text-blue-300/70">← Home</Link><p className="mt-20 text-sm uppercase tracking-[.28em] text-blue-300/60">Xeno Tech</p><h1 className="mt-4 text-6xl md:text-8xl font-light tracking-[-.045em]">Projects</h1><p className="mt-6 max-w-3xl text-xl text-slate-300 leading-relaxed">The current software, systems, language, tooling, and interactive projects connected to Xeno Tech.</p></div>
  </section>
  <section className="px-6 pb-28"><div className="max-w-6xl mx-auto space-y-20">
   {groups.map((group,g)=><div key={group.title}><h2 className="text-3xl font-light mb-7 text-blue-100">{group.title}</h2><div className="grid md:grid-cols-2 gap-4">{group.items.map((p,i)=>{const card=<motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.04}} className="h-full rounded-[1.75rem] border border-blue-200/15 bg-white/[.035] p-7 hover:bg-blue-500/[.07] hover:border-blue-300/25 transition"><p className="text-xs uppercase tracking-[.2em] text-blue-300/60">{p[1]}</p><h3 className="mt-2 text-2xl">{p[0]}</h3><p className="mt-4 text-slate-400 leading-relaxed">{p[2]}</p>{p[3]&&<span className="mt-6 inline-flex items-center gap-2 text-blue-300">GitHub <ArrowUpRight className="w-4 h-4"/></span>}</motion.div>;return p[3]?<a key={p[0]} href={p[3]} target="_blank" rel="noreferrer">{card}</a>:<div key={p[0]}>{card}</div>})}</div></div>)}
  </div></section><BottomHotbar/>
 </main>
}
