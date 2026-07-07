"use client"

import type React from "react"
import Link from "next/link"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { BrandLogo } from "@/components/brand-logo"
import type { Dictionary } from "@/lib/i18n"

type AuthLayoutProps = {
  children: React.ReactNode
  content: Dictionary["auth"]["common"]
}

export function AuthLayout({ children, content }: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/55" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-6">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/">
            <BrandLogo />
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[460px]">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
              <div className="relative p-6 sm:p-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
