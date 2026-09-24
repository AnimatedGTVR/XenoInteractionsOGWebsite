"use client"
import Link from "next/link"
import { Home, User, FolderKanban, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

const items=[{href:"/",label:"Home",icon:Home},{href:"/about",label:"About",icon:User},{href:"/projects",label:"Projects",icon:FolderKanban},{href:"/contact",label:"Contact",icon:Mail}]

export default function BottomHotbar(){
 const pathname=usePathname()
 return <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 rounded-[1.35rem] border border-blue-200/15 bg-[#07111f]/85 p-1.5 shadow-2xl backdrop-blur-xl"><div className="flex gap-1">{items.map(item=>{const Icon=item.icon;const active=pathname===item.href;return <Link key={item.href} href={item.href} className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition ${active?"bg-blue-500 text-white":"text-slate-400 hover:bg-white/[.06] hover:text-white"}`}><Icon className="w-4 h-4"/><span>{item.label}</span></Link>})}</div></nav>
}
