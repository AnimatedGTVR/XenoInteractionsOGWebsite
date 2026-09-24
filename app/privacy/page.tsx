"use client"

import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-white">← Back to Xeno Tech</Link>
        <p className="mt-20 text-xs uppercase tracking-[0.3em] text-gray-500">Legal</p>
        <h1 className="mt-4 text-5xl font-light md:text-7xl">Privacy &amp; Policies</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">Xeno Tech keeps its projects focused, transparent, and respectful of the people who use them. This page will collect the policies for Xeno Tech and its individual projects in one place.</p>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <section className="border border-white/15 p-6">
            <h2 className="text-xl font-light">Privacy</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">We aim to collect only what is needed to operate and improve our projects. Project-specific notices will be published here as services launch.</p>
          </section>
          <section className="border border-white/15 p-6">
            <h2 className="text-xl font-light">Policies</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">Terms, safety guidance, and project policies will be documented here for easy access.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
